import React, { useState } from 'react';
import { useForm } from '../../Hooks/useForm';
import { useRegister } from '../../Hooks/useRegister';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { User } from '../../utils/interfaces/types';
import { delayPromise } from '../../utils/delay/delayPromise';

const RegisterPage: React.FC = () => {
  const { values, handleChange } = useForm({ username: '', password: '', role: 'user', name: '', address: '', phoneNumber: '' });
  const { register, loading, error } = useRegister();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const user = { ...values, role: values.role as 'admin' | 'user' };
    await register(user);
    await delayPromise(); 
    setIsLoading(false);
    if (!error) {
      navigate('/login');
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} style={{ padding: '16px', marginTop: '32px' }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h4" gutterBottom align="center" sx={{ marginTop: '8px' }}>
            Register
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="dense"
              type="text"
              name="username"
              value={values.username}
              onChange={handleChange}
              placeholder="Username"
              variant="outlined"
            />
            <TextField
              fullWidth
              margin="dense"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder="Password"
              variant="outlined"
            />
            <TextField
              fullWidth
              margin="dense"
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Name"
              variant="outlined"
            />
            <TextField
              fullWidth
              margin="dense"
              type="text"
              name="address"
              value={values.address}
              onChange={handleChange}
              placeholder="Address"
              variant="outlined"
            />
            <TextField
              fullWidth
              margin="dense"
              type="text"
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              variant="outlined"
            />
            <TextField
              fullWidth
              margin="dense"
              select
              name="role"
              value={values.role}
              onChange={handleChange}
              variant="outlined"
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </TextField>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
              style={{ marginTop: '16px' }}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Register'}
            </Button>
          </form>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            Already registered? <Link to="/login">Click here</Link>
          </Typography>
          {error && <Typography color="error" sx={{ marginTop: 1 }}>{error}</Typography>}
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
