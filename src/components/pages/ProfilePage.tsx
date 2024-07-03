import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { User } from '../../utils/interfaces/types';
import  Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import  CircularProgress  from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { useUserContext } from '../../contexts/UserContext/useUserContext';
import { useAuth } from '../../contexts/AuthContext/useAuth';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const { getUser, updateUser } = useUserContext();
  const { state: authState } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<User>({
    id: '',
    username: '',
    password: '',
    role: 'user',
    name: '',
    address: '',
    phoneNumber: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (id) {
          const userData = await getUser(id);
          if (userData) {
            setUser(userData);
            setFormData(userData); 
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id, getUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      if (id) {
        await updateUser(formData);
        setUser(formData);
        alert('Profile updated successfully!');
        if (authState.user?.role === 'admin') {
          navigate('/user-list');
        } 
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  return (
    <Container maxWidth="xs" sx={{ marginTop: '30px' }}>
      <Paper elevation={3} style={{ padding: '16px' }}>
        <Typography variant="h4" gutterBottom align="center">
          Profile
        </Typography>
        <TextField
          fullWidth
          margin="dense"
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="dense"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="dense"
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="dense"
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          variant="outlined"
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isLoading}
          style={{ marginTop: '16px' }}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Save Changes'}
        </Button>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
