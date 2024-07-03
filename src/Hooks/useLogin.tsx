import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext/useAuth';
import { getAllUsersFromDB } from '../db/users/getAllUsersFromDB';

export const useLogin = () => {
  const { dispatch } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string, role: 'admin' | 'user') => {
    setLoading(true);
    setError(null);

    try {
      const users = await getAllUsersFromDB();
      const user = users.find(u => u.username === username && u.password === password && u.role === role);
      if (user) {
        dispatch({ type: 'LOGIN', payload: { id: user.id, role: user.role } });
        return user;
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError('Failed to log in');
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
