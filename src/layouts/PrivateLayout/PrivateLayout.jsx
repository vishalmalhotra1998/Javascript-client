import React from 'react';
import propTypes from 'prop-types';
import { NavBar } from '../Components';

const PrivateLayout = ({ children }) => (
  <>
    <div>
      <NavBar />
    </div>
    <div>{children}</div>
  </>
);


PrivateLayout.propTypes = {
  children: propTypes.element.isRequired,
};

export default PrivateLayout;
