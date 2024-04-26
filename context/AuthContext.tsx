import { createContext } from 'react';

const AuthContext = createContext({ isAuthenticated :false });

interface AuthProvider {
    children: React.ReactNode; // Or a more specific type
}

export const AuthProvider: React.FC<AuthProvider & { isAuthenticated: boolean } > = ({ children, isAuthenticated }) => {
  return <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>;
};