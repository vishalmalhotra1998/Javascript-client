import React from 'react';

const withLoaderAndMessage = (WrappedComponenet) => function NewComponenet(props) {
  const { loader, data, ...rest } = props;
  return (<WrappedComponenet loader={loader} dataLength={data.length} data={data} {...rest} />);
};


export default withLoaderAndMessage;
