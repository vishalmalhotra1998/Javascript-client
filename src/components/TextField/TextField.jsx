import React from 'react';
import propTypes from 'prop-types';
import { Input, Error } from './style';

const TextField = (props) => {
  const {
    error, onChange, value, onBlur, disabled,
  } = props;
  return (
    <>
      <Input type="text" error={error} onChange={onChange} value={value} onBlur={onBlur} disabled={disabled} />
      {error ? <Error>{error}</Error> : ''}
    </>
  );
};
TextField.propTypes = {
  error: propTypes.string,
  value: propTypes.string,
  onChange: propTypes.func,
  onBlur: propTypes.func,
  disabled: propTypes.bool,
};
TextField.defaultProps = {
  error: '',
  onBlur: undefined,
  onChange: undefined,
  value: '',
  disabled: false,
};
export default TextField;
