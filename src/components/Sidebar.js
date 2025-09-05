
import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Box, IconButton, Tooltip, Divider,Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon sx={{ color: '#2563eb' }} />, path: '/dashboard' },
  { text: 'Diet Plan', icon: <RestaurantMenuIcon sx={{ color: '#64748b' }} />, path: '/diet' },
  { text: 'Workout', icon: <FitnessCenterIcon sx={{ color: '#2563eb' }} />, path: '/workout' },
  { text: 'Settings', icon: <SettingsIcon sx={{ color: '#6366f1' }} />, path: '/settings' },
];

const drawerWidth = 220;
const collapsedWidth = 64;

export default function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();
  return (
    <Box>
      <Drawer
        variant="permanent"
        anchor="left"
        open={open}
        slotProps={{
          paper: {
            sx: {
              width: open ? drawerWidth : collapsedWidth,
              transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(16px)',
              borderRight: '1.5px solid #e0e7ef',
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              boxShadow: '2px 0 32px 0 #64748b22',
              overflowX: 'hidden',
              marginTop: 0,
              height: '100vh',
              position: 'fixed',
              left: 0,
              top: 0,
              zIndex: 1200,
            },
          },
        }}
      >
        <Toolbar sx={{ justifyContent: open ? 'space-between' : 'center', px: 1, minHeight: 48 ,mt:1}}>
          {open && (
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#2563eb', letterSpacing: 1, ml: 1 }}>
              CoreReset
            </Typography>
          )}
          <IconButton onClick={() => setOpen(o => !o)} sx={{ color: '#2563eb', transition: 'color 0.3s' }}>
            {open ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
        <Divider sx={{ mb: 1, background: '#2563eb', opacity: 0.15 }} />
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <List sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 0 }}>
            {menuItems.map(item => (
              <Tooltip key={item.text} title={open ? '' : item.text} placement="right">
                <ListItem
                  component="button"
                  onClick={() => navigate(item.path)}
                  sx={{
                    borderRadius: 2,
                    width: open ? '90%' : 48,
                    mb: 1.5,
                    background: 'rgba(100,116,139,0.06)',
                    color: '#1e293b',
                    boxShadow: '0 2px 8px 0 #64748b11',
                    transition: 'background 0.3s, box-shadow 0.3s',
                    minHeight: 48,
                    height: 48,
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontWeight: 500,
                    letterSpacing: 0.5,
                    overflow: 'hidden',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #2563eb 0%, #6366f1 100%)',
                      color: '#fff',
                      boxShadow: '0 4px 16px 0 #2563eb33',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : 'auto',
                      justifyContent: 'center',
                      color: 'inherit',
                    }}
                  >
                    {React.cloneElement(item.icon, { color: 'inherit', sx: { color: 'inherit' } })}
                  </ListItemIcon>
                  <Box
                    sx={{
                      width: open ? '100%' : 0,
                      opacity: open ? 1 : 0,
                      transition: 'width 0.3s, opacity 0.2s',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: 16,
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        width: '100%',
                      }}
                    >
                      {item.text}
                    </Typography>
                  </Box>
                </ListItem>
              </Tooltip>
            ))}
          </List>
        </Box>
        </Drawer>
      </Box>
    );
}
