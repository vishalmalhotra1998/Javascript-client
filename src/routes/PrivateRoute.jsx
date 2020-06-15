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


PrivateRoute.propTypes = {

  component: propTypes.elementType.isRequired,

};

export default PrivateRoute;
