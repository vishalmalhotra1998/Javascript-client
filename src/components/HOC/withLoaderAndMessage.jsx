import React from 'react';

const withLoaderAndMessage = (WrappedComponenet) => (props) => {
  const { loader, data, ...rest } = props;
  return (<WrappedComponenet loader={loader} dataLength={data.length} data={data} {...rest} />);
};


export default withLoaderAndMessage;
