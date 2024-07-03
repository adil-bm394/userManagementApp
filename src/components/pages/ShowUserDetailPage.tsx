import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext/useUserContext';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import  CircularProgress  from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box  from '@mui/material/Box';
import { delayPromise } from '../../utils/delay/delayPromise';


const ShowUserDetailPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { state } = useUserContext();
  const user = state.users.find((u) => u.id === id);
  const navigate = useNavigate();

  if (!user) {
    return (
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: '16px', marginTop: '32px' }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="body1">User not found.</Typography>
          </Box>
        </Paper>
      </Container>
    );
  }

  const handleEditProfile = async () => {
    setIsLoading(true);
    await delayPromise();
    setIsLoading(false);
    navigate(`/user/profile/${id}`);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: '16px', marginTop: '32px' }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{ textAlign: 'center' }}
        >
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            User Details
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '8px' }}>
            <strong>Name:</strong> {user.name}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '8px' }}>
            <strong>Username:</strong> {user.username}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '8px' }}>
            <strong>Address:</strong> {user.address}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '8px' }}>
            <strong>Mobile No.:</strong> {user.phoneNumber}
          </Typography>
          <Box position="relative" width="100%">
            <Button
              onClick={handleEditProfile}
              variant="contained"
              color="primary"
              sx={{ marginTop: '16px', width: '100%' }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Edit Profile'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ShowUserDetailPage;
