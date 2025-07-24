import React, { useEffect, useState } from 'react';
import firebase from '../../firebase/config';
import { useSelector } from 'react-redux';
import { Box, Typography, Card, CardContent, Grid, Divider } from '@mui/material';

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useSelector(state => state.firebase.auth);

  useEffect(() => {
    if (!auth.uid) return;
    const unsubscribe = firebase.firestore()
      .collection('bookings')
      .where('userId', '==', auth.uid)
      .orderBy('from', 'desc')
      .onSnapshot(snapshot => {
        const bookingsArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBookings(bookingsArray);
        setLoading(false);
      });
    return () => unsubscribe();
  }, [auth.uid]);

  if (!auth.uid) {
    return <Typography align="center" sx={{ mt: 6 }}>Please log in to view your bookings.</Typography>;
  }

  return (
    <Box sx={{ p: 3, minHeight: '100vh', bgcolor: '#f7fafd' }}>
      <Typography variant="h4" align="center" sx={{ fontWeight: 800, color: '#1976d2', mb: 4 }}>
        My Bookings
      </Typography>
      {loading ? (
        <Typography align="center">Loading bookings...</Typography>
      ) : bookings.length === 0 ? (
        <Typography align="center">No bookings found.</Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {bookings.map(booking => (
            <Grid item xs={12} sm={8} md={6} lg={5} key={booking.id} display="flex" justifyContent="center">
              <Card sx={{ width: '100%', maxWidth: 420, boxShadow: 4, borderRadius: 4 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{booking.bike?.model || 'Bike'}</Typography>
                  <Typography color="text.secondary">{booking.bike?.location || ''}</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">From</Typography>
                      <Typography>
                        {booking.from
                          ? (booking.from.toDate
                              ? booking.from.toDate().toLocaleString()
                              : (booking.from instanceof Date
                                  ? booking.from.toLocaleString()
                                  : booking.from.toString()))
                          : '-'}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">To</Typography>
                      <Typography>
                        {booking.to
                          ? (booking.to.toDate
                              ? booking.to.toDate().toLocaleString()
                              : (booking.to instanceof Date
                                  ? booking.to.toLocaleString()
                                  : booking.to.toString()))
                          : '-'}
                      </Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="h6" color="#1976d2" sx={{ fontWeight: 800 }}>₹ {booking.price || 0}</Typography>
                  <Typography variant="caption" color="text.secondary">({booking.bike?.includedKm || 0} km included)</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2" color={booking.status === 'paid' ? 'success.main' : 'warning.main'}>
                    Status: {booking.status || 'pending'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
} 