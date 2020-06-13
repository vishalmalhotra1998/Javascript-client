import React from 'react';
import propTypes from 'prop-types';
import { Footer } from '../Components';

const AuthLayout = ({ children }) => (
  <>
    <div>{children}</div>
    <div>
      {' '}
      <Footer />
    </div>
  </>

);

export default AuthLayout;

AuthLayout.propTypes = {

  children: propTypes.element.isRequired,

};
