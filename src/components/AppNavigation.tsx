import React from 'react';
import { BrowserRouter, Switch, Route, Redirect, RouteProps } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import SignIn from '../pages/SignIn';
import SignOut from '../pages/SignOut';
import { useAuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

interface AppRouteProps extends RouteProps {
  private?: boolean;
  authenticated?: boolean;
  loading?: boolean;
}

const AppLoading = () => <FontAwesomeIcon spin icon={faSpinner}/>

const AppRoute: React.FunctionComponent<AppRouteProps> = (props) => {
  if (props.private) {
    if (props.loading) {
      const updateProps = { ...props, component: AppLoading };
      return <Route {...updateProps} />;
    }
    if (props.authenticated) {
      return <Route {...props} />;
    }
    return <Redirect to="/signIn" />;
  }
  return <Route {...props} />;
};

const AppNavigation = (): JSX.Element => {
  const { authenticating, authenticated } = useAuthContext();

  return (
      <BrowserRouter>
        <Switch>
          <AppRoute exact loading={authenticating} path="/signIn" component={SignIn} />
          <AppRoute exact loading={authenticating} path="/signOut" component={SignOut} />
          <AppRoute
            exact
            private
            loading={authenticating}
            authenticated={authenticated}
            path="/"
            component={Dashboard}
          />
        </Switch>
      </BrowserRouter>
  );
};

export default AppNavigation;
