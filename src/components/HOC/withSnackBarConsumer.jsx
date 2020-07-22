import React from 'react';
import { SnackBarConsumer } from '../../contexts';

const withSnackBarConsumer = (WrappedComponent) => (props) => (
  <SnackBarConsumer>
    {({ openSnackBar }) => (
      <WrappedComponent openSnackBar={openSnackBar} {...props} />
    )}
  </SnackBarConsumer>
);

export default withSnackBarConsumer;
