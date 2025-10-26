// src/pages/admin/StationDetails.jsx

import React from 'react';
// moved enhanced table into shared component
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Button, Container, Grid } from '@mui/material'; // <-- Add Grid etc.
// FilterListIcon removed — toolbar moved into shared table component
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HistoryIcon from '@mui/icons-material/History';

// Import our mock data
import { mockStations } from '../../mock/data';
// --- IMPORT THE NEW COMPONENTS ---
import StationChart from '../../components/StationChart';
import PaymentSummary from '../../components/PaymentSummary';
import EnhancedContentTable from '../../components/EnhancedContentTable';

// enhanced table moved to shared component: src/components/EnhancedContentTable.jsx


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


  // (timestamp formatting is handled by the shared table component)

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

      

  {/* Enhanced sortable, paginated table */}
  <EnhancedContentTable contentLog={station.contentLog} />

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