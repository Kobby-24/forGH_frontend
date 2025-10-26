// src/components/EnhancedContentTable.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, Chip, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const headCells = [
  { id: 'timestamp', label: 'Timestamp' },
  { id: 'title', label: 'Title' },
  { id: 'artist', label: 'Artist' },
  { id: 'origin', label: 'Origin' },
];

function descendingComparator(a, b, orderBy) {
  if (orderBy === 'timestamp') {
    return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
  }
  const va = String(a[orderBy] || '').toLowerCase();
  const vb = String(b[orderBy] || '').toLowerCase();
  if (vb < va) return -1;
  if (vb > va) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => -descendingComparator(a, b, orderBy)
    : (a, b) => descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilized = array.map((el, idx) => [el, idx]);
  stabilized.sort((a, b) => {
    const cmp = comparator(a[0], b[0]);
    if (cmp !== 0) return cmp;
    return a[1] - b[1];
  });
  return stabilized.map((el) => el[0]);
}

const formatTimestamp = (isoString) => new Date(isoString).toLocaleString('en-GB');

const EnhancedContentTable = ({ contentLog }) => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('timestamp');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [searchQuery, setSearchQuery] = React.useState('');

  const filtered = React.useMemo(() => {
    const q = (searchQuery || '').trim().toLowerCase();
    if (!q) return (contentLog || []).slice();
    return (contentLog || []).filter((log) => {
      const ts = formatTimestamp(log.timestamp).toLowerCase();
      const title = String(log.title || '').toLowerCase();
      const artist = String(log.artist || '').toLowerCase();
      const origin = String(log.origin || '').toLowerCase();
      return ts.includes(q) || title.includes(q) || artist.includes(q) || origin.includes(q);
    });
  }, [contentLog, searchQuery]);

  const sorted = React.useMemo(() => stableSort(filtered.slice(), getComparator(order, orderBy)), [filtered, order, orderBy]);

  // reset page when filter changes (so page isn't out of range)
  React.useEffect(() => {
    setPage(0);
  }, [searchQuery, contentLog]);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <TextField
            size="small"
            placeholder="Search timestamp, title, artist, origin"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                searchQuery ? (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchQuery('')} aria-label="clear search">
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : null
              ),
            }}
            sx={{ width: 320 }}
          />
        </Box>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                {headCells.map((cell) => (
                  <TableCell key={cell.id} sortDirection={orderBy === cell.id ? order : false}>
                    <TableSortLabel active={orderBy === cell.id} direction={orderBy === cell.id ? order : 'asc'} onClick={(e) => handleRequestSort(e, cell.id)}>
                      {cell.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sorted.length > 0 ? (
                sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((log, index) => (
                  <TableRow key={index}>
                    <TableCell>{formatTimestamp(log.timestamp)}</TableCell>
                    <TableCell>{log.title}</TableCell>
                    <TableCell>{log.artist}</TableCell>
                    <TableCell><Chip label={log.origin} color={log.origin === 'Foreign' ? 'error' : 'success'} size="small" /></TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    {(contentLog || []).length === 0 ? (
                      'No records available for this period.'
                    ) : (
                      searchQuery ? `No results found for "${searchQuery}".` : 'No records to display.'
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filtered.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

EnhancedContentTable.propTypes = {
  contentLog: PropTypes.array,
};

export default EnhancedContentTable;
