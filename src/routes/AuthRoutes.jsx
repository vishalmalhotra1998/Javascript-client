import React from 'react';
import propTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import ls from 'local-storage';
import { AuthLayout } from '../layouts';

const AuthRoute = ({ component: Component, ...rest }) => (
  !ls.get('token') ? (
    <Route
      {...rest}
      render={(matchProps) => (
        <AuthLayout>
          <Component {...matchProps} />
        </AuthLayout>
      )}
    />
  ) : <Redirect to="/trainee" />
);

AuthRoute.propTypes = {
  component: propTypes.elementType.isRequired,
};

export default AuthRoute;
