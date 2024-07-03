import { useState } from 'react';
import { User } from '../utils/interfaces/types';
import { addUserToDB } from '../db/users/addUserToDB';
import { getAllUsersFromDB } from '../db/users/getAllUsersFromDB';

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (newUser: Omit<User, 'id'>) => {
    setLoading(true);
    setError(null);

    try {
      const users = await getAllUsersFromDB();
      if (users.length >= 6) {
        setError("5 Users already registered");
        console.log("5 Users already registered");
        return;
      }
      const id = (users.length + 1).toString();
      const user = { ...newUser, id };
      await addUserToDB(user);
    } catch (error) {
      setError('Failed to register user');
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};
