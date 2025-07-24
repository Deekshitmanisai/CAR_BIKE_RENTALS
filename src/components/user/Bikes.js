import React, { useEffect, useState } from 'react';
import firebase from '../../firebase/config';
import {
  Box, Card, CardContent, Typography, Button, Grid, CardMedia, Divider, TextField, MenuItem
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useNavigate, useLocation } from 'react-router-dom';

const fallbackImg = 'https://cdn.pixabay.com/photo/2017/01/06/19/15/bike-1959260_1280.jpg';

export default function Bikes(props) {
  const location = useLocation();
  const fromDateTime = location.state?.fromDateTime || null;
  const toDateTime = location.state?.toDateTime || null;
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('bikes').onSnapshot(snapshot => {
      const bikesArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBikes(bikesArray);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Sync booking state with props when fromDateTime or toDateTime changes
  useEffect(() => {
    if (!bikes.length) return;
    setBooking(prev => {
      const updated = { ...prev };
      bikes.forEach(bike => {
        updated[bike.id] = {
          ...updated[bike.id],
          from: fromDateTime || updated[bike.id]?.from || null,
          to: toDateTime || updated[bike.id]?.to || null,
        };
      });
      return updated;
    });
  }, [fromDateTime, toDateTime, bikes]);

  const handleBook = (bike) => {
    const b = booking[bike.id] || {};
    console.log('Booking info passed to checkout:', b);
    if (!b.from || !b.to) {
      alert('Please select both pickup and dropoff date/time.');
      return;
    }
    navigate('/checkout', { state: { bike, booking: b } });
  };

  const handleBookingChange = (bikeId, field, value) => {
    setBooking(prev => ({
      ...prev,
      [bikeId]: {
        ...prev[bikeId],
        [field]: value,
      },
    }));
  };

  if (loading) return <Typography>Loading bikes...</Typography>;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 3, minHeight: '100vh', bgcolor: '#f7fafd' }}>
        <Typography
          variant="h3"
          align="center"
          sx={{ fontWeight: 800, color: '#1976d2', letterSpacing: 1, mb: 4 }}
        >
          Available Bikes
        </Typography>
        {bikes.length === 0 ? (
          <Typography align="center">No bikes available.</Typography>
        ) : (
          <Grid container spacing={4} justifyContent="center">
            {bikes.map((bike) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={bike.id} display="flex" justifyContent="center">
                <Card
                  sx={{
                    maxWidth: 370,
                    width: '100%',
                    border: '2px solid #1976d2',
                    boxShadow: 6,
                    borderRadius: 4,
                    background: '#fff',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.03)', boxShadow: 12, borderColor: '#ffd600' },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', p: 1, pl: 2 }}>
                    <EmojiEventsIcon color="success" sx={{ mr: 1 }} />
                    <Typography variant="caption" fontWeight={600} color="#1976d2">Zero deposit</Typography>
                  </Box>
                  <CardMedia
                    component="img"
                    height="170"
                    image={bike.imageUrl || fallbackImg}
                    alt={bike.model}
                    sx={{ objectFit: 'contain', background: '#f5f5f5', borderRadius: 2 }}
                    onError={e => { e.target.onerror = null; e.target.src = fallbackImg; }}
                  />
                  <CardContent>
                    <Typography variant="h5" align="center" sx={{ fontWeight: 700, color: '#222', mb: 1 }}>
                      {bike.model}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="body2" align="center" color="text.secondary">
                      Available at
                    </Typography>
                    <TextField
                      select
                      fullWidth
                      size="small"
                      value={bike.location || ''}
                      sx={{ my: 1, bgcolor: '#f7fafd', borderRadius: 1 }}
                      disabled
                    >
                      <MenuItem value={bike.location || ''}>{bike.location || 'Location'}</MenuItem>
                    </TextField>
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <DateTimePicker
                        label="From"
                        value={booking[bike.id]?.from || null}
                        onChange={val => {
                          console.log('From date selected:', val);
                          handleBookingChange(bike.id, 'from', val);
                        }}
                        renderInput={(params) => <TextField {...params} size="small" sx={{ width: 120, bgcolor: '#f7fafd', borderRadius: 1 }} />}
                      />
                      <Typography sx={{ mx: 1, fontWeight: 600 }}>to</Typography>
                      <DateTimePicker
                        label="To"
                        value={booking[bike.id]?.to || null}
                        onChange={val => {
                          console.log('To date selected:', val);
                          handleBookingChange(bike.id, 'to', val);
                        }}
                        renderInput={(params) => <TextField {...params} size="small" sx={{ width: 120, bgcolor: '#f7fafd', borderRadius: 1 }} />}
                      />
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 800, color: '#1976d2' }}>
                          ₹ {bike.price || 0}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ({bike.includedKm || 0} km included)
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        sx={{ bgcolor: '#ffd600', color: '#222', fontWeight: 700, borderRadius: 2, px: 4, boxShadow: 2, '&:hover': { bgcolor: '#ffe082' } }}
                        onClick={() => handleBook(bike)}
                        disabled={!bike.available || !booking[bike.id]?.from || !booking[bike.id]?.to}
                      >
                        BOOK
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </LocalizationProvider>
  );
} 