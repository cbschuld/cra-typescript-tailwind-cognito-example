import React, { useContext } from 'react';
import { AuthContext } from '../types';
import useAuth from '../hooks/Auth';

const authContext = React.createContext<AuthContext>({
  authenticated: false,
  authenticating: false,
  user: null,
  authError: null,
  token: '',
  signIn: () => Promise.resolve(true),
  signOut: () => Promise.resolve(true),
});

const { Provider } = authContext;

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const { authenticating, authenticated, user, token, signIn, signOut, authError } = useAuth();

  return (
    <Provider
      value={{
        authenticated,
        authenticating,
        user,
        authError,
        token,
        signIn,
        signOut,
      }}
    >
      {children}
    </Provider>
  );
};

const useAuthContext = (): AuthContext => {
  return useContext(authContext);
};

export { AuthProvider, useAuthContext };
