// src/components/AddUserDialog.jsx

import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';

const AddUserDialog = ({ open, handleClose, handleAddUser, stations }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [stationId, setStationId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!username || !password || !stationId) {
      setError('All fields are required.');
      return;
    }

    const newUser = {
      username,
      password,
      email: email,
      role: 'station', // Role is fixed for this form
      stationId: parseInt(stationId),
    };
    
    handleAddUser(newUser);
    handleDialogClose();
  };

  const handleDialogClose = () => {
    // Reset form on close
    setUsername('');
    setPassword('');
    setStationId('');
    setEmail('');
    setError('');
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleDialogClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Station User</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!error && !username}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error && !password}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error && !email}
          />
          <FormControl fullWidth margin="dense" error={!!error && !stationId}>
            <InputLabel id="station-select-label">Assign to Station</InputLabel>
            <Select
              labelId="station-select-label"
              value={stationId}
              label="Assign to Station"
              onChange={(e) => setStationId(e.target.value)}
            >
              {stations.map((station) => (
                <MenuItem key={station.id} value={station.id}>
                  {station.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {error && <Typography color="error" variant="body2" sx={{ mt: 1 }}>{error}</Typography>}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Create User</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserDialog;