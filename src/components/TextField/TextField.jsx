import React from 'react';
import propTypes from 'prop-types';
import { Input, Error } from './style';

const TextField = (props) => {
  const {
    error, onChange, value, onBlur,
  } = props;
  return (
    <>
      <Input type="text" error={error} onChange={onChange} value={value} onBlur={onBlur} />
      {error ? <Error>{error}</Error> : ''}
    </>
  );
};
TextField.propTypes = {
  error: propTypes.string,
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  onBlur: propTypes.func.isRequired,
};
TextField.defaultProps = {
  error: '',
};
export default TextField;
