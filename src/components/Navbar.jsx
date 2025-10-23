// src/components/Navbar.jsx

import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import RadioIcon from '@mui/icons-material/Radio';

const Navbar = () => {
  const navigate = useNavigate();
  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    // Redirect to the login page
    navigate('/login');
  };

  const handleTitleClick = () => {
    if (user?.role === 'admin') {
      navigate('/admin/dashboard');
    } else if (user?.role === 'station') {
      navigate('/station/dashboard', { state: { stationId: user.stationId } });
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2c3e50' }}>
      <Toolbar>
        <RadioIcon sx={{ mr: 2 }} />
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={handleTitleClick}
        >
          GH Radio Monitor
        </Typography>
        
        {user ? (
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            {/* Admin-only Manage Users button */}
            {user.role === 'admin' && (
              <Button 
                color="inherit" 
                component={Link} 
                to="/admin/users"
                sx={{ mr: 2 }}
              >
                Manage Users
              </Button>
            )}

            <Box sx={{ flexGrow: 1 }} /> {/* This pushes the following items to the right */}

            <Typography sx={{ mr: 2 }}>
              Welcome, <strong>{user.username}</strong>
            </Typography>
            <Button color="inherit" onClick={handleLogout} variant="outlined">
              Logout
            </Button>
          </Box>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;