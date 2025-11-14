// src/pages/admin/HistoricalRecordDetails.jsx

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Skeleton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DashboardViewer from '../../components/DashboardViewer';
import useStations from '../../hooks/useStations';

const HistoricalRecordDetails = () => {
  const { stationId, periodId } = useParams();
  const navigate = useNavigate();
  const { stations, loading, error } = useStations();
  const station = loading ? null : stations.find(s => s.id === parseInt(stationId));
  const record = station?.historicalRecords.find(r => r.periodId === periodId);

  if (!record) return (
    <Box sx={{ p: 3 }}>
      <Skeleton variant="text" width={300} height={40} />
      <Skeleton variant="text" width={180} />
      <Skeleton variant="rectangular" height={300} sx={{ my: 2 }} />
    </Box>
  );
  if (error) return <Typography sx={{ p: 3 }} color="error">Error: {error}</Typography>;
  // if (!record) { return <Typography sx={{ p: 3 }}>Historical record not found.</Typography>; }

  const dataForViewer = {
    baseTax: station.baseTax,
    contentLog: record.contentLog,
  };

  return (
    <Box sx={{ p: 3, flexGrow: 1 }}>
      <Button onClick={() => navigate(-1)} startIcon={<ArrowBackIcon />}>
        Back to History List
      </Button>
      <Typography variant="h4" component="h1" fontWeight="bold" sx={{ mt: 2 }}>
        Report for: {record.period}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        A detailed snapshot of content logs and tax calculations for this period.
      </Typography>
      <DashboardViewer stationData={dataForViewer} periodName={record.period.toUpperCase()} />
    </Box>
  );
};

export default HistoricalRecordDetails;