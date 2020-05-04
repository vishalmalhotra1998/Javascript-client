import React from 'react';
import propTypes from 'prop-types';
import { ButtonAppBar } from '../Components';

const PrivateLayout = ({ children, ...rest }) => (
  <>
    <div><ButtonAppBar /></div>
    <br />
    <div>{children}</div>
  </>
);

export default PrivateLayout;

PrivateLayout.propTypes = {

  children: propTypes.element.isRequired,

};
