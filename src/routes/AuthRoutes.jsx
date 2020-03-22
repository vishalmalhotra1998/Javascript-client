import React from 'react';
import propTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { AuthLayout } from '../layouts/index';

const AuthLayoutRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(matchProps) => (
      <AuthLayout>
        <Component {...matchProps} />
      </AuthLayout>
    )}
  />
);
export default AuthLayoutRoute;

AuthLayoutRoute.propTypes = {

  component: propTypes.elementType.isRequired,

};
