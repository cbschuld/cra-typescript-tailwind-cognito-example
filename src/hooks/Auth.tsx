import { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { User, AuthContext } from '../types';

const useAuth = (): AuthContext => {
  const [authenticating, setAuthenticating] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>('');
  const [authenticated, setAuthenticated] = useState(!!user);
  const [authError, setAuthError] = useState(null);

  const endSession = (): void => {
    setAuthenticated(false);
    setToken('');
    setUser(null);
  };

  const signIn = async (userName: string, password: string): Promise<boolean> => {
    let ret = false;
    setAuthenticating(true);
    try {
      const res = await Auth.signIn(userName, password);
      const session = res.getSignInUserSession();

      setToken(session.getIdToken().getJwtToken());
      setAuthenticated(true);

      ret = true;
    } catch (e) {
      console.error(e);
      setAuthError(e);
      endSession();
    }
    setAuthenticating(false);
    return ret;
  };

  const signOut = async (): Promise<boolean> => {
    let ret = false;
    try {
      await Auth.signOut();
      endSession();
      ret = true;
    } catch (e) {
      setAuthError(e);
    }
    return ret;
  };

  useEffect(() => {
    (async (): Promise<void> => {
      setAuthenticating(true);
      try {
        const res = await Auth.currentSession();
        setToken(res.getIdToken().getJwtToken());
        setAuthenticated(true);

      } catch (e) {
        setAuthError(e);
        endSession();
      }
      setAuthenticating(false);
    })();
  }, []);

  return {
    authenticating,
    authenticated,
    user,
    token,
    signIn,
    signOut,
    authError,
  };
};

export default useAuth;
