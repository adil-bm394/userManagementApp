import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext/useAuth';
import {
  Button,
  Typography,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
} from '@mui/material';
import { useUserContext } from '../../contexts/UserContext/useUserContext';
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
    <Container maxWidth="md" sx={{marginTop:'6px'}}>
      <Paper elevation={3} sx={{ padding: '8px', borderRadius: '8px' }}>
        <Typography variant="h4" gutterBottom align="center">
          Users List
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userState.users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Avatar>{user.username.charAt(0).toUpperCase()}</Avatar>
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditButton(user.id)}
                      sx={{ marginLeft: '16px' }}
                      disabled={loadingUserId === user.id}
                    >
                      {loadingUserId === user.id ? <CircularProgress size={24} /> : 'Edit'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default UsersListPage;
