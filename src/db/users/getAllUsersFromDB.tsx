import localForage from '../config/dbConfig';
import { User } from '../../utils/interfaces/types';

export const getAllUsersFromDB = async () => {
  try {
    const keys = await localForage.keys();
    const users: User[] = [];
    for (const key of keys) {
      const user = await localForage.getItem<User>(key);
      if (user) {
        users.push(user);
      }
    }
    return users;
  } catch (error) {
    console.error('Error fetching all users from DB:', error);
    throw error;
  }
};
