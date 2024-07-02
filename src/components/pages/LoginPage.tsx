import React from 'react';
import { useForm } from '../../Hooks/useForm';
import { useLogin } from '../../Hooks/useLogin';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { MenuItem, Typography, Container, Paper, Box } from '@mui/material';

const LoginPage: React.FC = () => {
  const { values, handleChange } = useForm({ username: '', password: '', role: 'user' });
  const { login, loading, error } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await login(values.username, values.password, values.role as 'admin' | 'user');
    if (user) {
      navigate(user.role === 'admin' ? '/user-list' : `/profile/${user.id}`);
    }
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
              disabled={loading}
              style={{ marginTop: '16px' }}
            >
              Login
            </Button>
          </form>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            Not registered? <Link to="/register">Click here</Link>
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
