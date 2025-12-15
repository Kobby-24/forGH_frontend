// src/components/Navbar.jsx

import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Autocomplete, TextField, useScrollTrigger, Slide, Skeleton } from '@mui/material';
import RadioIcon from '@mui/icons-material/Radio';
import { useStationsList } from '../hooks/useStations';

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
  const { stations, loading: stationsLoading } = useStationsList();

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
        <AppBar 
          position="fixed" 
          sx={{ 
            backgroundColor: 'rgba(26, 26, 46, 0.75)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 2px 20px rgba(0, 0, 0, 0.3)',
            borderBottom: '1px solid rgba(168, 178, 196, 0.12)',
            color: '#e8ecf1',
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                mr: 25,
                fontWeight: 600,
                letterSpacing: '-0.5px',
              }}
              onClick={handleTitleClick}
            >
              <RadioIcon sx={{ mr: 2, fontSize: 28 }} /> Monitor
            </Typography>

            {/* Search stations by name in the middle of the appbar (admin only) */}
            {user?.role === 'admin' && (
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', color: 'white', borderRadius: '100px' }}>
                {stationsLoading ? (
                  <Skeleton variant="rectangular" width={500} height={40} />
                ) : (
                  <Autocomplete
                    size="small"
                    sx={{ 
                      width: 500, 
                      color: '#e8ecf1',
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(45, 53, 97, 0.5)',
                        borderColor: 'rgba(168, 178, 196, 0.3)',
                        '&:hover': {
                          borderColor: 'rgba(168, 178, 196, 0.5)',
                        },
                        '&.Mui-focused': {
                          borderColor: '#7b68ee',
                          backgroundColor: 'rgba(45, 53, 97, 0.7)',
                        },
                      },
                      borderRadius: '100px',
                    }}
                    options={(Array.isArray(stations) ? stations : []).map(s => ({ label: s.name, id: s.id }))}
                    getOptionLabel={(option) => option.label || ''}
                    noOptionsText={'No stations found'}
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
                      <TextField 
                        {...params} 
                        placeholder="Search stations..." 
                        variant="outlined" 
                        sx={{ 
                          borderRadius: '100px',
                          '& .MuiOutlinedInput-input': {
                            color: '#e8ecf1',
                            '&::placeholder': {
                              color: '#a9b3c1',
                              opacity: 0.7,
                            },
                          },
                        }} 
                      />
                    )}
                  />
                )}
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
                    sx={{ 
                      mr: 2,
                      color: '#e8ecf1',
                      fontWeight: 500,
                      '&:hover': {
                        backgroundColor: 'rgba(123, 104, 238, 0.2)',
                      },
                    }}
                  >
                    Manage Users
                  </Button>
                )}

                <Typography sx={{ mr: 2, fontWeight: 500 }}>
                  Welcome, <strong>{user.username}</strong>
                </Typography>
                <Button 
                  color="inherit" 
                  onClick={handleLogout} 
                  variant="outlined"
                  sx={{
                    color: '#e8ecf1',
                    borderColor: 'rgba(123, 104, 238, 0.5)',
                    '&:hover': {
                      borderColor: '#7b68ee',
                      backgroundColor: 'rgba(123, 104, 238, 0.1)',
                    },
                  }}
                >
                  Logout
                </Button>
              </Box>
            ) : (
              <Button 
                color="inherit" 
                component={Link} 
                to="/login"
                sx={{
                  color: '#e8ecf1',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: 'rgba(123, 104, 238, 0.2)',
                  },
                }}
              >
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