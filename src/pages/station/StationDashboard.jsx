// src/pages/station/StationDashboard.jsx

import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom'; // new
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Grid, Divider, Button } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';

// Import our shared components and mock data
import { mockStations } from '../../mock/data';
import StationChart from '../../components/StationChart';
import PaymentSummary from '../../components/PaymentSummary';
import PaymentForm from '../../components/PaymentForm';
// We will build and use this component next
// import PaymentForm from '../../components/PaymentForm'; 

const StationDashboard = () => {
  // Determine which station to show: first from route state, then from stored user, else null
  const location = useLocation();
  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch (e) {
      return null;
    }
  })();
  const stationId = location.state?.stationId ?? storedUser?.stationId ?? null;
  const station = stationId ? mockStations.find(s => s.id === Number(stationId)) : null;
  const [openPayment, setOpenPayment] = useState(false);

  if (!station) {
    return <Typography sx={{ p: 3 }}>Station data not found. Please log in again.</Typography>;
  }

  // --- Payment calculation (same logic as PaymentSummary) ---
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

  // A helper function to format the timestamp (copied from StationDetails)
  const formatTimestamp = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', { 
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
    });
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
          <PaymentSummary station={station} />
          <Button variant="contained" size="large" sx={{ mt: 2, width: '100%' }} onClick={handleOpenPayment}>
            Proceed to Payment
          </Button>
        </Grid>
        <Grid item xs={12} md={5}>
          <StationChart contentLog={station.contentLog} />
        </Grid>
      </Grid>

      <Divider sx={{ my: 4, mt: 4 }}><Chip label="YOUR DETAILED CONTENT LOG" /></Divider>

      {/* --- REUSING THE CONTENT LOG TABLE --- */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="station content log table">
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Artist</TableCell>
              <TableCell>Origin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {station.contentLog.map((log, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{formatTimestamp(log.timestamp)}</TableCell>
                <TableCell>{log.title}</TableCell>
                <TableCell>{log.artist}</TableCell>
                <TableCell>
                  <Chip
                    label={log.origin}
                    color={log.origin === 'Foreign' ? 'error' : 'success'}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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