// src/pages/admin/Dashboard.jsx

import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Skeleton, Snackbar, Alert } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// Import our mock data and the card component
import useStations from '../../hooks/useStations';
import StationCard from '../../components/StationCard';
// We will uncomment this next
import AddStationDialog from '../../components/AddStationDialog';

const Dashboard = () => {
  // Fetch stations from backend
  const { stations, setStations, loading, error } = useStations();
  const [openDialog, setOpenDialog] = useState(false); // State to control the dialog
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [createSuccess, setCreateSuccess] = useState(null);



  return (
    <Box sx={{ p: 3, flexGrow: 1 }}>
      {/* --- PAGE HEADER --- */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Stations Dashboard
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => setOpenDialog(true)} // This will open the dialog on Day 7
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
            setCreating(true);
            setCreateError(null);
            try {
              const payload = {
                name: newStation.name,
                url: newStation.streamUrl,
                base_tax: Number(newStation.baseTax),
              };
              const res = await fetch('http://127.0.0.1:8000/stations/', {
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
              setCreating(false);
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
     
    </Box>
  );
};

export default Dashboard;