// src/components/DashboardViewer.jsx

import React from 'react';
import { Box, Grid, Divider, Chip, Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material';
import PaymentSummary from './PaymentSummary';
import StationChart from './StationChart';

// This is a re-creation of our previous table logic
const ContentLogTable = ({ contentLog }) => {
  const formatTimestamp = (isoString) => new Date(isoString).toLocaleString('en-GB');

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}><TableRow><TableCell>Timestamp</TableCell><TableCell>Title</TableCell><TableCell>Artist</TableCell><TableCell>Origin</TableCell></TableRow></TableHead>
        <TableBody>
          {contentLog.map((log, index) => (
            <TableRow key={index}>
              <TableCell>{formatTimestamp(log.timestamp)}</TableCell>
              <TableCell>{log.title}</TableCell>
              <TableCell>{log.artist}</TableCell>
              <TableCell><Chip label={log.origin} color={log.origin === 'Foreign' ? 'error' : 'success'} size="small" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

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
      <ContentLogTable contentLog={stationData.contentLog} />
    </Box>
  );
};

export default DashboardViewer;