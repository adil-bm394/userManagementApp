import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext/useAuth';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import  CircularProgress  from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box  from '@mui/material/Box';
import List from '@mui/material/List';
import { useUserContext } from '../../contexts/UserContext/useUserContext';
import {  ListItem, ListItemText } from '@mui/material';
import { delayPromise } from '../../utils/delay/delayPromise';


const UsersListPage: React.FC = () => {
  const { state: authState } = useAuth();
  const { state: userState, fetchUsers } = useUserContext();
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (authState.user?.role !== 'admin') {
    return <Typography color="error">You are not authorized to view this page</Typography>;
  }

  const handleEditButton = async (userId: string) => {
    setLoadingUserId(userId);
    await delayPromise();
    setLoadingUserId(null);
    navigate(`/profile/${userId}`);
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '30px' }}>
      <Paper elevation={3} style={{ padding: '16px' }}>
        <Typography variant="h4" gutterBottom align="center">
          Users List
        </Typography>
        <List>
          {userState.users.map((user) => (
            <ListItem key={user.id} sx={{ alignItems: 'center' }}>
              <ListItemText
                primary={`Username: ${user.username}`}
                secondary={`Name: ${user.name}, Address: ${user.address}, Phone: ${user.phoneNumber}`}
              />
              <Box display="flex" alignItems="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEditButton(user.id)}
                  style={{ marginLeft: '16px' }}
                  disabled={loadingUserId === user.id} // Disable button when loading
                >
                  {loadingUserId === user.id ? <CircularProgress size={24} /> : 'Edit'}
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default UsersListPage;
