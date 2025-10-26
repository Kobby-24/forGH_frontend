// src/components/Navbar.jsx

import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Autocomplete, TextField, useScrollTrigger, Slide } from '@mui/material';
import RadioIcon from '@mui/icons-material/Radio';
import { mockStations } from '../mock/data';

// Hide on scroll helper (MUI pattern)
function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = (props) => {
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
    <>
      <HideOnScroll {...props}>
        <AppBar position="fixed" sx={{ backgroundColor: '#2c3e50', color: '#ecf0f1' }}>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              width={12}
              sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', mr: 25 }}
              onClick={handleTitleClick}
            >
              <RadioIcon sx={{ mr: 2 }} /> Monitor
            </Typography>

            {/* Search stations by name in the middle of the appbar (admin only) */}
            {user?.role === 'admin' && (
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', color: 'white', borderColor: 'white', borderRadius: '100px' }}>
                <Autocomplete
                  size="small"
                  sx={{ width: 500, color: 'white', borderColor: 'white', borderRadius: '100px' }}
                  options={mockStations.map(s => ({ label: s.name, id: s.id }))}
                  getOptionLabel={(option) => option.label || ''}
                  noOptionsText="No stations found"
                  onChange={(event, value) => {
                    if (!value) return;
                    const stationId = value.id;
                    // Navigate depending on user role
                    if (user?.role === 'admin') {
                      navigate(`/admin/station/${stationId}`);
                    } else if (user?.role === 'station') {
                      navigate('/station/dashboard', { state: { stationId } });
                    } else {
                      // default to admin station view
                      navigate(`/admin/station/${stationId}`);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Search stations..." variant="outlined" sx={{ backgroundColor: '#9da2a7ff', textColor: 'white', borderColor: 'white', borderRadius: '100px' }} />
                  )}
                />
              </Box>
            )}

            {/* This pushes the following items to the right */}
            {user ? (
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                {/* Admin-only Manage Users button */}
                <Box sx={{ flexGrow: 1 }} />
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
      </HideOnScroll>

      {/* toolbar spacer so page content isn't hidden under fixed appbar */}
      <Toolbar />
    </>
  );
};

export default Navbar;