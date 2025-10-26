// src/components/DashboardViewer.jsx

import React from 'react';
import { Box, Grid, Divider, Chip, Typography } from '@mui/material';
import PaymentSummary from './PaymentSummary';
import StationChart from './StationChart';
import EnhancedContentTable from './EnhancedContentTable';

// The main viewer component
const DashboardViewer = ({ stationData, periodName }) => {
  if (!stationData || !stationData.contentLog) {
    return <Typography>No data to display for this period.</Typography>;
  }

  // We pass the full station object to PaymentSummary, but only the contentLog to the chart and table
  const stationForSummary = {
    baseTax: stationData.baseTax,
    contentLog: stationData.contentLog,
  };

  return (
    <Box>
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={7}>
          <PaymentSummary station={stationForSummary} />
        </Grid>
        <Grid item xs={12} md={5}>
          <StationChart contentLog={stationData.contentLog} />
        </Grid>
      </Grid>
  <Divider sx={{ my: 4 }}><Chip label={`DETAILED LOG FOR ${periodName}`} /></Divider>
  <EnhancedContentTable contentLog={stationData.contentLog} />
    </Box>
  );
};

export default DashboardViewer;