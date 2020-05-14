import React from 'react';
import { Input, Error } from './style';

const TextField = (values = '') => {
  const { value, disabled, error } = values;
  return (
    <>
      <Input type="text" value={value} disabled={disabled} />
      {error ? <Error>{error}</Error> : ''}
    </>
  );
};

export default TextField;
