// src/pages/Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import ModernCard from '../components/ModernCard';

// Styled login container that inherits the app background
const LoginContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  padding: theme.spacing(2),
  position: 'relative',
  zIndex: 1,
}));

// Styled login card with modern glassmorphic design
const LoginCardContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const LoginTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 700,
  color: '#e8ecf1',
  textAlign: 'center',
  marginBottom: theme.spacing(1),
  letterSpacing: '-0.5px',
}));

const LoginSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.95rem',
  color: '#a9b3c1',
  textAlign: 'center',
  marginBottom: theme.spacing(3),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(45, 53, 97, 0.4)',
    color: '#e8ecf1',
    '& fieldset': {
      borderColor: 'rgba(168, 178, 196, 0.2)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(168, 178, 196, 0.4)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#7b68ee',
    },
  },
  '& .MuiInputBase-input': {
    color: '#e8ecf1',
    '&::placeholder': {
      color: '#a9b3c1',
      opacity: 0.7,
    },
  },
  '& .MuiInputLabel-root': {
    color: '#a9b3c1',
    '&.Mui-focused': {
      color: '#7b68ee',
    },
  },
}));

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://forgh-457a24871359.herokuapp.com/users/login', {
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
    <LoginContainer>
      <ModernCard
        sx={{
          width: '100%',
          maxWidth: 400,
          backgroundColor: 'rgba(26, 26, 46, 0.75)',
          WebkitBackdropFilter: 'blur(12px)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(168, 178, 196, 0.15)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}
      >
        <LoginCardContent component="form" onSubmit={handleLogin} noValidate>
          <LoginTitle variant="h3" component="h1">
            Monitor
          </LoginTitle>
          <LoginSubtitle variant="body2">
            Sign in to your account
          </LoginSubtitle>

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                color: '#fca5a5',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                '& .MuiAlert-icon': {
                  color: '#fca5a5',
                }
              }}
            >
              {error}
            </Alert>
          )}

          <StyledTextField
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
            variant="outlined"
            size="small"
          />

          <StyledTextField
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
            variant="outlined"
            size="small"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              backgroundColor: '#7b68ee',
              color: '#e8ecf1',
              fontWeight: 600,
              padding: '10px 16px',
              marginTop: 2,
              '&:hover': {
                backgroundColor: '#9d84eb',
                boxShadow: '0 4px 12px rgba(123, 104, 238, 0.3)',
              },
              '&:disabled': {
                backgroundColor: '#5a4fb8',
                opacity: 0.7,
              },
            }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: '#e8ecf1' }} /> : 'Sign In'}
          </Button>
        </LoginCardContent>
      </ModernCard>
    </LoginContainer>
  );
};

export default LoginPage;