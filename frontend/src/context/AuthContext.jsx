import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Automatically mock a successful login with a fake token for the interceptor
    setCurrentUser({ 
      uid: 'mock-user-123', 
      email: 'demo@example.com',
      getIdToken: async () => 'mock-token-123'
    });
  }, []);

  const loginAnonymously = async () => {
    setCurrentUser({ uid: 'mock-user-123', email: 'demo@example.com', getIdToken: async () => 'mock-token-123' });
    return true;
  };

  const loginWithGoogle = async () => {
    setCurrentUser({ uid: 'mock-google-123', email: 'demo@google.com', getIdToken: async () => 'mock-token-123' });
    return true;
  };

  const logout = async () => {
    setCurrentUser(null);
    setUserRole(null);
    localStorage.removeItem('blo_verified');
  };

  const value = {
    currentUser,
    userRole,
    setUserRole,
    loginAnonymously,
    loginWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
