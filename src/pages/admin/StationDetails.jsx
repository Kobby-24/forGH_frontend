// src/pages/admin/StationDetails.jsx

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Button, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material'; // <-- Add Grid + table pieces
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HistoryIcon from '@mui/icons-material/History';

// Import our mock data
import { mockStations } from '../../mock/data';
// --- IMPORT THE NEW COMPONENTS ---
import StationChart from '../../components/StationChart';
import PaymentSummary from '../../components/PaymentSummary';

const StationDetails = () => {
  // 1. Get the 'id' from the URL (e.g., /admin/station/1 -> id will be '1')
  const { id } = useParams();

  // 2. Find the station in our mock data that matches the id from the URL
  // We use parseInt because the id from the URL is a string
  const station = mockStations.find(s => s.id === parseInt(id));

  // 3. Handle case where no station is found for the given id
  if (!station) {
    return (
      <Container sx={{ p: 3 }}>
        <Typography variant="h5" color="error">Station not found!</Typography>
        <Button 
          component={Link} 
          to="/admin/dashboard" 
          variant="contained" 
          sx={{ mt: 2 }}
        >
          Back to Dashboard
        </Button>
      </Container>
    );
  }


  // A helper function to format the timestamp
  const formatTimestamp = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Box sx={{ p: 3, flexGrow: 1 }}>
      {/* --- PAGE HEADER --- */}
      <Box sx={{ mb: 4 }}>
        <Button 
          component={Link} 
          to="/admin/dashboard"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 2 }}
        >
          Back to Dashboard
        </Button>
        <Typography variant="h4" component="h1" fontWeight="bold">
          {station.name} - Content Log
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Detailed report and tax analysis.
        </Typography>
      </Box>

      {/* --- ADD THE NEW ANALYSIS SECTION --- */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={7}>
          <PaymentSummary station={station} />
        </Grid>
        <Grid item xs={12} md={5}>
          <StationChart contentLog={station.contentLog} />
        </Grid>
      </Grid>

      

      <TableContainer component={Paper} sx={{ mt: 4 }}>
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

      {/* We will add Charts and Payment Summary here in the next steps */}
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

export default StationDetails;