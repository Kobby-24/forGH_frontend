import React from 'react';
import { Card, CardContent, CardHeader, CardActions, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * Styled modern card component with semi-transparent background
 */
const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'rgba(26, 26, 46, 0.6)',
  WebkitBackdropFilter: 'blur(8px)',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(168, 178, 196, 0.12)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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

/**
 * Styled card header with enhanced typography
 */
const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  borderBottom: '1px solid rgba(168, 178, 196, 0.12)',
  paddingBottom: theme.spacing(2),
  '& .MuiCardHeader-title': {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#e8ecf1',
    letterSpacing: '-0.25px',
  },
  '& .MuiCardHeader-subheader': {
    color: '#a9b3c1',
    fontSize: '0.875rem',
    marginTop: theme.spacing(0.5),
  },
}));

/**
 * Styled card content with consistent padding
 */
const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(3),
  '&:last-child': {
    paddingBottom: theme.spacing(3),
  },
}));

/**
 * Styled card actions with proper spacing
 */
const StyledCardActions = styled(CardActions)(({ theme }) => ({
  borderTop: '1px solid rgba(168, 178, 196, 0.12)',
  padding: theme.spacing(2),
  justifyContent: 'flex-end',
  gap: theme.spacing(1),
}));

/**
 * ModernCard Component
 * Provides consistent card styling across the application
 * 
 * @component
 * @example
 * <ModernCard
 *   title="Card Title"
 *   subtitle="Optional subtitle"
 *   actions={<Button>Action</Button>}
 * >
 *   Card content here
 * </ModernCard>
 */
const ModernCard = ({
  children,
  title,
  subtitle,
  header,
  actions,
  className = '',
  sx = {},
  headerSx = {},
  contentSx = {},
  actionsSx = {},
  elevation = 1,
}) => {
  return (
    <StyledCard
      elevation={elevation}
      className={className}
      sx={sx}
    >
      {(title || subtitle || header) && (
        <StyledCardHeader
          title={title}
          subheader={subtitle}
          sx={headerSx}
        />
      )}
      {header && (
        <Box sx={{ p: 3, borderBottom: '1px solid rgba(168, 178, 196, 0.12)' }}>
          {header}
        </Box>
      )}
      <StyledCardContent sx={contentSx}>
        {children}
      </StyledCardContent>
      {actions && (
        <StyledCardActions sx={actionsSx}>
          {actions}
        </StyledCardActions>
      )}
    </StyledCard>
  );
};

export default ModernCard;
