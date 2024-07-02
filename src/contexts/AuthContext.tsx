import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  user: { id: string; role: 'admin' | 'user' } | null;
}

interface AuthAction {
  type: 'LOGIN' | 'LOGOUT';
  payload?: { id: string; role: 'admin' | 'user' };
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
} | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { isAuthenticated: true, user: action.payload || null };
    case 'LOGOUT':
      return { isAuthenticated: false, user: null };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};


