import { createTheme } from '@mui/material/styles';

/**
 * Modern, sleek, minimalist theme with semi-transparent dark UI elements
 * Designed to complement a background image with subtle transparency
 */
const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1a1a2e', // Deep dark blue
      light: '#2d3561',
      dark: '#0f0f1e',
    },
    secondary: {
      main: '#7b68ee', // Soft purple accent
      light: '#9d84eb',
      dark: '#5a4fb8',
    },
    background: {
      default: 'transparent',
      paper: 'rgba(26, 26, 46, 0.6)', // Semi-transparent dark blue
    },
    surface: {
      main: 'rgba(26, 26, 46, 0.65)',
      light: 'rgba(45, 53, 97, 0.5)',
      dark: 'rgba(15, 15, 30, 0.8)',
    },
    text: {
      primary: '#e8ecf1', // Light text for readability
      secondary: '#a9b3c1',
      disabled: '#667080',
    },
    divider: 'rgba(168, 178, 196, 0.12)',
    action: {
      active: '#7b68ee',
      hover: 'rgba(123, 104, 238, 0.08)',
      selected: 'rgba(123, 104, 238, 0.16)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.5px',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      letterSpacing: '-0.25px',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      letterSpacing: '0px',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      letterSpacing: '0px',
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 500,
      letterSpacing: '0px',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      letterSpacing: '0.25px',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
      letterSpacing: '0.125px',
      color: '#a9b3c1',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      letterSpacing: '0.125px',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      letterSpacing: '0.125px',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      letterSpacing: '0.125px',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      letterSpacing: '0.25px',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      letterSpacing: '0.4px',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(26, 26, 46, 0.75)',
          WebkitBackdropFilter: 'blur(10px)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 2px 20px rgba(0, 0, 0, 0.3)',
          borderBottom: '1px solid rgba(168, 178, 196, 0.12)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(26, 26, 46, 0.6)',
          WebkitBackdropFilter: 'blur(8px)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(168, 178, 196, 0.12)',
        },
        elevation1: {
          boxShadow: '0 2px 16px rgba(0, 0, 0, 0.2)',
        },
        elevation2: {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(26, 26, 46, 0.6)',
          WebkitBackdropFilter: 'blur(8px)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(168, 178, 196, 0.12)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            backgroundColor: 'rgba(26, 26, 46, 0.7)',
            boxShadow: '0 8px 32px rgba(123, 104, 238, 0.15)',
            borderColor: 'rgba(123, 104, 238, 0.4)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          transition: 'all 0.2s ease-in-out',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(123, 104, 238, 0.3)',
          },
        },
        contained: {
          backgroundColor: '#7b68ee',
          color: '#e8ecf1',
          '&:hover': {
            backgroundColor: '#9d84eb',
          },
        },
        outlined: {
          borderColor: 'rgba(123, 104, 238, 0.5)',
          color: '#e8ecf1',
          '&:hover': {
            borderColor: '#7b68ee',
            backgroundColor: 'rgba(123, 104, 238, 0.1)',
          },
        },
        text: {
          color: '#e8ecf1',
          '&:hover': {
            backgroundColor: 'rgba(123, 104, 238, 0.1)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(45, 53, 97, 0.4)',
            border: '1px solid rgba(168, 178, 196, 0.2)',
            borderRadius: 8,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              borderColor: 'rgba(168, 178, 196, 0.4)',
            },
            '&.Mui-focused': {
              borderColor: '#7b68ee',
              backgroundColor: 'rgba(45, 53, 97, 0.6)',
            },
          },
          '& .MuiOutlinedInput-input': {
            color: '#e8ecf1',
            '&::placeholder': {
              color: '#a9b3c1',
              opacity: 0.7,
            },
          },
          '& .MuiInputBase-input': {
            color: '#e8ecf1',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: '#e8ecf1',
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(26, 26, 46, 0.9)',
          border: '1px solid rgba(168, 178, 196, 0.12)',
        },
        listbox: {
          '& .MuiAutocomplete-option': {
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'rgba(123, 104, 238, 0.15)',
            },
            '&[aria-selected="true"]': {
              backgroundColor: 'rgba(123, 104, 238, 0.25)',
            },
          },
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: 64,
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(168, 178, 196, 0.12)',
          color: '#e8ecf1',
        },
        head: {
          backgroundColor: 'rgba(45, 53, 97, 0.4)',
          fontWeight: 600,
          color: '#e8ecf1',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: 'rgba(123, 104, 238, 0.08)',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(168, 178, 196, 0.12)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(123, 104, 238, 0.2)',
          color: '#e8ecf1',
          border: '1px solid rgba(123, 104, 238, 0.4)',
        },
      },
    },
  },
});

export default muiTheme;
