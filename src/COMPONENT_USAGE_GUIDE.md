# Component Usage Guide

## Modern UI Components Overview

This guide explains how to use the new design system components across your application.

---

## 1. LayoutWrapper Component

**Purpose**: Provides consistent page structure with header, padding, and maximum width.

**Location**: `src/components/LayoutWrapper.jsx`

### Usage Example:

```jsx
import LayoutWrapper from "../../components/LayoutWrapper";

function MyPage() {
  return (
    <LayoutWrapper
      title="Page Title"
      subtitle="Optional subtitle or description"
      maxWidth="lg"
    >
      {/* Your page content goes here */}
      <div>Page content</div>
    </LayoutWrapper>
  );
}
```

### Props:

| Prop        | Type                                 | Default   | Description                      |
| ----------- | ------------------------------------ | --------- | -------------------------------- |
| `title`     | string                               | undefined | Main page title (displays as h1) |
| `subtitle`  | string                               | undefined | Subtitle or description text     |
| `children`  | ReactNode                            | required  | Page content                     |
| `maxWidth`  | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'lg'      | Container max-width              |
| `className` | string                               | ''        | Additional CSS classes           |
| `sx`        | object                               | {}        | Material-UI sx prop for styling  |

### Features:

- Consistent padding (responsive)
- Automatic page header with title/subtitle
- Maintains navbar spacing
- Full height responsive container

---

## 2. ModernCard Component

**Purpose**: Flexible card container with semi-transparent background and hover effects.

**Location**: `src/components/ModernCard.jsx`

### Usage Example:

```jsx
import ModernCard from "../../components/ModernCard";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";

function MyCardPage() {
  return (
    <ModernCard
      title="Card Title"
      subtitle="Optional subtitle"
      actions={
        <>
          <Button startIcon={<EditIcon />}>Edit</Button>
          <Button startIcon={<DeleteIcon />}>Delete</Button>
        </>
      }
    >
      <p>Card content goes here</p>
    </ModernCard>
  );
}
```

### Props:

| Prop        | Type      | Default   | Description                                      |
| ----------- | --------- | --------- | ------------------------------------------------ |
| `title`     | string    | undefined | Card header title                                |
| `subtitle`  | string    | undefined | Card header subtitle                             |
| `children`  | ReactNode | required  | Card content                                     |
| `actions`   | ReactNode | undefined | Action buttons (footer)                          |
| `header`    | ReactNode | undefined | Custom header content (overrides title/subtitle) |
| `className` | string    | ''        | CSS classes                                      |
| `sx`        | object    | {}        | Card styling                                     |
| `headerSx`  | object    | {}        | Header styling                                   |
| `contentSx` | object    | {}        | Content area styling                             |
| `actionsSx` | object    | {}        | Actions area styling                             |
| `elevation` | number    | 1         | Material-UI elevation                            |

### Features:

- Semi-transparent glassmorphic background
- Smooth hover animations
- Responsive padding
- Optional header and footer sections

---

## 3. MetricsCard Component

**Purpose**: Display 3 key metrics in a horizontal card with icons.

**Location**: `src/components/MetricsCard.jsx`

### Usage Example:

```jsx
import MetricsCard from "../../components/MetricsCard";
import StorageIcon from "@mui/icons-material/Storage";
import PeopleIcon from "@mui/icons-material/People";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";

function Dashboard() {
  const metrics = [
    {
      icon: <StorageIcon />,
      value: "156",
      label: "Total Stations",
    },
    {
      icon: <PeopleIcon />,
      value: "23",
      label: "Active Users",
    },
    {
      icon: <SignalCellularAltIcon />,
      value: "98.5%",
      label: "System Uptime",
    },
  ];

  return <MetricsCard metrics={metrics} />;
}
```

### Props:

| Prop              | Type      | Default   | Description                      |
| ----------------- | --------- | --------- | -------------------------------- |
| `metrics`         | Array     | []        | Array of metric objects          |
| `metrics[].icon`  | ReactNode | undefined | Icon element for metric          |
| `metrics[].value` | string    | required  | Large metric value (e.g., "156") |
| `metrics[].label` | string    | required  | Descriptive label                |

### Features:

- 3-column layout with dividers
- Icon containers with accent color
- Responsive spacing
- Large prominent numbers

---

## 4. Navbar Component (Updated)

**Purpose**: Top navigation bar with semi-transparent glassmorphic effect.

**Location**: `src/components/Navbar.jsx`

### Features:

- Dark semi-transparent background
- Station search (admin only)
- User welcome message
- Logout functionality
- Responsive design
- Hides on scroll

### Used Automatically:

- Integrated into `App.js` routing
- Visible on all pages except login

---

## 5. StationCard Component (Updated)

**Purpose**: Display individual station information with metrics.

**Location**: `src/components/StationCard.jsx`

### Usage Example:

```jsx
import StationCard from "../../components/StationCard";

function StationList({ stations }) {
  return (
    <Grid container spacing={2}>
      {stations.map((station) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={station.id}>
          <StationCard station={station} />
        </Grid>
      ))}
    </Grid>
  );
}
```

### Features:

- Modern glassmorphic design
- Foreign content percentage indicator
- Color-coded alerts (red for >30%, green otherwise)
- View details button
- Icon-based station indicator
- Responsive grid-friendly sizing

---

## Implementation Examples

### Example 1: Complete Dashboard Page

