import React from 'react';
import { Card, CardContent, Box, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * Styled metric item with icon, value, and label
 */
const MetricCard = styled(Card)(({ theme }) => ({
  flex: 1,
  minHeight: 140,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
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
      rgba(123, 104, 238, 0.1) 0%, 
      rgba(123, 104, 238, 0) 100%)`,
    pointerEvents: 'none',
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  fontSize: 40,
  marginBottom: theme.spacing(1.5),
  color: '#7b68ee',
  opacity: 0.9,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 50,
  width: 50,
  borderRadius: '12px',
  backgroundColor: 'rgba(123, 104, 238, 0.15)',
  marginLeft: 'auto',
  marginRight: 'auto',
}));

const MetricValue = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 700,
  color: '#e8ecf1',
  letterSpacing: '-1px',
  marginBottom: theme.spacing(0.5),
  lineHeight: 1,
}));

const MetricLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.95rem',
  fontWeight: 500,
  color: '#a9b3c1',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  marginTop: theme.spacing(1),
}));

/**
 * MetricsCard Component
 * Displays three metrics in a horizontal card layout with icons
 *
 * @component
 * @example
 * const metrics = [
 *   { icon: <StorageIcon />, value: '156', label: 'Total Stations' },
 *   { icon: <PeopleIcon />, value: '23', label: 'Active Users' },
 *   { icon: <SignalCellularAltIcon />, value: '98%', label: 'Uptime' },
 * ];
 * <MetricsCard metrics={metrics} />
 */
const MetricsCard = ({ metrics = [] }) => {
  return (
    <Card
      sx={{
        width: '100%',
        backgroundColor: 'rgba(26, 26, 46, 0.6)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(168, 178, 196, 0.12)',
        marginBottom: 3,
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          gap: 3,
          justifyContent: 'space-around',
          padding: 3,
        }}
      >
        {metrics.map((metric, index) => (
          <Box
            key={index}
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: '20px 0',
              position: 'relative',
              '&:not(:last-child)': {
                borderRight: '1px solid rgba(168, 178, 196, 0.12)',
              },
            }}
          >
            {metric.icon && (
              <IconWrapper>
                {metric.icon}
              </IconWrapper>
            )}
            <MetricValue>
              {metric.value}
            </MetricValue>
            <MetricLabel>
              {metric.label}
            </MetricLabel>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
