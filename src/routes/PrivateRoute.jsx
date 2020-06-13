import React from 'react';
import propTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { PrivateLayout } from '../layouts';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(matchProps) => (
      <PrivateLayout>
        <Component {...matchProps} />
      </PrivateLayout>
    )}
  />
);
export default PrivateRoute;

PrivateRoute.propTypes = {

  component: propTypes.elementType.isRequired,

};
