// src/pages/admin/HistoryPage.jsx

import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { mockStations } from '../../mock/data';

const HistoryPage = () => {
  const { stationId } = useParams();
  const navigate = useNavigate();
  const station = mockStations.find(s => s.id === parseInt(stationId));

  const [filterDate, setFilterDate] = useState(null);

  const filteredRecords = useMemo(() => {
    if (!station) return [];
    if (!filterDate) return station.historicalRecords; // Show all if no filter

    return station.historicalRecords.filter(record => {
      const recordDate = new Date(record.period);
      return recordDate.getFullYear() === filterDate.getFullYear() &&
             recordDate.getMonth() === filterDate.getMonth();
    });
  }, [station, filterDate]);

  if (!station) { return <Typography sx={{ p: 3 }}>Station not found.</Typography>; }

  return (
    <Box sx={{ p: 3, flexGrow: 1 }}>
      <Button onClick={() => navigate(-1)} startIcon={<ArrowBackIcon />}>Back to Dashboard</Button>
      <Typography variant="h4" component="h1" fontWeight="bold" sx={{ mt: 2 }}>
        {station.name} - Payment & Content History
      </Typography>

      {/* --- FILTER CONTROLS --- */}
      <Box sx={{ my: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Filter by Month"
            views={['year', 'month']}
            value={filterDate}
            onChange={(newValue) => setFilterDate(newValue)}
            renderInput={(params) => <TextField {...params} helperText="Select a month to filter" />}
          />
        </LocalizationProvider>
        <Button onClick={() => setFilterDate(null)} disabled={!filterDate}>Clear Filter</Button>
      </Box>

      {/* --- HISTORY TABLE --- */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}><TableRow><TableCell>Period</TableCell><TableCell>Status</TableCell><TableCell align="right">Total Tax Paid</TableCell><TableCell>Action</TableCell></TableRow></TableHead>
          <TableBody>
            {filteredRecords.length > 0 ? filteredRecords.map(rec => (
              <TableRow key={rec.periodId}>
                <TableCell><strong>{rec.period}</strong></TableCell>
                <TableCell><Chip label={rec.status} color="success" size="small" /></TableCell>
                <TableCell align="right">GHS {rec.summary.totalTax.toLocaleString()}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/admin/station/${stationId}/history/${rec.periodId}`}>View Details</Button>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow><TableCell colSpan={4} align="center">No records found for the selected period.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default HistoryPage;