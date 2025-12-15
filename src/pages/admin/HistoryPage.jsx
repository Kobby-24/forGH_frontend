// src/pages/admin/HistoryPage.jsx

import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, TextField, TableSortLabel, Skeleton, Container } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useStationById } from '../../hooks/useStations';

const HistoryPage = () => {
  const { stationId } = useParams();
  const navigate = useNavigate();
  
  // Fetch ONLY this specific station
  const { station, loading, error } = useStationById(parseInt(stationId));

  const [filterDate, setFilterDate] = useState(null);

  const filteredRecords = useMemo(() => {
    if (loading || error || !station) return [];
    if (!station.historicalRecords) return [];
    if (!filterDate) return station.historicalRecords; // Show all if no filter

    return station.historicalRecords.filter(record => {
      const recordDate = new Date(record.period);
      return recordDate.getFullYear() === filterDate.getFullYear() &&
             recordDate.getMonth() === filterDate.getMonth();
    });
  }, [station, filterDate, loading, error]);

  // --- Sorting helpers for the table ---
  function descendingComparator(a, b, orderBy) {
    const getValue = (obj) => {
      if (orderBy === 'period') return new Date(obj.period).getTime();
      if (orderBy === 'totalTax') return obj.summary?.totalTax ?? 0;
      return String(obj[orderBy] || '').toLowerCase();
    };

    const va = getValue(a);
    const vb = getValue(b);
    if (vb < va) return -1;
    if (vb > va) return 1;
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const orderRes = comparator(a[0], b[0]);
      if (orderRes !== 0) return orderRes;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('period');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedRecords = stableSort(filteredRecords.slice(), getComparator(order, orderBy));

  // Loading state
  if (loading || !station) return (
    <Box sx={{ p: 3 }}>
      <Skeleton variant="text" width={360} height={40} />
      <Skeleton variant="rectangular" height={48} sx={{ my: 2 }} />
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} variant="rectangular" height={52} sx={{ mb: 1 }} />
      ))}
    </Box>
  );

  // Error state
  if (error) return (
    <Container sx={{ p: 3 }}>
      <Typography color="error">Error: {error}</Typography>
    </Container>
  );

  // Not found state
  // if (!station) return (
  //   <Container sx={{ p: 3 }}>
  //     <Typography sx={{ p: 3 }}>Station not found.</Typography>
  //     <Button onClick={() => navigate(-1)} startIcon={<ArrowBackIcon />}>
  //       Back to Dashboard
  //     </Button>
  //   </Container>
  // );

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
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sortDirection={orderBy === 'period' ? order : false}>
                <TableSortLabel active={orderBy === 'period'} direction={orderBy === 'period' ? order : 'asc'} onClick={(e) => handleRequestSort(e, 'period')}>
                  Period
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'status' ? order : false}>
                <TableSortLabel active={orderBy === 'status'} direction={orderBy === 'status' ? order : 'asc'} onClick={(e) => handleRequestSort(e, 'status')}>
                  Status
                </TableSortLabel>
              </TableCell>
              <TableCell align="right" sortDirection={orderBy === 'totalTax' ? order : false}>
                <TableSortLabel active={orderBy === 'totalTax'} direction={orderBy === 'totalTax' ? order : 'asc'} onClick={(e) => handleRequestSort(e, 'totalTax')}>
                  Total Tax Paid
                </TableSortLabel>
              </TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRecords.length > 0 ? sortedRecords.map(rec => (
              <TableRow key={rec.periodId}>
                <TableCell><strong>{rec.period}</strong></TableCell>
                <TableCell><Chip label={rec.status} color="success" size="small" /></TableCell>
                <TableCell align="right">GHS {(rec.summary?.totalTax ?? 0).toLocaleString()}</TableCell>
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