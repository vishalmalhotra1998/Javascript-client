import React from 'react';
import { NavBar } from '../Components';

const PrivateLayout = ({ children, ...rest }) => (
  <>
    <div>
      <NavBar />
    </div>
    <div>{children}</div>
  </>
);

export default PrivateLayout;
