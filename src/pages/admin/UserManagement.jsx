// src/pages/admin/UserManagement.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TextField, InputAdornment, IconButton, Alert, Snackbar, Skeleton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import useStations from '../../hooks/useStations';
import AddUserDialog from '../../components/AddUserDialog';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const { stations, loading: stationsLoading } = useStations();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState(null);

  const fetchController = useRef(null);

  const fetchUsers = async () => {
    // abort any in-flight request
    if (fetchController.current) fetchController.current.abort();
    const controller = new AbortController();
    fetchController.current = controller;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://forgh-457a24871359.herokuapp.com/users/?skip=0&limit=100', {
        method: 'GET',
        headers: { accept: 'application/json' },
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      if (err.name === 'AbortError') return; // ignore aborts
      setError(err.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
      fetchController.current = null;
    }
  };

  useEffect(() => {
    fetchUsers();
    return () => {
      if (fetchController.current) fetchController.current.abort();
    };
  }, []);

  const handleRetryFetch = () => fetchUsers();
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('username');



  const handleAddNewUser = async (newUser) => {
    // POST the new user to the backend and append the returned user to state
    setCreating(true);
    setCreateError(null);
    try {
      const payload = {
        username: newUser.username,
        password: newUser.password,
        role: newUser.role,
        // include email only if provided by the dialog
        ...(newUser.email ? { email: newUser.email } : {}),
        station: newUser.stationId ?? newUser.station?.id,
      };
      console.log('Creating user with payload:', payload);

      const res = await fetch('https://forgh-457a24871359.herokuapp.com/users/', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(text || `HTTP ${res.status}`);
      }

      const created = await res.json();
      // append created user returned from server
      setUsers((prev) => [...prev, created]);
    } catch (err) {
      console.error('Failed to create user', err);
      setCreateError(err.message || 'Failed to create user');
    } finally {
      setCreating(false);
    }
  };
  
  const [stationNameCache, setStationNameCache] = useState({});
  const stationFetchControllers = useRef({});

  useEffect(() => {
    const controllersSnapshot = stationFetchControllers.current;
    return () => {
      // abort any in-flight station fetches when unmounting
      Object.values(controllersSnapshot).forEach((c) => {
        try { c.abort(); } catch (e) {}
      });
    };
  }, []);

  const fetchStationById = async (id) => {
    if (!id) return;
    if (stationNameCache[id]) return;
    if (stationFetchControllers.current[id]) return; // already fetching
    const controller = new AbortController();
    stationFetchControllers.current[id] = controller;
    try {
      const res = await fetch(`https://forgh-457a24871359.herokuapp.com/stations/${id}/export`, {
        method: 'GET',
        headers: { accept: 'application/json' },
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setStationNameCache((prev) => ({ ...prev, [id]: data?.name ?? 'N/A' }));
    } catch (err) {
      setStationNameCache((prev) => ({ ...prev, [id]: 'N/A' }));
    } finally {
      delete stationFetchControllers.current[id];
    }
  };

  const getStationNameById = (id) => {
    if (!id) return 'N/A';
    // prefer in-memory stations list if available
    if (Array.isArray(stations)) {
      const station = stations.find((s) => s.id === id);
      if (station && station.name) return station.name;
    }
    if (stationNameCache[id]) return stationNameCache[id];
    // trigger async fetch and return placeholder
    fetchStationById(id);
    return 'Loading...';
  };

  // sorting helpers
  function descendingComparator(a, b, orderBy) {
    const getValue = (obj) => {
      if (orderBy === 'username') return String(obj.username || '').toLowerCase();
      if (orderBy === 'role') return String(obj.role || '').toLowerCase();
      if (orderBy === 'station') return String(getStationNameById(obj.station?.id ?? obj.stationId) || '').toLowerCase();
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
    const stationName = String(getStationNameById(u.station?.id ?? u.stationId)).toLowerCase();
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
          {stationsLoading ? (
            <Skeleton variant="rectangular" width={140} height={36} />
          ) : (
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => setOpenDialog(true)}
            >
              Add New User
            </Button>
          )}
        </Box>
      </Box>

      {error && (
        <Alert severity="error" action={
          <Button color="inherit" size="small" onClick={handleRetryFetch}>
            Retry
          </Button>
        } sx={{ mb: 2 }}>
          {`Failed to load users: ${error}`}
        </Alert>
      )}

      {creating && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Creating user…
        </Alert>
      )}

      <Snackbar open={!!createError} autoHideDuration={6000} onClose={() => setCreateError(null)}>
        <Alert onClose={() => setCreateError(null)} severity="error" sx={{ width: '100%' }}>
          {createError}
        </Alert>
      </Snackbar>

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
                  <TableCell>{user.role === 'station' ? getStationNameById(user.station?.id ?? user.stationId) : 'Admin'}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} sx={{ textAlign: 'center', py: 4 }}>
                  {loading ? (
                    <Typography color="text.secondary">Loading users…</Typography>
                  ) : error ? (
                    <Typography color="error">{`Error: ${error}`}</Typography>
                  ) : users.length === 0 ? (
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