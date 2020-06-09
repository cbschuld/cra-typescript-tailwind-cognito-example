import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const SignOut = (): JSX.Element => {
  const [signedOut, setSignedOut] = useState(false);
  const { signOut } = useAuthContext();

  useEffect(() => {
    (async (): Promise<void> => {
      await signOut();
      setSignedOut(true);
    })();
  }, [signOut]);

  return signedOut ? <Redirect to="/signIn" /> : <div />;
};

export default SignOut;
