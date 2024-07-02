
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { User } from '../../utils/interfaces/types';
import { TextField, Button, Container, Paper, Typography } from '@mui/material';
import { useUserContext } from '../../contexts/UserContext/UserContext';

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id?: string }>(); 
  const { getUser, updateUser } = useUserContext();
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
      if (id) {
        await updateUser(formData); 
        setUser(formData); 
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!user) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  return (
    <Container maxWidth="xs" sx={{ marginTop: '30px' }}>
      <Paper elevation={3} style={{ padding: '16px' }}>
        <Typography variant="h4" gutterBottom align="center">Profile</Typography>
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
          style={{ marginTop: '16px' }}
        >
          Save Changes
        </Button>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
