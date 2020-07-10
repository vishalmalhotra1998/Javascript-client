import React from 'react';
import { Mutation } from 'react-apollo';
import propTypes from 'prop-types';
import { LOGIN_USER } from './mutation';
import SignIn from './login';
import { SnackBarConsumer } from '../../contexts';


const Wrapper = (props) => (
  <SnackBarConsumer>
    { ({ openSnackBar }) => (
      <Mutation
        mutation={LOGIN_USER}
        onError={(error) => {
          openSnackBar(error.message, 'error');
        }}
      >
        {(loginUser, { loading, data }) => {
          const { history } = props;
          if (data) {
            localStorage.setItem('token', data.loginUser);
            history.push('/trainee');
          }
          return (
            <>
              <SignIn loginUser={loginUser} {...props} loading={loading} />
            </>
          );
        }}
      </Mutation>
    )}
  </SnackBarConsumer>
);

export default Wrapper;

Wrapper.propTypes = {
  history: propTypes.objectOf(propTypes.any).isRequired,
};
