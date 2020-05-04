import React from 'react';
import propTypes from 'prop-types';
import { Copyright } from '../Components';

const AuthLayout = ({ children, ...rest }) => (
  <>
    <div>{children}</div>
    <div>
      {' '}
      <Copyright />
    </div>
  </>

);

export default AuthLayout;

AuthLayout.propTypes = {

  children: propTypes.element.isRequired,

};
