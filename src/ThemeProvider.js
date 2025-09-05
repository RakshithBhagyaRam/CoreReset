import React, { createContext, useContext, useMemo, useState } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeContext = createContext();

export function useThemeMode() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }) {
  const [mode, setMode] = useState('light');
  const toggleTheme = () => setMode(m => (m === 'light' ? 'dark' : 'light'));

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode,
        ...(mode === 'light'
          ? {
              primary: { main: '#2563eb' },
              secondary: { main: '#6366f1' },
              background: { default: '#f8fafc', paper: '#fff' },
            }
          : {
              primary: { main: '#60a5fa' },
              secondary: { main: '#818cf8' },
              background: { default: '#181a20', paper: '#23263a' },
              text: { primary: '#f3f4f6', secondary: '#a5b4fc' },
            }),
      },
      shape: { borderRadius: 16 },
      components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              background: mode === 'light'
                ? 'rgba(255,255,255,0.85)'
                : 'rgba(35,35,43,0.85)',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 4px 32px 0 rgba(80,80,180,0.08)',
            },
          },
        },
      },
    }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
