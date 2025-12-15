// src/components/StationCard.jsx

import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import StorageIcon from '@mui/icons-material/Storage';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'rgba(26, 26, 46, 0.6)',
  WebkitBackdropFilter: 'blur(8px)',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(168, 178, 196, 0.12)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, 
      rgba(123, 104, 238, 0.05) 0%, 
      rgba(123, 104, 238, 0) 100%)`,
    pointerEvents: 'none',
  },
  '&:hover': {
    backgroundColor: 'rgba(26, 26, 46, 0.7)',
    boxShadow: '0 8px 32px rgba(123, 104, 238, 0.15)',
    borderColor: 'rgba(123, 104, 238, 0.4)',
  },
}));

const StationCard = ({ station }) => {
  if (!station) return null;

  // Use pre-computed value from backend
  const foreignPercentage = station.foreignPercentage || 0;

  return (
    <StyledCard>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1.5 }}>
          <StorageIcon sx={{ color: '#7b68ee', fontSize: 28, mt: 0.5 }} />
          <Typography variant="h5" component="div" sx={{ color: '#e8ecf1', fontWeight: 600 }}>
            {station.name}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: '#a9b3c1', mb: 2 }}>
          Base Tax: <span style={{ color: '#e8ecf1', fontWeight: 500 }}>GHS {Number(station.baseTax ?? 0).toLocaleString()}</span>
        </Typography>
        
        <Box 
          sx={{ 
            mt: 2, 
            p: 1.5, 
            backgroundColor: foreignPercentage > 30 
              ? 'rgba(239, 68, 68, 0.1)' 
              : 'rgba(34, 197, 94, 0.1)',
            border: `1px solid ${foreignPercentage > 30 
              ? 'rgba(239, 68, 68, 0.3)' 
              : 'rgba(34, 197, 94, 0.3)'}`,
            borderRadius: 1.5,
          }}
        >
          <Typography 
            variant="body2"
            sx={{
              color: foreignPercentage > 30 ? '#fca5a5' : '#86efac',
              fontSize: '0.85rem',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}
          >
            Foreign Content: <strong style={{ fontSize: '1.1rem' }}>{foreignPercentage}%</strong>
          </Typography>
        </Box>
      </CardContent>
      
      <CardActions sx={{ borderTop: '1px solid rgba(168, 178, 196, 0.12)', pt: 2 }}>
        <Button 
          component={Link} 
          to={`/admin/station/${station.id}`} 
          size="small"
          variant='outlined'
          fullWidth
          sx={{
            color: '#e8ecf1',
            borderColor: 'rgba(123, 104, 238, 0.5)',
            '&:hover': {
              borderColor: '#7b68ee',
              backgroundColor: 'rgba(123, 104, 238, 0.1)',
            },
          }}
        >
          View Details & Reports
        </Button>
      </CardActions>
    </StyledCard>
  );
};

export default StationCard;