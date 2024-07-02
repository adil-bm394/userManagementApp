import localForage from '../config/dbConfig';
import { User } from '../../utils/interfaces/types';

export const getUserFromDB = async (id: string) => {
  try {
    const user = await localForage.getItem<User>(id);
    return user;
  } catch (error) {
    console.error('Error fetching user from DB:', error);
    throw error;
  }
};
