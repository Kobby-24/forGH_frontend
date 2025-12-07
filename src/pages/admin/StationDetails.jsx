// src/pages/admin/StationDetails.jsx

import React from 'react';
import { Skeleton } from '@mui/material';
// moved enhanced table into shared component
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Button, Container, Grid } from '@mui/material'; // <-- Add Grid etc.
// FilterListIcon removed — toolbar moved into shared table component
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HistoryIcon from '@mui/icons-material/History';

// Import our mock data
import useStations from '../../hooks/useStations';
// --- IMPORT THE NEW COMPONENTS ---
import StationChart from '../../components/StationChart';
import PaymentSummary from '../../components/PaymentSummary';
import EnhancedContentTable from '../../components/EnhancedContentTable';

// enhanced table moved to shared component: src/components/EnhancedContentTable.jsx


const StationDetails = () => {
  // 1. Get the 'id' from the URL (e.g., /admin/station/1 -> id will be '1')
  const { id } = useParams();

  // fetch stations
  const { stations, loading, error } = useStations();
  const station = loading ? null : stations.find(s => s.id === parseInt(id));

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

  if (!station) return (
    <Container sx={{ p: 3 }}>
      <Skeleton variant="text" width={300} height={40} />
      <Skeleton variant="text" width={200} />
      <Skeleton variant="rectangular" height={220} sx={{ my: 2 }} />
      <Skeleton variant="rectangular" height={40} />
    </Container>
  );
  if (error) return <Container sx={{ p: 3 }}><Typography color="error">Error: {error}</Typography></Container>;
  // if (!station) {
  //   return (
  //     <Container sx={{ p: 3 }}>
  //       <Typography variant="h5" color="error">Station not found!</Typography>
  //       <Button 
  //         component={Link} 
  //         to="/admin/dashboard" 
  //         variant="contained" 
  //         sx={{ mt: 2 }}
  //       >
  //         Back to Dashboard
  //       </Button>
  //     </Container>
  //   );
  // }


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
          <PaymentSummary station={station} contentLog={thisMonthContentLog} />
        </Grid>
        <Grid item xs={12} md={5}>
          <StationChart contentLog={thisMonthContentLog} />
        </Grid>
      </Grid>

      {/* This Month's Content Log */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight="bold">
          Songs Played This Month ({new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })})
        </Typography>
      </Box>

  {/* Enhanced sortable, paginated table */}
  <EnhancedContentTable contentLog={thisMonthContentLog} />

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