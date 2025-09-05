import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

export default function Dashboard() {
  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(120deg, #e0e7ef 0%, #f8fafc 100%)', p: { xs: 2, md: 4 }, minHeight: 'calc(100vh - 64px)', overflow: 'auto' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={6} sx={{ p: 4, borderRadius: 4, minHeight: 200, background: 'rgba(255,255,255,0.85)', boxShadow: '0 8px 32px 0 #2563eb11', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#2563eb', mb: 2 }}>Welcome to Your Dashboard</Typography>
            <Typography sx={{ color: '#64748b', fontSize: 18 }}>This is a protected page with a modern, glassy look.</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={6} sx={{ p: 4, borderRadius: 4, minHeight: 200, background: 'rgba(236,245,255,0.85)', boxShadow: '0 8px 32px 0 #2563eb11', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#6366f1', mb: 1 }}>Quick Actions</Typography>
            <Typography sx={{ color: '#64748b', fontSize: 16 }}>Add widgets, stats, or shortcuts here for a real dashboard feel.</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
