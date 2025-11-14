// src/pages/admin/Dashboard.jsx

import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Skeleton } from '@mui/material';
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
          handleAdd={(newStation) => {
            // add locally to UI; backend syncing can be added later
            setStations((prev) => [...prev, { ...newStation, id: (prev?.length ?? 0) + 1, contentLog: [] }]);
          }}
        /> 
     
    </Box>
  );
};

export default Dashboard;