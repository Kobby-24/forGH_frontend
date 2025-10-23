// src/pages/admin/Dashboard.jsx

import React, { useState } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// Import our mock data and the card component
import { mockStations } from '../../mock/data';
import StationCard from '../../components/StationCard';
// We will uncomment this next
import AddStationDialog from '../../components/AddStationDialog';

const Dashboard = () => {
  // We use state to hold our stations. Later, this will come from an API.
  const [stations, setStations] = useState(mockStations);
  const [openDialog, setOpenDialog] = useState(false); // State to control the dialog

  const handleAddStation = (newStation) => {
    // This function will add the new station to our list
    // For now, it just adds to the state. We give it a temporary ID.
    setStations([...stations, { ...newStation, id: stations.length + 1, contentLog: [] }]);
  };

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
        {stations.map((station) => (
          <Grid item key={station.id} xs={12} sm={6} md={4} lg={3}>
            <StationCard station={station} />
          </Grid>
        ))}
      </Grid>
      
      {/* --- ADD STATION DIALOG --- */}
      {/* We will build and import this component next */}
      <AddStationDialog 
        open={openDialog} 
        handleClose={() => setOpenDialog(false)}
        handleAdd={handleAddStation}
      /> 
     
    </Box>
  );
};

export default Dashboard;