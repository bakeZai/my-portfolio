import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) => createTheme({
  palette: {
    mode: mode || 'light',
    ...(mode === 'dark' && {
      background: {
        default: '#121212',
        paper: '#1e1e1e',
      },
      primary: {
        main: '#bb86fc',
      },
      secondary: {
        main: '#03dac6',
      },
      text: {
        primary: '#ffffff',
      },
    }),
    ...(mode === 'light' && {
      background: {
        default: '#ffffff',
        paper: '#f5f5f5',
      },
      primary: {
        main: '#6200ea',
      },
      secondary: {
        main: '#018786',
      },
      text: {
        primary: '#212121',
      },
    }),
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: {
      fontWeight: 700,
    },
    body1: {
      fontSize: '1.1rem',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          transition: 'background-color 0.3s ease',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1976d2',
          ...(mode === 'dark' && {
            backgroundColor: '#a10d0dff',
          }),
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0, // Убрали овальные углы
          padding: '6px 16px', // Компактные кнопки
          textTransform: 'none',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)', // Лёгкий ховер
            ...(mode === 'dark' && {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }),
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'scale(1.02)',
          },
        },
      },
    },
  },
});