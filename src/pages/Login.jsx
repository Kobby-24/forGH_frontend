// src/pages/Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/users/login', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.detail || 'Invalid username or password.');
        setLoading(false);
        return;
      }

      const data = await response.json();

      // Store user data and token
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('access_token', data.access_token);

      // Redirect based on role
      if (data.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (data.role === 'station') {
        navigate('/station/dashboard', { state: { stationId: data.station } });
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f2f5',
      }}
    >
      <Card sx={{ width: 400, p: 2 }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom textAlign="center">
            Login
          </Typography>
          <Box component="form" onSubmit={handleLogin} noValidate>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;