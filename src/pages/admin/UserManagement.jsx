// src/pages/admin/UserManagement.jsx

import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { mockUsers, mockStations } from '../../mock/data';
import AddUserDialog from '../../components/AddUserDialog';

const UserManagement = () => {
  const [users, setUsers] = useState(mockUsers);
  const [stations] = useState(mockStations);
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddNewUser = (newUser) => {
    // In a real app, this would be an API call. Here, we just update state.
    setUsers([...users, newUser]);
  };
  
  const getStationNameById = (id) => {
    const station = stations.find(s => s.id === id);
    return station ? station.name : 'N/A';
  };

  return (
    <Box sx={{ p: 3, flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          User Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Add New User
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Assigned Station</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.username}</TableCell>
                <TableCell sx={{ textTransform: 'capitalize' }}>{user.role}</TableCell>
                <TableCell>{user.role === 'station' ? getStationNameById(user.stationId) : 'Admin'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddUserDialog 
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        handleAddUser={handleAddNewUser}
        stations={stations}
      />
    </Box>
  );
};

export default UserManagement;