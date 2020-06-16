import React from 'react';

const withLoaderAndMessage = (WrappedComponenet) => function NewComponenet(props) {
  const { loader, dataLength, ...rest } = props;
  return (
    <WrappedComponenet
      loader={loader}
      dataLength={dataLength}
      {...rest}
    />
  );
};


export default withLoaderAndMessage;
