
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';
import { useUserContext } from '../../contexts/UserContext/UserContext';
import { List, ListItem, ListItemText, Typography, Container, Paper, Button, Box } from '@mui/material';

const UsersListPage: React.FC = () => {
  const { state: authState } = useAuth();
  const { state: userState, fetchUsers } = useUserContext();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (authState.user?.role !== 'admin') {
    return <Typography color="error">You are not authorized to view this page</Typography>;
  }

  return (
    <Container maxWidth="sm" sx={{ marginTop: '30px' }}>
      <Paper elevation={3} style={{ padding: '16px' }}>
        <Typography variant="h4" gutterBottom align='center'>Users List</Typography>
        <List>
          {userState.users.map((user) => (
            <ListItem key={user.id}>
              <ListItemText
                primary={`Username: ${user.username}`}
                secondary={`Name: ${user.name}, Address: ${user.address}, Phone: ${user.phoneNumber}`}
              />
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={`/profile/${user.id}`}
                  style={{ marginLeft: '16px' }}
                >
                  Edit
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
