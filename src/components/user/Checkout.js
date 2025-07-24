import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StripeCheckoutForm from "./StripeCheckoutForm";
import { Card, CardContent, Typography, Box, Button, Divider, Snackbar, Alert, Tabs, Tab, TextField, MenuItem } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { useSelector } from 'react-redux';
import firebase from '../../firebase/config';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const stripePromise = loadStripe("pk_test_12345..."); // <-- your real key

const paymentMethods = [
  { label: 'Card', value: 'card', icon: <CreditCardIcon color="primary" /> },
  { label: 'UPI', value: 'upi', icon: <QrCodeIcon color="success" /> },
  { label: 'Net Banking', value: 'netbanking', icon: <AccountBalanceIcon color="info" /> },
  { label: 'Wallet', value: 'wallet', icon: <AccountBalanceWalletIcon color="warning" /> },
  { label: 'PayPal', value: 'paypal', icon: <img src="https://www.paypalobjects.com/webstatic/icon/pp258.png" alt="PayPal" style={{ height: 24, marginRight: 8 }} /> },
];

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { bike, booking } = location.state || {};
  const auth = useSelector(state => state.firebase.auth);
  const [success, setSuccess] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState('card');
  const [upiId, setUpiId] = React.useState('');
  const [bank, setBank] = React.useState('');
  const [wallet, setWallet] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handlePaymentSuccess = async () => {
    // Save booking to Firestore
    if (auth.uid && bike && booking) {
      await firebase.firestore().collection('bookings').add({
        userId: auth.uid,
        bike: bike,
        from: booking.from ? firebase.firestore.Timestamp.fromDate(new Date(booking.from)) : null,
        to: booking.to ? firebase.firestore.Timestamp.fromDate(new Date(booking.to)) : null,
        price: bike.price || 0,
        status: 'paid',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        paymentMethod,
      });
    }
    setSuccess(true);
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const handlePay = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      handlePaymentSuccess();
    }, 1500);
  };

  if (!bike || !booking) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5">No booking information found.</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate('/bikes')}>Back to Bikes</Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'linear-gradient(135deg, #e3f2fd 0%, #f7fafd 100%)',
        backgroundImage: 'url(https://www.transparenttextures.com/patterns/cubes.png)',
        backgroundRepeat: 'repeat',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      <Card sx={{ maxWidth: 420, width: '100%', boxShadow: 12, borderRadius: 4, p: 0, background: '#fff' }}>
        <CardContent>
          <Typography variant="h4" align="center" sx={{ fontWeight: 800, color: '#1976d2', mb: 2 }}>Checkout</Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="h6" align="center" sx={{ fontWeight: 700 }}>{bike.model}</Typography>
          <Typography align="center" color="text.secondary">{bike.location}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Box>
              <Typography variant="body2" color="text.secondary">From</Typography>
              <Typography>
                {booking.from
                  ? (booking.from instanceof Date
                      ? booking.from.toLocaleString()
                      : booking.from.toDate().toLocaleString())
                  : '-'}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">To</Typography>
              <Typography>
                {booking.to
                  ? (booking.to instanceof Date
                      ? booking.to.toLocaleString()
                      : booking.to.toDate().toLocaleString())
                  : '-'}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h5" align="center" sx={{ fontWeight: 800, color: '#1976d2' }}>₹ {bike.price || 0}</Typography>
          <Typography align="center" color="text.secondary">({bike.includedKm || 0} km included)</Typography>
          <Divider sx={{ my: 3 }} />
          <Tabs
            value={paymentMethod}
            onChange={(_, v) => setPaymentMethod(v)}
            variant="fullWidth"
            sx={{ mb: 2 }}
          >
            {paymentMethods.map(pm => (
              <Tab key={pm.value} value={pm.value} label={pm.label} icon={pm.icon} iconPosition="start" />
            ))}
          </Tabs>
          {/* Payment Forms */}
          {paymentMethod === 'card' && (
            <Elements stripe={stripePromise}>
              <StripeCheckoutForm amount={bike.price || 0} onPaymentSuccess={handlePaymentSuccess} />
            </Elements>
          )}
          {paymentMethod === 'upi' && (
            <form onSubmit={handlePay} style={{ marginTop: 8 }}>
              <TextField
                label="UPI ID"
                value={upiId}
                onChange={e => setUpiId(e.target.value)}
                fullWidth
                required
                sx={{ mb: 2 }}
                placeholder="example@upi"
              />
              <Button
                type="submit"
                variant="contained"
                color="success"
                fullWidth
                sx={{ fontWeight: 700, fontSize: 18, bgcolor: '#43a047', color: '#fff', mt: 1 }}
                disabled={loading || !upiId}
              >
                {loading ? 'Processing...' : `Pay ₹${bike.price} via UPI`}
              </Button>
            </form>
          )}
          {paymentMethod === 'netbanking' && (
            <form onSubmit={handlePay} style={{ marginTop: 8 }}>
              <TextField
                select
                label="Select Bank"
                value={bank}
                onChange={e => setBank(e.target.value)}
                fullWidth
                required
                sx={{ mb: 2 }}
              >
                <MenuItem value="SBI">State Bank of India</MenuItem>
                <MenuItem value="HDFC">HDFC Bank</MenuItem>
                <MenuItem value="ICICI">ICICI Bank</MenuItem>
                <MenuItem value="AXIS">Axis Bank</MenuItem>
                <MenuItem value="KOTAK">Kotak Mahindra Bank</MenuItem>
              </TextField>
              <Button
                type="submit"
                variant="contained"
                color="info"
                fullWidth
                sx={{ fontWeight: 700, fontSize: 18, bgcolor: '#1976d2', color: '#fff', mt: 1 }}
                disabled={loading || !bank}
              >
                {loading ? 'Processing...' : `Pay ₹${bike.price} via Net Banking`}
              </Button>
            </form>
          )}
          {paymentMethod === 'wallet' && (
            <form onSubmit={handlePay} style={{ marginTop: 8 }}>
              <TextField
                select
                label="Select Wallet"
                value={wallet}
                onChange={e => setWallet(e.target.value)}
                fullWidth
                required
                sx={{ mb: 2 }}
              >
                <MenuItem value="Paytm">Paytm</MenuItem>
                <MenuItem value="PhonePe">PhonePe</MenuItem>
                <MenuItem value="Mobikwik">Mobikwik</MenuItem>
                <MenuItem value="AmazonPay">Amazon Pay</MenuItem>
                <MenuItem value="Freecharge">Freecharge</MenuItem>
              </TextField>
              <Button
                type="submit"
                variant="contained"
                color="warning"
                fullWidth
                sx={{ fontWeight: 700, fontSize: 18, bgcolor: '#ffd600', color: '#222', mt: 1 }}
                disabled={loading || !wallet}
              >
                {loading ? 'Processing...' : `Pay ₹${bike.price} via Wallet`}
              </Button>
            </form>
          )}
          {paymentMethod === 'paypal' && (
            <PayPalScriptProvider options={{ "client-id": "Ac2YO-sH6zQVsPPd_o7dyzpf3DNRx6TyNHsgJzPGIKyaQGjt6mjY9FFMezC0A6YlL1Y3mT0FBQs4HOxs", currency: "INR" }}>
              <PayPalButtons
                style={{ layout: "vertical", color: "blue" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [{
                      amount: { value: bike.price ? bike.price.toString() : "0" }
                    }]
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then(function(details) {
                    handlePaymentSuccess();
                  });
                }}
                onError={(err) => {
                  alert("PayPal payment failed: " + err);
                }}
              />
            </PayPalScriptProvider>
          )}
        </CardContent>
      </Card>
      <Snackbar open={success} autoHideDuration={2000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Payment successful! Redirecting to home page...
        </Alert>
      </Snackbar>
    </Box>
  );
} 