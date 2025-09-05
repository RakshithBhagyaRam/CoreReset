import React, { useState } from 'react';
import {
    TextField,
    Button,
    MenuItem,
    InputAdornment,
    Typography,
    Box,
    Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const goalsByBMI = (bmi) => {
    if (bmi < 18.5) return ['Gain Weight'];
    if (bmi < 25) return ['Maintain Weight'];
    return ['Lose Weight'];
};

export default function Register() {
    const [form, setForm] = useState({
        name: '',
        age: '',
        weight: '',
        height: '',
        heightUnit: 'cm',
        email: '',
        password: '',
        confirmPassword: '',
        goal: '',
    });
    const [bmi, setBMI] = useState(null);
    const [goals, setGoals] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (name === 'weight' || name === 'height' || name === 'heightUnit') {
            const weight = name === 'weight' ? value : form.weight;
            let height = name === 'height' ? value : form.height;
            let unit = name === 'heightUnit' ? value : form.heightUnit;
            if (weight && height) {
                let h = parseFloat(height);
                if (unit === 'feet') h = h * 30.48;
                const bmiVal = parseFloat(weight) / (h / 100) ** 2;
                setBMI(bmiVal.toFixed(2));
                setGoals(goalsByBMI(bmiVal));
                setForm((prev) => ({ ...prev, goal: goalsByBMI(bmiVal)[0] }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await api.post('/register', form);
            navigate('/login');
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    err.message ||
                    'Registration failed'
            );
        }
    };

    return (
        <Box className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
            <Paper elevation={6} className="p-8 w-full max-w-md">
                <Typography
                    variant="h4"
                    className="mb-4 text-center font-bold text-blue-700"
                >
                    Register
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Age"
                        name="age"
                        type="number"
                        value={form.age}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Weight (kg)"
                        name="weight"
                        type="number"
                        value={form.weight}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Box className="flex gap-2">
                        <TextField
                            label="Height"
                            name="height"
                            type="number"
                            value={form.height}
                            onChange={handleChange}
                            margin="normal"
                            required
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {form.heightUnit}
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            select
                            name="heightUnit"
                            value={form.heightUnit}
                            onChange={handleChange}
                            margin="normal"
                            required
                        >
                            <MenuItem value="cm">cm</MenuItem>
                            <MenuItem value="feet">feet</MenuItem>
                        </TextField>
                    </Box>
                    {bmi && (
                        <Typography className="mt-2 mb-2 text-blue-600">
                            BMI: {bmi}
                        </Typography>
                    )}
                    <TextField
                        select
                        label="Goal"
                        name="goal"
                        value={form.goal}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    >
                        {goals.map((g) => (
                            <MenuItem key={g} value={g}>
                                {g}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    {error && (
                        <Typography color="error" className="mt-2">
                            {error}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className="mt-4"
                    >
                        Register
                    </Button>
                    <Button
                        onClick={() => navigate('/login')}
                        color="secondary"
                        fullWidth
                        className="mt-2"
                    >
                        Already have an account? Login
                    </Button>
                </form>
            </Paper>
        </Box>
    );
}
