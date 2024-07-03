import React, { useState } from 'react';
import { useForm } from '../../Hooks/useForm';
import { useLogin } from '../../Hooks/useLogin';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import  CircularProgress  from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { delayPromise } from '../../utils/delay/delayPromise';

const LoginPage: React.FC = () => {
  const { values, handleChange } = useForm({ username: '', password: '', role: 'user' });
  const { login, loading, error } = useLogin();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const user = await login(values.username, values.password, values.role as 'admin' | 'user');
    if (user) {
      await delayPromise();
      if (user.role === 'admin') {
        navigate('/user-list'); 
      } else {
        navigate(`/user/${user.id}`);
      }
    }
    setIsLoading(false);
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} style={{ padding: '16px', marginTop: '32px' }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h4" gutterBottom align="center" sx={{ marginTop: '8px' }}>
            Login
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
              {isLoading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
          </form>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            Not registered? <Link to="/register">Click here</Link>
          </Typography>
          {error && <Typography color="error" sx={{ marginTop: 1 }}>{error}</Typography>}
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
