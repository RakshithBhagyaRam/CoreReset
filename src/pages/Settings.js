import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Paper, Box, Alert, Card, CardContent, Avatar, Grid, Divider } from '@mui/material';
import CakeIcon from '@mui/icons-material/Cake';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HeightIcon from '@mui/icons-material/Height';
import FlagIcon from '@mui/icons-material/Flag';
import EmailIcon from '@mui/icons-material/Email';
import api from '../api';

export default function Settings() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userError, setUserError] = useState('');
  const [resetError, setResetError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
  const [resetLoading, setResetLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setUserError('');
      try {
        const localUser = JSON.parse(localStorage.getItem('coreResetUser'));
        if (!localUser || !localUser.name) {
          setUserError('User not logged in.');
          setLoading(false);
          return;
        }
        const res = await api.get('/user');
        const found = res.data.find(u => u.name.toLowerCase() === localUser.name.toLowerCase());
        if (!found) {
          setUserError('User not found.');
        } else {
          setUser(found);
        }
      } catch (err) {
        setUserError('Failed to fetch user details.');
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = async e => {
    e.preventDefault();
    setResetError('');
    setSuccess('');
    if (form.newPassword !== form.confirmNewPassword) {
      setResetError('New passwords do not match.');
      return;
    }
    setResetLoading(true);
    try {
      await api.post('/reset-password', {
        email: user.email,
        currentPassword: form.currentPassword,
        newPassword: form.newPassword
      });
      setSuccess('Password reset successful!');
      setForm({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
      setTimeout(() => {
        setShowReset(false);
        setSuccess('');
      }, 1500);
    } catch (err) {
      setResetError(err.response?.data?.message || 'Password reset failed.');
    }
    setResetLoading(false);
  };

  const toTitleCase = str =>
    str ? str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()) : '';

  return (
    <Box className="p-8 max-w-2xl mx-auto">
      {loading ? (
        <Typography>Loading user details...</Typography>
      ) : (
        <>
          <Card
            elevation={8}
            sx={{
              mb: 4,
              borderRadius: 4,
              background: 'linear-gradient(120deg, #e0e7ef 0%, #f8fafc 100%)',
              boxShadow: '0 8px 32px 0 #2563eb22',
              p: 2,
              position: 'relative'
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar
                  sx={{
                    bgcolor: '#2563eb',
                    width: 72,
                    height: 72,
                    fontSize: 36,
                    mr: 3,
                    boxShadow: '0 4px 16px 0 #2563eb33'
                  }}
                >
                  {user && user.name ? toTitleCase(user.name)[0] : '?'}
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight={700} color="#2563eb">
                    {user && user.name}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                    <EmailIcon fontSize="small" color="action" />
                    <Typography color="text.secondary" fontSize={15}>
                      {user && user.email}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" gap={1.2}>
                    <CakeIcon color="primary" />
                    <Typography fontWeight={500}>Age:</Typography>
                    <Typography>{user && user.age}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" gap={1.2}>
                    <FitnessCenterIcon color="primary" />
                    <Typography fontWeight={500}>Weight:</Typography>
                    <Typography>{user && user.weight} kg</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" gap={1.2}>
                    <HeightIcon color="primary" />
                    <Typography fontWeight={500}>Height:</Typography>
                    <Typography>{user && user.height} cm</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" gap={1.2}>
                    <FlagIcon color="primary" />
                    <Typography fontWeight={500}>Goal:</Typography>
                    <Typography>{user && user.goal}</Typography>
                  </Box>
                </Grid>
              </Grid>
              <Box mt={3} textAlign="right">
                {!showReset && (
                  <Button variant="contained" color="primary" onClick={() => setShowReset(true)}>
                    Reset Password
                  </Button>
                )}
              </Box>
              {userError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {userError}
                </Alert>
              )}
            </CardContent>
          </Card>
          {showReset && (
            <Paper elevation={4} sx={{ p: 4, mb: 4 }}>
              <Typography variant="h6" fontWeight={600} mb={2}>Reset Password</Typography>
              {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
              {resetError && <Alert severity="error" sx={{ mb: 2 }}>{resetError}</Alert>}
              <form onSubmit={handleReset}>
                <TextField
                  label="Current Password"
                  name="currentPassword"
                  type="password"
                  value={form.currentPassword}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="New Password"
                  name="newPassword"
                  type="password"
                  value={form.newPassword}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Confirm New Password"
                  name="confirmNewPassword"
                  type="password"
                  value={form.confirmNewPassword}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <Box display="flex" gap={2} mt={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={resetLoading}
                  >
                    {resetLoading ? 'Resetting...' : 'Reset Password'}
                  </Button>
                  <Button
                    type="button"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    onClick={() => {
                      setShowReset(false);
                      setForm({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
                      setResetError('');
                      setSuccess('');
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </form>
            </Paper>
          )}
        </>
      )}
    </Box>
  );
}
