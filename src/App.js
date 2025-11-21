// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import muiTheme from './theme/muiTheme';
import LoginPage from './pages/Login'; // <-- Import Login page
import Dashboard from './pages/admin/Dashboard';
import StationDashboard from './pages/station/StationDashboard';
import StationDetails from './pages/admin/StationDetails';
import HistoryPage from './pages/admin/HistoryPage';
import HistoricalRecordDetails from './pages/admin/HistoricalRecordDetails';
import StationHistoryPage from './pages/admin/HistoryPage';
import StationHistoricalRecordDetails from './pages/admin/HistoricalRecordDetails';
import UserManagement from './pages/admin/UserManagement'; // <-- IMPORT THE NEW PAGE
import Navbar from './components/Navbar'; // <-- IMPORT THE NAVBAR
import './App.css';

// Create a small helper component to access the location hook
const AppLayout = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== '/login' && location.pathname !== '/';

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        
  {/* Admin Routes */}
  <Route path="/admin/dashboard" element={<Dashboard />} />
  <Route path="/admin/users" element={<UserManagement />} /> {/* <-- ADD THIS ROUTE */}
  <Route path="/admin/station/:id" element={<StationDetails />} />
  <Route path="/admin/station/:stationId/history" element={<HistoryPage />} />
  <Route path="/admin/station/:stationId/history/:periodId" element={<HistoricalRecordDetails />} />
        
        {/* Station Route */}
        <Route path="/station/dashboard" element={<StationDashboard />} />
  <Route path="/station/history" element={<StationHistoryPage />} />
  <Route path="/station/history/:periodId" element={<StationHistoricalRecordDetails />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <AppLayout />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;