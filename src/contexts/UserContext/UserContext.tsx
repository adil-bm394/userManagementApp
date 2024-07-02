import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User } from '../../utils/interfaces/types';
import { addUserToDB } from '../../db/users/addUserToDB';
import { getUserFromDB } from '../../db/users/getUserFromDB';
import { getAllUsersFromDB } from '../../db/users/getAllUsersFromDB';
import { updateUserInDB } from '../../db/users/updateUserInDB';



type UserState = {
  users: User[];
};

type UserAction =
  | { type: 'SET_USERS'; payload: User[] }
  | { type: 'ADD_USER'; payload: User }
  | { type: 'UPDATE_USER'; payload: User };

type UserContextProps = {
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
  fetchUsers: () => Promise<void>;
  addUser: (user: User) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  getUser: (id: string) => Promise<User | null>;
};

const initialState: UserState = {
  users: [],
};

const UserContext = createContext<UserContextProps | undefined>(undefined);

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'ADD_USER':
      return { ...state, users: [...state.users, action.payload] };
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map(user => (user.id === action.payload.id ? action.payload : user)),
      };
    default:
      return state;
  }
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const fetchUsers = async () => {
    const users = await getAllUsersFromDB();
    dispatch({ type: 'SET_USERS', payload: users });
  };

  const addUser = async (user: User) => {
    await addUserToDB(user);
    dispatch({ type: 'ADD_USER', payload: user });
  };

  const updateUser = async (user: User) => {
    await updateUserInDB(user);
    dispatch({ type: 'UPDATE_USER', payload: user });
  };

  const getUser = async (id: string): Promise<User | null> => {
    return await getUserFromDB(id);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch, fetchUsers, addUser, updateUser, getUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
