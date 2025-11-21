import React from 'react';
import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * Styled page container with consistent padding and max-width
 */
const PageContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  minHeight: 'calc(100vh - 64px)', // Account for navbar height
  [theme.breakpoints.down('md')]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

/**
 * Styled header section for page titles and descriptions
 */
const PageHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

/**
 * LayoutWrapper Component
 * Provides consistent layout and styling for all pages
 * 
 * @component
 * @example
 * <LayoutWrapper title="Dashboard" subtitle="View your metrics">
 *   <YourContent />
 * </LayoutWrapper>
 */
const LayoutWrapper = ({ 
  children, 
  title, 
  subtitle,
  maxWidth = 'lg',
  className = '',
  sx = {}
}) => {
  return (
    <PageContainer 
      maxWidth={maxWidth}
      sx={{
        ...sx,
      }}
      className={className}
    >
      {(title || subtitle) && (
        <PageHeader>
          {title && (
            <h1 className="page-title">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="page-subtitle">
              {subtitle}
            </p>
          )}
        </PageHeader>
      )}
      {children}
    </PageContainer>
  );
};

export default LayoutWrapper;
