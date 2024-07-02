import localForage from '../config/dbConfig';
import { User } from '../../utils/interfaces/types';
import { getUserFromDB } from './getUserFromDB';

export const updateUserInDB = async (user: User) => {
  try {
    const existingUser = await getUserFromDB(user.id);
    if (!existingUser) {
      throw new Error('User not found');
    }
    await localForage.setItem(user.id, user);
    return user;
  } catch (error) {
    console.error('Error updating user in DB:', error);
    throw error;
  }
};
