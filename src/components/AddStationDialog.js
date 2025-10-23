// src/components/AddStationDialog.jsx

import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box } from '@mui/material';

const AddStationDialog = ({ open, handleClose, handleAdd }) => {
  const [name, setName] = useState('');
  const [streamUrl, setStreamUrl] = useState('');
  const [baseTax, setBaseTax] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    // Basic validation
    if (!name || !streamUrl || !baseTax) {
      setError(true);
      return; // Stop the submission if fields are empty
    }

    // Pass the new station data up to the Dashboard component
    handleAdd({
      name,
      streamUrl,
      baseTax: parseFloat(baseTax) // Convert tax to a number
    });

    // Clear the form and close the dialog
    handleClose();
    setName('');
    setStreamUrl('');
    setBaseTax('');
    setError(false);
  };
  
  const handleDialogClose = () => {
    // Also reset form state on close
    handleClose();
    setName('');
    setStreamUrl('');
    setBaseTax('');
    setError(false);
  };

  return (
    <Dialog open={open} onClose={handleDialogClose} fullWidth maxWidth="sm">
      <DialogTitle>Add a New Radio Station</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Station Name"
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={error && !name}
            helperText={error && !name ? "Name is required" : ""}
          />
          <TextField
            margin="dense"
            id="streamUrl"
            label="Stream URL"
            type="url"
            fullWidth
            variant="outlined"
            value={streamUrl}
            onChange={(e) => setStreamUrl(e.target.value)}
            error={error && !streamUrl}
            helperText={error && !streamUrl ? "Stream URL is required" : ""}
          />
          <TextField
            margin="dense"
            id="baseTax"
            label="Base Tax (GHS)"
            type="number"
            fullWidth
            variant="outlined"
            value={baseTax}
            onChange={(e) => setBaseTax(e.target.value)}
            error={error && !baseTax}
            helperText={error && !baseTax ? "Base Tax is required" : ""}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Add Station</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStationDialog;