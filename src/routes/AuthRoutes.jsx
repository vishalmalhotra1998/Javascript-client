import React from 'react';
import propTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { AuthLayout } from '../layouts';

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(matchProps) => (
      <AuthLayout>
        <Component {...matchProps} />
      </AuthLayout>
    )}
  />
);
export default AuthRoute;

AuthRoute.propTypes = {

  component: propTypes.elementType.isRequired,

};
