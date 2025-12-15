// src/pages/station/StationDashboard.jsx

import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Box, Typography, Chip, Grid, Divider, Button, Skeleton, Container } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';

// Import our shared components
import { useStationById } from '../../hooks/useStations';
import StationChart from '../../components/StationChart';
import PaymentSummary from '../../components/PaymentSummary';
import PaymentForm from '../../components/PaymentForm';
import EnhancedContentTable from '../../components/EnhancedContentTable';

const StationDashboard = () => {
  // Determine which station to show: first from route state, then from stored user
  const location = useLocation();
  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch (e) {
      return null;
    }
  })();
  
  const stationId = location.state?.stationId ?? storedUser?.station?.id ?? null;
  
  // Fetch ONLY this specific station (same as StationDetails)
  const { station, loading, error } = useStationById(stationId ? parseInt(stationId) : null);
  
  const [openPayment, setOpenPayment] = useState(false);

  // Filter content log to show only this month's entries
  const getThisMonthContentLog = (contentLog) => {
    if (!Array.isArray(contentLog)) return [];
    
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    
    return contentLog.filter(log => {
      const logDate = new Date(log.timestamp);
      return logDate.getFullYear() === currentYear && logDate.getMonth() === currentMonth;
    });
  };

  const thisMonthContentLog = station ? getThisMonthContentLog(station.contentLog) : [];

  // Show loading state
  if (loading || !station) return (
    <Box sx={{ p: 3 }}>
      <Skeleton variant="text" width={300} height={40} />
      <Skeleton variant="text" width={220} />
      <Grid container spacing={4} sx={{ mb: 12 }}>
        <Grid item xs={12} md={7}>
          <Skeleton variant="rectangular" height={180} />
        </Grid>
        <Grid item xs={12} md={5}>
          <Skeleton variant="rectangular" height={180} />
        </Grid>
      </Grid>
      <Skeleton variant="rectangular" height={300} />
    </Box>
  );

  // Show error state
  if (error) return (
    <Container sx={{ p: 3 }}>
      <Typography color="error">Error: {error}</Typography>
    </Container>
  );

  // Show not found state
  // if (!station) return (
  //   <Container sx={{ p: 3 }}>
  //     <Typography variant="h5" color="error">Station data not found. Please log in again.</Typography>
  //     <Button 
  //       component={Link} 
  //       to="/station/dashboard" 
  //       variant="contained" 
  //       sx={{ mt: 2 }}
  //     >
  //       Back to Dashboard
  //     </Button>
  //   </Container>
  // );

  // --- Payment calculation ---
  const totalLogs = Array.isArray(station.contentLog) ? station.contentLog.length : 0;
  const foreignLogs = Array.isArray(station.contentLog) ? station.contentLog.filter(log => log.origin === 'Foreign').length : 0;
  const foreignPercentage = totalLogs > 0 ? (foreignLogs / totalLogs) * 100 : 0;
  const taxThreshold = 30; // 30%
  let additionalTax = 0;
  if (foreignPercentage > taxThreshold) {
    const excessPercentage = foreignPercentage - taxThreshold;
    additionalTax = (excessPercentage * 0.015) * station.baseTax; // 1.5% per 1% over threshold
  }
  const totalTax = station.baseTax + additionalTax;

  const handleOpenPayment = () => setOpenPayment(true);
  const handleClosePayment = () => setOpenPayment(false);
  const handlePaymentSuccess = () => {
    // you can add more behavior here: update UI, call an API, etc.
  };

  return (
    <Box sx={{ p: 3, flexGrow: 1 }}>
      {/* --- PAGE HEADER --- */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          {station.name} Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Here is your current content and tax summary.
        </Typography>
      </Box>

      {/* --- REUSING THE ANALYSIS COMPONENTS --- */}
      <Grid container spacing={4} sx={{ mb: 12 }}>
        <Grid item xs={12} md={7}>
          <PaymentSummary station={station} contentLog={thisMonthContentLog} />
          <Button variant="contained" size="large" sx={{ mt: 2, width: '100%' }} onClick={handleOpenPayment}>
            Proceed to Payment
          </Button>
        </Grid>
        <Grid item xs={12} md={5}>
          <StationChart contentLog={thisMonthContentLog} />
        </Grid>
      </Grid>

      <Divider sx={{ my: 4, mt: 4 }}><Chip label="YOUR DETAILED CONTENT LOG THIS MONTH" /></Divider>

      {/* --- REUSING THE CONTENT LOG TABLE --- */}
      <EnhancedContentTable contentLog={thisMonthContentLog} />

      {/* Payment dialog */}
      <PaymentForm
        open={openPayment}
        handleClose={handleClosePayment}
        totalAmount={Number(totalTax)}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<HistoryIcon />}
          component={Link}
          to={`/admin/station/${station.id}/history`}
        >
          View Full Payment & Content History
        </Button>
      </Box>
    </Box>
  );
};

export default StationDashboard;