// src/components/PaymentForm.jsx

import React, { useState } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box,
  Typography, CircularProgress
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PaymentForm = ({ open, handleClose, totalAmount, onPaymentSuccess }) => {
  const [processing, setProcessing] = useState(false);
  const [paid, setPaid] = useState(false);
  const [momoNumber, setMomoNumber] = useState('');

  const handlePayment = () => {
    if (!momoNumber || momoNumber.length < 10) {
      return; // Simple validation
    }
    
    setProcessing(true);

    // Simulate an API call to the payment gateway
    setTimeout(() => {
      setProcessing(false);
      setPaid(true);
      // Notify the parent component that payment was successful
      setTimeout(() => {
        onPaymentSuccess();
        handleDialogClose();
      }, 2000); // Wait 2 seconds before closing dialog
    }, 3000); // Simulate a 3-second processing time
  };
  
  const handleDialogClose = () => {
    // Reset state when closing the dialog
    setPaid(false);
    setMomoNumber('');
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleDialogClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        Secure Payment
      </DialogTitle>
      <DialogContent sx={{ textAlign: 'center' }}>
        {paid ? (
          <Box sx={{ my: 4 }}>
            <CheckCircleIcon color="success" sx={{ fontSize: 60 }} />
            <Typography variant="h5" color="success.main">Payment Successful!</Typography>
            <Typography>Your transaction has been confirmed.</Typography>
          </Box>
        ) : (
          <>
            <Typography variant="h6">Total Amount Due</Typography>
            <Typography variant="h3" fontWeight="bold" color="primary.main" gutterBottom>
              GHS {totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Enter your Mobile Money number to complete payment.
            </Typography>
            <TextField
              label="MoMo Number (e.g., 024xxxxxxx)"
              variant="outlined"
              fullWidth
              type="tel"
              value={momoNumber}
              onChange={(e) => setMomoNumber(e.target.value)}
              disabled={processing}
            />
          </>
        )}
      </DialogContent>
      {!paid && (
        <DialogActions sx={{ p: 2, justifyContent: 'center' }}>
          <Button 
            onClick={handlePayment} 
            variant="contained" 
            size="large" 
            disabled={processing}
            sx={{ width: '100%' }}
          >
            {processing ? <CircularProgress size={24} /> : `Pay GHS ${totalAmount.toLocaleString()}`}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default PaymentForm;