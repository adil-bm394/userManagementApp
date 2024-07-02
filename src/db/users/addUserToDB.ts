import localForage from '../config/dbConfig';
import { User } from '../../utils/interfaces/types';

export const addUserToDB = async (user: User) => {
  try {
    await localForage.setItem(user.id, user);
    return user;
  } catch (error) {
    console.error('Error adding user to DB:', error);
    throw error;
  }
};
