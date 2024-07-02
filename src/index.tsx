// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext/UserContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
