// src/pages/admin/Dashboard.jsx

import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Skeleton, Snackbar, Alert } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// Import our mock data and the card component
import useStations from '../../hooks/useStations';
import StationCard from '../../components/StationCard';
import LayoutWrapper from '../../components/LayoutWrapper';
import MetricsCard from '../../components/MetricsCard';
// We will uncomment this next
import AddStationDialog from '../../components/AddStationDialog';
import StorageIcon from '@mui/icons-material/Storage';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import PeopleIcon from '@mui/icons-material/People';

const Dashboard = () => {
  // Fetch stations from backend
  const { stations, setStations, loading, error } = useStations();
  const [openDialog, setOpenDialog] = useState(false); // State to control the dialog
  const [createError, setCreateError] = useState(null);
  const [createSuccess, setCreateSuccess] = useState(null);

  // Calculate dashboard metrics
  const totalStations = stations?.length || 0;
  const activeStations = stations?.filter(s => s.status === 'active').length || 0;
  const uptime = '98.5%';

  const metricsData = [
    { icon: <StorageIcon />, value: totalStations.toString(), label: 'Total Stations' },
    { icon: <PeopleIcon />, value: activeStations.toString(), label: 'Active Stations' },
    { icon: <SignalCellularAltIcon />, value: uptime, label: 'System Uptime' },
  ];



  return (
    <LayoutWrapper 
      title="Stations Dashboard" 
      subtitle="Monitor and manage all your stations"
      maxWidth="xl"
    >
      {/* --- METRICS SECTION --- */}
      <MetricsCard metrics={metricsData} />

      {/* --- ACTION HEADER --- */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: '#e8ecf1' }}>
          All Stations
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{
            backgroundColor: '#7b68ee',
            '&:hover': {
              backgroundColor: '#9d84eb',
            },
          }}
        >
          Add New Station
        </Button>
      </Box>

      {/* --- STATIONS GRID --- */}
      <Grid container spacing={2}>
        {loading ? (
          // show skeletons that resemble StationCard tiles
          Array.from({ length: 8 }).map((_, i) => (
            <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
              <Box sx={{ p: 1 }}>
                <Skeleton variant="rectangular" height={140} animation="wave" />
                <Skeleton width="60%" />
                <Skeleton width="40%" />
              </Box>
            </Grid>
          ))
        ) : error ? (
          <Grid item xs={12}><em>Error loading stations: {error}</em></Grid>
        ) : (
          stations.map((station) => (
            <Grid item key={station.id} xs={12} sm={6} md={4} lg={3}>
              <StationCard station={station} />
            </Grid>
          ))
        )}
      </Grid>
      
      {/* --- ADD STATION DIALOG --- */}
      {/* We will build and import this component next */}
      <AddStationDialog 
          open={openDialog} 
          handleClose={() => setOpenDialog(false)}
          handleAdd={async (newStation) => {
            // POST to backend then append created station to state
            setCreateError(null);
            try {
              const payload = {
                name: newStation.name,
                url: newStation.streamUrl,
                base_tax: Number(newStation.baseTax),
              };
              const res = await fetch('https://forgh-457a24871359.herokuapp.com/stations/', {
                method: 'POST',
                headers: {
                  accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
              });
              if (!res.ok) {
                const text = await res.text().catch(() => '');
                throw new Error(text || `HTTP ${res.status}`);
              }
              const created = await res.json();
              setStations((prev) => [...(prev || []), created]);
              setCreateSuccess('Station added successfully');
            } catch (err) {
              console.error('Failed to create station', err);
              setCreateError(err.message || 'Failed to create station');
            } finally {
              setOpenDialog(false);
            }
          }}
        /> 

      <Snackbar open={!!createSuccess} autoHideDuration={6000} onClose={() => setCreateSuccess(null)}>
        <Alert onClose={() => setCreateSuccess(null)} severity="success" sx={{ width: '100%' }}>
          {createSuccess}
        </Alert>
      </Snackbar>

      <Snackbar open={!!createError} autoHideDuration={8000} onClose={() => setCreateError(null)}>
        <Alert onClose={() => setCreateError(null)} severity="error" sx={{ width: '100%' }}>
          {createError}
        </Alert>
      </Snackbar>
    </LayoutWrapper>
  );
};

export default Dashboard;