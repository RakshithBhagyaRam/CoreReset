
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Avatar, IconButton, Tooltip } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useNavigate } from 'react-router-dom';
import { useThemeMode } from '../ThemeProvider';
import logo from '../assets/mylogo.png';

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const { mode, toggleTheme } = useThemeMode();

  // Helper to convert a string to title case
  const toTitleCase = str =>
    str ? str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()) : '';

  // Only show the first word of the user's name
  const firstName = user && user.name ? user.name.split(' ')[0] : 'User';
  const userName = toTitleCase(firstName);
  const userInitial = userName[0] || '?';
   return ( <AppBar
      position="static"
      elevation={4}
      sx={{
        background: mode === 'light'
          ? 'rgba(255,255,255,0.7)'
          : 'rgba(30,41,59,0.85)',
        color: mode === 'light' ? '#1e293b' : '#fff',
        boxShadow: '0 4px 32px 0 #9696965d',
        backdropFilter: 'blur(12px)',
      }}
    >
      <Toolbar className="flex justify-between">
        <Box className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}
          sx={{  m:1,borderRadius: 1, background: mode === 'light' ? 'rgba(236, 245, 255, 0.7)' : 'rgba(51,65,85,0.7)', boxShadow: '0 2px 8px 0 #2563eb11' }}>
          <img src={logo} alt="CoreReset Logo" style={{height: 56, width: 56, objectFit: 'contain', filter: mode === 'dark' ? 'drop-shadow(0 0 2px #fff)' : 'none' }} />
          {/* <Typography variant="h6" className="font-bold" sx={{ letterSpacing: 1, color: 'inherit' }}>CoreReset</Typography> */}
        </Box>
        <Box className="flex items-center gap-4">
            <IconButton onClick={toggleTheme} sx={{ color: mode === 'light' ? '#2563eb' : '#fff' }}>
              {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          {user && (
            <>
              <Avatar sx={{ bgcolor: mode === 'light' ? '#2563eb' : '#6366f1', color: '#fff', fontWeight: 700 }}>{userInitial}</Avatar>
              <Typography sx={{ color: 'inherit', fontWeight: 500 }}>Welcome, {userName}</Typography>
            </>
          )}
          <Button onClick={onLogout} sx={{ color: mode === 'light' ? '#2563eb' : '#fff', fontWeight: 600, ml: 2, px: 2, borderRadius: 2, background: mode === 'light' ? 'rgba(37,99,235,0.08)' : 'rgba(255,255,255,0.08)', '&:hover': { background: mode === 'light' ? 'rgba(37,99,235,0.18)' : 'rgba(255,255,255,0.18)' } }}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
