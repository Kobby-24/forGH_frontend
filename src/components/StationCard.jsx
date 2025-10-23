// src/components/StationCard.jsx

import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const StationCard = ({ station }) => {
  // A quick calculation for the summary
  const totalLogs = station.contentLog.length;
  const foreignLogs = station.contentLog.filter(log => log.origin === 'Foreign').length;
  const foreignPercentage = totalLogs > 0 ? ((foreignLogs / totalLogs) * 100).toFixed(1) : 0;

  return (
    <Card sx={{ width: 345, m: 2, display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {station.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Base Tax: GHS {station.baseTax.toLocaleString()}
        </Typography>
        <Box sx={{ mt: 2, p: 1, backgroundColor: foreignPercentage > 30 ? '#fff0f0' : '#f0fff0', borderRadius: 1 }}>
            <Typography variant="body1">
              Foreign Content: <strong>{foreignPercentage}%</strong>
            </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button 
          component={Link} 
          to={`/admin/station/${station.id}`} 
          size="small"
        >
          View Details & Reports
        </Button>
      </CardActions>
    </Card>
  );
};

export default StationCard;