import React from 'react';
import propTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { PrivateLayout } from '../layouts';

const PrivateRoute = ({ component: Component, ...rest }) => (
  localStorage.getItem('token') ? (
    <Route
      {...rest}
      render={(matchProps) => (
        <PrivateLayout>
          <Component {...matchProps} />
        </PrivateLayout>
      )}
    />
  ) : <Redirect to="/login" />
);

PrivateRoute.propTypes = {
  component: propTypes.elementType.isRequired,
};

export default PrivateRoute;
