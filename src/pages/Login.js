import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/login', form);
      if (res.data && res.data.name) {
        localStorage.setItem('coreResetUser', JSON.stringify({ name: res.data.name }));
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed');
    }
  };

  return (
    <Box className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-200">
      <Paper elevation={6} className="p-8 w-full max-w-md">
        <Typography variant="h4" className="mb-4 text-center font-bold text-purple-700">Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Email" name="email" type="email" value={form.email} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Password" name="password" type="password" value={form.password} onChange={handleChange} fullWidth margin="normal" required />
          {error && <Typography color="error" className="mt-2">{error}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth className="mt-4">Login</Button>
          <Button onClick={() => navigate('/register')} color="secondary" fullWidth className="mt-2">Don't have an account? Register</Button>
        </form>
      </Paper>
    </Box>
  );
}
