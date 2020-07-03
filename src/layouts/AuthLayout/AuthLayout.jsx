import React from 'react';
import propTypes from 'prop-types';
import { Footer } from '../Components';

const AuthLayout = ({ children }) => (
  <>
    <div>{children}</div>
    <div>
      <Footer />
    </div>
  </>

);

AuthLayout.propTypes = {

  children: propTypes.element.isRequired,

};

export default AuthLayout;
