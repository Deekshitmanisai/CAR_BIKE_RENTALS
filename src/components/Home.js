import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import carBg from '../assets/car-bg.png';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [dropoffTime, setDropoffTime] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setOpenDialog(true);
  };

  // Combine date and time into JS Date objects
  const getDateTime = (date, time) => {
    if (!date || !time) return null;
    return new Date(`${date}T${time}`);
  };
  const fromDateTime = getDateTime(pickupDate, pickupTime);
  const toDateTime = getDateTime(dropoffDate, dropoffTime);

  const handleVehicleType = (type) => {
    setOpenDialog(false);
    if (type === 'cars') {
      navigate('/cars', { state: { fromDateTime, toDateTime } });
    } else if (type === 'bikes') {
      navigate('/bikes', { state: { fromDateTime, toDateTime } });
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${carBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 0,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 4,
          borderRadius: 4,
          minWidth: 400,
          boxShadow: 8,
          background: '#fff',
          mx: 'auto',
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Search your next ride
        </Typography>
        <form onSubmit={handleSearch}>
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Pickup
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Date"
                type="date"
                value={pickupDate}
                onChange={e => setPickupDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Time"
                type="time"
                value={pickupTime}
                onChange={e => setPickupTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Dropoff
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Date"
                type="date"
                value={dropoffDate}
                onChange={e => setDropoffDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Time"
                type="time"
                value={dropoffTime}
                onChange={e => setDropoffTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="warning"
            fullWidth
            sx={{ mt: 4, fontWeight: "bold", fontSize: 18, bgcolor: "#ffd600", color: "#333" }}
          >
            Search
          </Button>
        </form>
      </Paper>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Please choose the vehicle type</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', gap: 2, mt: 1, mb: 1 }}>
            <Button variant="contained" color="primary" onClick={() => handleVehicleType('cars')} sx={{ fontWeight: 700, px: 4 }}>
              Cars
            </Button>
            <Button variant="contained" color="secondary" onClick={() => handleVehicleType('bikes')} sx={{ fontWeight: 700, px: 4 }}>
              Bikes
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="inherit">Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}