```jsx
import React, { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import LayoutWrapper from "../../components/LayoutWrapper";
import ModernCard from "../../components/ModernCard";
import MetricsCard from "../../components/MetricsCard";
import StorageIcon from "@mui/icons-material/Storage";
import PeopleIcon from "@mui/icons-material/People";

function Dashboard() {
  const [stats, setStats] = useState({ total: 0, active: 0 });

  useEffect(() => {
    // Fetch stats
  }, []);

  const metrics = [
    {
      icon: <StorageIcon />,
      value: stats.total.toString(),
      label: "Total Items",
    },
    { icon: <PeopleIcon />, value: stats.active.toString(), label: "Active" },
  ];

  return (
    <LayoutWrapper title="Dashboard" subtitle="Monitor your system">
      {/* Metrics Section */}
      <MetricsCard metrics={metrics} />

      {/* Content Cards Grid */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ModernCard title="Recent Activity">
            <p>Activity list here</p>
          </ModernCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <ModernCard title="System Health">
            <p>Health indicators here</p>
          </ModernCard>
        </Grid>
      </Grid>
    </LayoutWrapper>
  );
}

export default Dashboard;
```

### Example 2: Form Page

```jsx
import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import LayoutWrapper from "../../components/LayoutWrapper";
import ModernCard from "../../components/ModernCard";

function EditProfile() {
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit logic
  };

  return (
    <LayoutWrapper title="Edit Profile" subtitle="Update your information">
      <ModernCard
        title="Profile Information"
        actions={<Button variant="contained">Save Changes</Button>}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      </ModernCard>
    </LayoutWrapper>
  );
}

export default EditProfile;
```

### Example 3: Data Table Page

```jsx
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import LayoutWrapper from "../../components/LayoutWrapper";
import ModernCard from "../../components/ModernCard";

function DataList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch items
  }, []);

  return (
    <LayoutWrapper title="Data List" subtitle="View all records">
      <ModernCard title="All Records">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ModernCard>
    </LayoutWrapper>
  );
}

export default DataList;
```

---

## Styling Guidelines

### Using Theme Colors

Access theme colors throughout your components:

```jsx
import { useTheme } from "@mui/material/styles";

function MyComponent() {
  const theme = useTheme();

  return <Box sx={{ color: theme.palette.text.primary }}>Text content</Box>;
}
```

### Common Color Tokens:

```javascript
// Text colors
theme.palette.text.primary; // '#e8ecf1' - Main text
theme.palette.text.secondary; // '#a9b3c1' - Muted text
theme.palette.text.disabled; // '#667080' - Disabled text

// Container colors
theme.palette.primary.main; // '#1a1a2e' - Dark blue
theme.palette.secondary.main; // '#7b68ee' - Purple accent

// Transparent surfaces (use directly, not from theme)
("rgba(26, 26, 46, 0.6)"); // Main surface
("rgba(45, 53, 97, 0.5)"); // Lighter surface
("rgba(123, 104, 238, 0.1)"); // Accent surface
```

### Common Styling Patterns:

```jsx
// Semi-transparent card
sx={{
  backgroundColor: 'rgba(26, 26, 46, 0.6)',
  WebkitBackdropFilter: 'blur(8px)',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(168, 178, 196, 0.12)',
}}

// Glassmorphic button
sx={{
  backgroundColor: '#7b68ee',
  '&:hover': {
    backgroundColor: '#9d84eb',
    boxShadow: '0 4px 12px rgba(123, 104, 238, 0.3)',
  },
}}

// Responsive spacing
sx={{
  p: { xs: 2, md: 3, lg: 4 },
  gap: { xs: 1, md: 2, lg: 3 },
}}
```

---

## Best Practices

1. **Always use LayoutWrapper** for page structure
2. **Use ModernCard** for content containers
3. **Apply consistent spacing** using theme.spacing()
4. **Include icons** in cards and metrics for visual interest
5. **Use MetricsCard** for KPI/dashboard displays
6. **Maintain typography hierarchy** (use variant prop)
7. **Test responsive** layouts on mobile, tablet, desktop
8. **Keep animations smooth** - use theme transition times
9. **Ensure text contrast** - follow WCAG AA standards
10. **Use color consistently** - refer to color palette document

---

## Troubleshooting

### Issue: Theme colors not applying

**Solution**: Ensure `ThemeProvider` wraps your app in `App.js`

### Issue: Backdrop filter not showing blur effect

**Solution**: Check browser support; include WebKit prefix: `WebkitBackdropFilter`

### Issue: Cards look flat without background

**Solution**: Ensure background image path is correct in `public/` folder; verify App.css gradients

### Issue: Text not readable on background

**Solution**: Increase background opacity (0.6 to 0.7) or adjust text color brightness

### Issue: Components not responsive

**Solution**: Use MUI's Grid system and responsive sx props (`xs`, `sm`, `md`, `lg`, `xl`)

---

## Theme Configuration

For advanced theme customization, edit `src/theme/muiTheme.js`:

```javascript
// Example: Change accent color
secondary: {
  main: '#your-new-color',
  light: '#lighter-shade',
  dark: '#darker-shade',
}
```

After changes, all components will automatically update.

---

## Need Help?

- Refer to `DESIGN_SYSTEM.md` for design specifications
- Check Material-UI documentation: https://mui.com/
- Review component files for additional customization options
