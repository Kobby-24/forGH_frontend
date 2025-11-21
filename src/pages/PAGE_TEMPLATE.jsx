/**
 * PAGE TEMPLATE - Use this as a starting point for new pages
 * 
 * This template demonstrates the proper structure for creating pages
 * that follow the modern minimalist design system.
 * 
 * Location: Any file in src/pages/
 */

import React, { useState, useEffect } from 'react';
import { Grid, Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Import design system components
import LayoutWrapper from '../../components/LayoutWrapper';
import ModernCard from '../../components/ModernCard';
import MetricsCard from '../../components/MetricsCard';

// Material-UI icons for metrics
import StorageIcon from '@mui/icons-material/Storage';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';

/**
 * TEMPLATE PAGE STRUCTURE
 * 
 * 1. All pages must be wrapped with LayoutWrapper
 * 2. Dashboard metrics should use MetricsCard
 * 3. Content containers should use ModernCard
 * 4. Use responsive Grid for layouts
 * 5. Follow color palette from design system
 */

function TemplatePage() {
  // ==================== STATE ====================
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ==================== EFFECTS ====================
  useEffect(() => {
    // Initialize or fetch data
    fetchData();
  }, []);

  // ==================== API CALLS ====================
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      // Replace with actual API call
      // const response = await fetch('your-api-endpoint');
      // const data = await response.json();
      // setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ==================== METRICS ====================
  // For dashboard/overview pages, prepare metrics data
  const metricsData = [
    { 
      icon: <StorageIcon />, 
      value: items.length.toString(), 
      label: 'Total Items' 
    },
    { 
      icon: <CheckCircleIcon />, 
      value: '42', 
      label: 'Completed' 
    },
    { 
      icon: <WarningIcon />, 
      value: '3', 
      label: 'Pending' 
    },
  ];

  // ==================== RENDER ====================
  return (
    <LayoutWrapper 
      title="Page Title"
      subtitle="A brief description of what this page does"
      maxWidth="xl"
    >
      {/* =============== METRICS SECTION =============== */}
      {/* Only include if page is a dashboard/overview */}
      <MetricsCard metrics={metricsData} />

      {/* =============== ACTION BAR =============== */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <h2 style={{ color: '#e8ecf1', fontWeight: 600, margin: 0 }}>Section Title</h2>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: '#7b68ee',
            '&:hover': {
              backgroundColor: '#9d84eb',
            },
          }}
        >
          Add New Item
        </Button>
      </Box>

      {/* =============== CONTENT GRID =============== */}
      <Grid container spacing={3}>
        {/* ---- Left Column (Main Content) ---- */}
        <Grid item xs={12} lg={8}>
          <ModernCard 
            title="Main Content Section"
            subtitle="Description or metadata"
            sx={{ mb: 3 }}
          >
            {/* Your main content goes here */}
            <Box sx={{ color: '#a9b3c1', lineHeight: 1.6 }}>
              <p>Content placeholder - Replace with actual content</p>
              <p>
                The ModernCard component provides a beautiful semi-transparent 
                container for your content with glassmorphism effects.
              </p>
            </Box>
          </ModernCard>

          {/* Example: Data Table Card */}
          <ModernCard 
            title="Data Table"
            subtitle="View all records"
          >
            {/* Add your table here */}
            <Box sx={{ color: '#a9b3c1' }}>
              Table content placeholder
            </Box>
          </ModernCard>
        </Grid>

        {/* ---- Right Column (Sidebar) ---- */}
        <Grid item xs={12} lg={4}>
          {/* Example: Info Card */}
          <ModernCard 
            title="Information"
            subtitle="Quick reference"
            sx={{ mb: 3 }}
          >
            <Box sx={{ color: '#a9b3c1' }}>
              <p>Quick information or stats</p>
            </Box>
          </ModernCard>

          {/* Example: Action Card */}
          <ModernCard 
            title="Quick Actions"
            actions={
              <>
                <Button variant="outlined" startIcon={<EditIcon />} fullWidth sx={{ mb: 1 }}>
                  Edit
                </Button>
                <Button variant="outlined" startIcon={<DeleteIcon />} color="error" fullWidth>
                  Delete
                </Button>
              </>
            }
          >
            <Box sx={{ color: '#a9b3c1', mb: 2 }}>
              <p>Action buttons below</p>
            </Box>
          </ModernCard>
        </Grid>
      </Grid>

      {/* =============== FULL-WIDTH SECTION =============== */}
      <Box sx={{ mt: 4 }}>
        <ModernCard 
          title="Additional Section"
          subtitle="Full width content area"
        >
          <Box sx={{ color: '#a9b3c1' }}>
            <p>Full-width content placeholder</p>
          </Box>
        </ModernCard>
      </Box>
    </LayoutWrapper>
  );
}

export default TemplatePage;

/**
 * ============================================
 * IMPLEMENTATION CHECKLIST
 * ============================================
 * 
 * Use this checklist when implementing a new page:
 * 
 * □ Wrap page with LayoutWrapper
 * □ Set appropriate title and subtitle
 * □ Include MetricsCard if dashboard/overview
 * □ Use ModernCard for content containers
 * □ Apply Grid for responsive layout
 * □ Use theme colors from design system
 * □ Add hover/focus states to interactive elements
 * □ Include appropriate icons
 * □ Test responsive layout (mobile/tablet/desktop)
 * □ Verify text contrast for accessibility
 * □ Add loading and error states
 * □ Document complex logic with comments
 * 
 * ============================================
 * COLOR REFERENCE
 * ============================================
 * 
 * Text:
 *   - Primary: #e8ecf1 (main text)
 *   - Secondary: #a9b3c1 (muted labels)
 *   - Disabled: #667080 (inactive)
 * 
 * Interactive:
 *   - Button: #7b68ee (purple)
 *   - Hover: #9d84eb (lighter purple)
 *   - Border: rgba(123, 104, 238, 0.5)
 * 
 * Containers:
 *   - Surface: rgba(26, 26, 46, 0.6)
 *   - Hover: rgba(26, 26, 46, 0.7)
 *   - Border: rgba(168, 178, 196, 0.12)
 * 
 * ============================================
 * RESPONSIVE SIZING
 * ============================================
 * 
 * Use these props for responsive sizing:
 * 
 * Grid breakpoints:
 *   - xs={12} (mobile: 100% width)
 *   - sm={6}  (tablet: 50% width)
 *   - md={4}  (small desktop: 33% width)
 *   - lg={3}  (large desktop: 25% width)
 * 
 * Padding:
 *   - p={{ xs: 2, md: 3, lg: 4 }}
 * 
 * Font sizes:
 *   - Use variant prop: variant="h5", variant="body2"
 * 
 * ============================================
 * COMMON PATTERNS
 * ============================================
 * 
 * Header with Action Button:
 *   <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
 *     <h2>Title</h2>
 *     <Button>Action</Button>
 *   </Box>
 * 
 * Two Column Layout:
 *   <Grid container spacing={3}>
 *     <Grid item xs={12} lg={8}>Main content</Grid>
 *     <Grid item xs={12} lg={4}>Sidebar</Grid>
 *   </Grid>
 * 
 * Card with Actions:
 *   <ModernCard
 *     title="Title"
 *     actions={<Button>Action</Button>}
 *   >
 *     Content here
 *   </ModernCard>
 * 
 * Form Container:
 *   <ModernCard title="Form Title">
 *     <TextField ... />
 *     <Button variant="contained">Submit</Button>
 *   </ModernCard>
 * 
 * ============================================
 */
