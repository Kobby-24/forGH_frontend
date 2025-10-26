// src/pages/admin/UserManagement.jsx

import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { mockUsers, mockStations } from '../../mock/data';
import AddUserDialog from '../../components/AddUserDialog';

const UserManagement = () => {
  const [users, setUsers] = useState(mockUsers);
  const [stations] = useState(mockStations);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('username');

  const handleAddNewUser = (newUser) => {
    // In a real app, this would be an API call. Here, we just update state.
    setUsers([...users, newUser]);
  };
  
  const getStationNameById = (id) => {
    const station = stations.find(s => s.id === id);
    return station ? station.name : 'N/A';
  };

  // sorting helpers
  function descendingComparator(a, b, orderBy) {
    const getValue = (obj) => {
      if (orderBy === 'username') return String(obj.username || '').toLowerCase();
      if (orderBy === 'role') return String(obj.role || '').toLowerCase();
      if (orderBy === 'station') return String(getStationNameById(obj.stationId) || '').toLowerCase();
      return '';
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
    const stabilized = array.map((el, idx) => [el, idx]);
    stabilized.sort((a, b) => {
      const cmp = comparator(a[0], b[0]);
      if (cmp !== 0) return cmp;
      return a[1] - b[1];
    });
    return stabilized.map((el) => el[0]);
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredUsers = users.filter(u => {
    const q = (searchQuery || '').trim().toLowerCase();
    if (!q) return true;
    const username = String(u.username || '').toLowerCase();
    const role = String(u.role || '').toLowerCase();
    const stationName = String(getStationNameById(u.stationId)).toLowerCase();
    return username.includes(q) || role.includes(q) || stationName.includes(q);
  });

  const sortedUsers = stableSort(filteredUsers.slice(), getComparator(order, orderBy));

  return (
    <Box sx={{ p: 3, flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          User Management
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            size="small"
            placeholder="Search users"
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
                    <IconButton size="small" onClick={() => setSearchQuery('')}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : null
              ),
            }}
          />
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => setOpenDialog(true)}
          >
            Add New User
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sortDirection={orderBy === 'username' ? order : false}>
                <TableSortLabel active={orderBy === 'username'} direction={orderBy === 'username' ? order : 'asc'} onClick={(e) => handleRequestSort(e, 'username')}>
                  Username
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'role' ? order : false}>
                <TableSortLabel active={orderBy === 'role'} direction={orderBy === 'role' ? order : 'asc'} onClick={(e) => handleRequestSort(e, 'role')}>
                  Role
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'station' ? order : false}>
                <TableSortLabel active={orderBy === 'station'} direction={orderBy === 'station' ? order : 'asc'} onClick={(e) => handleRequestSort(e, 'station')}>
                  Assigned Station
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedUsers.length > 0 ? (
              sortedUsers.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell sx={{ textTransform: 'capitalize' }}>{user.role}</TableCell>
                  <TableCell>{user.role === 'station' ? getStationNameById(user.stationId) : 'Admin'}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} sx={{ textAlign: 'center', py: 4 }}>
                  {users.length === 0 ? (
                    <Typography color="text.secondary">No users available.</Typography>
                  ) : (
                    <Typography color="text.secondary">No results found for "{searchQuery}".</Typography>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <AddUserDialog 
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        handleAddUser={handleAddNewUser}
        stations={stations}
      />
    </Box>
  );
};

export default UserManagement;