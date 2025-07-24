import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const StripeCheckoutForm = ({ amount, onPaymentSuccess, onPaymentError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (!stripe || !elements) {
      setLoading(false);
      return;
    }
    // In a real app, you would create a PaymentIntent on your server and fetch the clientSecret here.
    // For demo, we'll just simulate success.
    // TODO: Integrate with backend for real payment
    setTimeout(() => {
      setLoading(false);
      onPaymentSuccess && onPaymentSuccess();
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 350, margin: "0 auto", textAlign: 'center' }}>
      <div style={{ marginBottom: 18, padding: 12, border: '1.5px solid #1976d2', borderRadius: 8, background: '#f7fafd' }}>
        <CardElement options={{ hidePostalCode: true, style: { base: { fontSize: '18px', color: '#222', '::placeholder': { color: '#888' } } } }} />
      </div>
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <button
        type="submit"
        style={{
          width: '100%',
          background: '#ffd600',
          color: '#222',
          fontWeight: 700,
          border: 'none',
          borderRadius: 8,
          padding: '12px 0',
          fontSize: 18,
          boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginTop: 8,
          transition: 'background 0.2s',
        }}
        disabled={!stripe || loading}
      >
        {loading ? "Processing..." : `Pay ₹${amount}`}
      </button>
    </form>
  );
};

export default StripeCheckoutForm; 