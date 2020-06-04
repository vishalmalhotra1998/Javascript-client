import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

const withLoaderAndMessage = (WrappedComponenet) => function NewComponenet(props) {
  const { loader, dataLength, ...rest } = props;
  if (loader) {
    return (
      <Box paddingLeft={72}>
        <CircularProgress />
      </Box>
    );
  }
  return (<WrappedComponenet loader={loader} dataLength={dataLength} {...rest} />);
};


export default withLoaderAndMessage;
