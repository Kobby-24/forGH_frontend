// src/pages/admin/UserManagement.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TextField, InputAdornment, IconButton, Alert, Snackbar, Skeleton, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import useStations from '../../hooks/useStations';
import AddUserDialog from '../../components/AddUserDialog';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const { stations, loading: stationsLoading } = useStations();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('username');

  // Edit modal state
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [editLoading, setEditLoading] = useState(false);

  // Delete modal state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUserForDelete, setSelectedUserForDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Refs
  const fetchController = useRef(null);
  const [stationNameCache, setStationNameCache] = useState({});
  const stationFetchControllers = useRef({});

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

  const getLoggedInUser = () => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        return JSON.parse(user).username;
      } catch (e) {
        return null;
      }
    }
    return null;
  };



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
      setOpenDialog(false);
    } catch (err) {
      console.error('Failed to create user', err);
      setCreateError(err.message || 'Failed to create user');
    } finally {
      setCreating(false);
    }
  };

  const handleEditUserClick = (user) => {
    setSelectedUserForEdit(user);
    setEditFormData({
      email: user.email || '',
      username: user.username || '',
      role: user.role || '',
      station: user.station?.id || '',
      password: '',
    });
    setEditDialogOpen(true);
  };

  const handleEditSubmit = async () => {
    const loggedInUser = getLoggedInUser();
    if (!loggedInUser) {
      alert('Unable to determine logged-in user');
      return;
    }

    if (!selectedUserForEdit) return;

    setEditLoading(true);
    try {
      const payload = {};
      if (editFormData.email && editFormData.email !== selectedUserForEdit.email) {
        payload.email = editFormData.email;
      }
      if (editFormData.username && editFormData.username !== selectedUserForEdit.username) {
        payload.username = editFormData.username;
      }
      if (editFormData.role && editFormData.role !== selectedUserForEdit.role) {
        payload.role = editFormData.role;
      }
      if (editFormData.station && editFormData.station !== (selectedUserForEdit.station?.id || '')) {
        payload.station = editFormData.station;
      }
      if (editFormData.password) {
        payload.password = editFormData.password;
      }

      const res = await fetch(
        `https://forgh-457a24871359.herokuapp.com/users/${selectedUserForEdit.username}/${loggedInUser}`,
        {
          method: 'PUT',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(text || `HTTP ${res.status}`);
      }

      const updated = await res.json();
      setUsers((prev) =>
        prev.map((u) => (u.id === updated.id ? updated : u))
      );
      setEditDialogOpen(false);
      setSelectedUserForEdit(null);
      setEditFormData({});
    } catch (err) {
      console.error('Failed to update user', err);
      alert(`Failed to update user: ${err.message}`);
    } finally {
      setEditLoading(false);
    }
  };

  const handleDeleteUserClick = (user) => {
    setSelectedUserForDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    const loggedInUser = getLoggedInUser();
    if (!loggedInUser) {
      alert('Unable to determine logged-in user');
      return;
    }

    if (!selectedUserForDelete) return;

    setDeleteLoading(true);
    try {
      const res = await fetch(
        `https://forgh-457a24871359.herokuapp.com/users/${selectedUserForDelete.username}/${loggedInUser}`,
        {
          method: 'DELETE',
          headers: { 'accept': 'application/json' },
        }
      );

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(text || `HTTP ${res.status}`);
      }

      setUsers((prev) => prev.filter((u) => u.id !== selectedUserForDelete.id));
      setDeleteDialogOpen(false);
      setSelectedUserForDelete(null);
    } catch (err) {
      console.error('Failed to delete user', err);
      alert(`Failed to delete user: ${err.message}`);
    } finally {
      setDeleteLoading(false);
    }
  };

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
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedUsers.length > 0 ? (
              sortedUsers.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell sx={{ textTransform: 'capitalize' }}>{user.role}</TableCell>
                  <TableCell>{user.role === 'station' ? getStationNameById(user.station?.id ?? user.stationId) : 'Admin'}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton size="small" color="warning" onClick={() => handleEditUserClick(user)} title="Edit user">
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="error" onClick={() => handleDeleteUserClick(user)} title="Delete user">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} sx={{ textAlign: 'center', py: 4 }}>
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

      {/* Edit User Dialog */}
      <Dialog open={editDialogOpen} onClose={() => !editLoading && setEditDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Username"
              value={editFormData.username || ''}
              onChange={(e) => setEditFormData({ ...editFormData, username: e.target.value })}
              fullWidth
              disabled
            />
            <TextField
              label="Email"
              value={editFormData.email || ''}
              onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
              fullWidth
              type="email"
            />
            <TextField
              label="Password"
              value={editFormData.password || ''}
              onChange={(e) => setEditFormData({ ...editFormData, password: e.target.value })}
              fullWidth
              type="password"
              placeholder="Leave blank to keep current password"
            />
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                value={editFormData.role || ''}
                onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
                label="Role"
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="station">Station</MenuItem>
              </Select>
            </FormControl>
            {editFormData.role === 'station' && (
              <FormControl fullWidth>
                <InputLabel>Assigned Station</InputLabel>
                <Select
                  value={editFormData.station || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, station: e.target.value })}
                  label="Assigned Station"
                >
                  {stations.map((station) => (
                    <MenuItem key={station.id} value={station.id}>
                      {station.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} disabled={editLoading}>
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} variant="contained" disabled={editLoading}>
            {editLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete User Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => !deleteLoading && setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete user <strong>{selectedUserForDelete?.username}</strong>? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} disabled={deleteLoading}>
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained" disabled={deleteLoading}>
            {deleteLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;