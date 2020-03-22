import React from 'react';
import ButtonAppBar from '../Components/NavBar/index';

const PrivateLayout = ({ children, ...rest }) => (
  <>
    <div><ButtonAppBar /></div>
    <br />
    <div>{children}</div>
  </>
);

export default PrivateLayout;
