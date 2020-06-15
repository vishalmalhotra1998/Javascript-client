import React from 'react';
import { Mutation } from '@apollo/react-components';
import { LOGIN_USER } from './mutation';
import SignIn from './login';

const Wrapper = (props) => (
  <Mutation mutation={LOGIN_USER}>
    {(loginUser) => (
      <>
        <SignIn loginUser={loginUser} {...props} />
      </>
    )}
  </Mutation>
);

export default Wrapper;
