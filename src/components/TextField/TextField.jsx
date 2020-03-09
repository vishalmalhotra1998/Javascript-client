import React from 'react';
import propTypes from 'prop-types';
import { Input, Error } from './style';

const TextField = (props) => {
  const { error, onChange, value } = props;
  return (
    <>
      <Input type="text" error={error} onChange={onChange} value={value} />
      {error ? <Error>{error}</Error> : <br />}
    </>
  );
};
TextField.propTypes = {
  error: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
};
TextField.defaultTypes = {
  error: '',

};
export default TextField;
