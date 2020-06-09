import React from 'react';
import Amplify, { Auth } from 'aws-amplify';
import { AuthProvider } from './context/AuthContext';
import AppNavigation from './components/AppNavigation';
import './tailwind.generated.css';

Amplify.configure({
  Auth: {
    region: 'us-west-2',
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
    mandatorySignIn: false,
  },
  API: {
    endpoints: [
      {
        name: 'MyAPI',
        endpoint: 'https://' + process.env.REACT_APP_API_HOSTNAME,
        custom_header: async (): Promise<{ Authorization: string }> => {
          return { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` };
        },
      }
    ],
  },
});

const App = (): JSX.Element => {
  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
};

export default App;