// src/pages/admin/HistoricalRecordDetails.jsx

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Skeleton, Container } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DashboardViewer from '../../components/DashboardViewer';
import { useHistoricalRecord } from '../../hooks/useStations';

const HistoricalRecordDetails = () => {
  const { stationId, periodId } = useParams();
  const navigate = useNavigate();
  
  // Fetch ONLY this specific historical record
  const { record, loading, error } = useHistoricalRecord(parseInt(stationId), periodId);

  // Loading state
  if (loading || !record) return (
    <Box sx={{ p: 3 }}>
      <Skeleton variant="text" width={300} height={40} />
      <Skeleton variant="text" width={180} />
      <Skeleton variant="rectangular" height={300} sx={{ my: 2 }} />
    </Box>
  );

  // Error state
  if (error) return (
    <Container sx={{ p: 3 }}>
      <Typography color="error">Error: {error}</Typography>
    </Container>
  );

  // Not found state
  // if (!record) return (
  //   <Container sx={{ p: 3 }}>
  //     <Typography sx={{ p: 3 }}>Historical record not found.</Typography>
  //     <Button onClick={() => navigate(-1)} startIcon={<ArrowBackIcon />}>
  //       Back to History List
  //     </Button>
  //   </Container>
  // );

  const dataForViewer = {
    baseTax: record.summary?.baseTax || 0,
    contentLog: Array.isArray(record.contentLog) ? record.contentLog : [],
    totalTax: record.summary?.totalTax,
    foreignPercentage: record.summary?.foreignPercentage,
    surcharge: record.summary?.surcharge,
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
      
      {/* Display summary info */}
      {/* <Box sx={{ mb: 4, p: 2, backgroundColor: 'rgba(123, 104, 238, 0.1)', borderRadius: 1 }}>
        <Typography variant="body2">
          <strong>Status:</strong> {record.status}
        </Typography>
        <Typography variant="body2">
          <strong>Foreign Content:</strong> {record.summary?.foreignPercentage?.toFixed(2)}%
        </Typography>
        <Typography variant="body2">
          <strong>Base Tax:</strong> GHS {record.summary?.baseTax?.toLocaleString()}
        </Typography>
        <Typography variant="body2">
          <strong>Surcharge:</strong> GHS {record.summary?.surcharge?.toLocaleString()}
        </Typography>
        <Typography variant="body2">
          <strong>Total Tax:</strong> GHS {record.summary?.totalTax?.toLocaleString()}
        </Typography>
        {record.summary?.paidOn && (
          <Typography variant="body2">
            <strong>Paid On:</strong> {new Date(record.summary.paidOn).toLocaleDateString()}
          </Typography>
        )}
      </Box> */}

      <DashboardViewer stationData={dataForViewer} periodName={record.period.toUpperCase()} />
    </Box>
  );
};

export default HistoricalRecordDetails;