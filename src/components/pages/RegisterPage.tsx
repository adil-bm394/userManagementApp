import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { useRegister } from '../../Hooks/useRegister';
import { delayPromise } from '../../utils/delay/delayPromise';
import { FormInputs } from '../../utils/interfaces/types';


const schema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
  role: yup.string().oneOf(['admin', 'user']).required('Role is required'),
  name: yup.string().required('Name is required'),
  address: yup.string().required('Address is required'),
  phoneNumber: yup.string().required('Phone Number is required'),
}).required();

const RegisterPage: React.FC = () => {
  const { register: registerUser, loading, error } = useRegister();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true);
    await registerUser(data);
    await delayPromise();
    setIsLoading(false);
    if (!error) {
      navigate('/login');
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} style={{ padding: '6px', marginTop: '10px' }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h4" gutterBottom align="center" sx={{ marginTop: '8px' }}>
            Register
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  margin="dense"
                  type="text"
                  label="Username"
                  variant="outlined"
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  margin="dense"
                  type="password"
                  label="Password"
                  variant="outlined"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  margin="dense"
                  type="text"
                  label="Name"
                  variant="outlined"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
            <Controller
              name="address"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  margin="dense"
                  type="text"
                  label="Address"
                  variant="outlined"
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
              )}
            />
            <Controller
              name="phoneNumber"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  margin="dense"
                  type="text"
                  label="Phone Number"
                  variant="outlined"
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                />
              )}
            />
            <Controller
              name="role"
              control={control}
              defaultValue="user"
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  margin="dense"
                  select
                  label="Role"
                  variant="outlined"
                  error={!!errors.role}
                  helperText={errors.role?.message}
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </TextField>
              )}
            />
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
