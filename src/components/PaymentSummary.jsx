// src/components/PaymentSummary.jsx

import React from 'react';
import { Card, CardContent, Typography, Grid, Box, Divider } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PercentIcon from '@mui/icons-material/Percent';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const PaymentSummary = ({ station }) => {
  // --- Calculation Logic ---
  const taxThreshold = 30; // 30%
  const totalLogs = station.contentLog.length;
  const foreignLogs = station.contentLog.filter(log => log.origin === 'Foreign').length;
  
  const foreignPercentage = totalLogs > 0 ? (foreignLogs / totalLogs) * 100 : 0;

  let additionalTax = 0;
  if (foreignPercentage > taxThreshold) {
    // Surcharge rule: 1.5% of base tax for every 1% over the threshold
    const excessPercentage = foreignPercentage - taxThreshold;
    additionalTax = (excessPercentage * 0.015) * station.baseTax;
  }
  const totalTax = station.baseTax + additionalTax;

  // --- Helper Component for Displaying Stats ---
  const StatItem = ({ icon, label, value, color = 'text.primary' }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      {icon}
      <Box sx={{ ml: 2 }}>
        <Typography variant="h6" color={color} fontWeight="bold">{value}</Typography>
        <Typography variant="body2" color="text.secondary">{label}</Typography>
      </Box>
    </Box>
  );

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h5" component="h3" gutterBottom>
          Tax & Payment Summary
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <StatItem 
              icon={null}
              label="Total Songs Played"
              value={`${totalLogs} songs`}
              color={foreignPercentage > taxThreshold ? 'error.main' : 'success.main'}
            />
          </Grid>
          <Grid item xs={6}>
            <StatItem 
              icon={<AttachMoneyIcon />}
              label="Number of Local Songs"
              value={`${station.contentLog.filter(log => log.origin === 'Local').length} songs`}
            />
          </Grid>
          <Grid item xs={6}>
            <StatItem 
              icon={<AttachMoneyIcon color="error" />}
              label="Number of Foreign Songs"
              value={`${station.contentLog.filter(log => log.origin === 'Foreign').length} songs`}
            />
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <StatItem 
              icon={null}
              label="Foreign Content Percentage"
              value={`${foreignPercentage.toFixed(2)}%`}
              color={foreignPercentage > taxThreshold ? 'error.main' : 'success.main'}
            />
          </Grid>
          <Grid item xs={6}>
            <StatItem 
              icon={<AttachMoneyIcon />}
              label="Base Tax"
              value={`GHS ${station.baseTax.toLocaleString()}`}
            />
          </Grid>
          <Grid item xs={6}>
            <StatItem 
              icon={<AttachMoneyIcon color="error" />}
              label="Surcharge (Additional Tax)"
              value={`GHS ${additionalTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            />
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <StatItem 
          icon={<AccountBalanceWalletIcon fontSize="large" color="primary" />}
          label="Total Payable Tax"
          value={`GHS ${totalTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        />
      </CardContent>
    </Card>
  );
};

export default PaymentSummary;