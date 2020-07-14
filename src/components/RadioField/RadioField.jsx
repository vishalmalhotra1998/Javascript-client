import React from 'react';
import propTypes from 'prop-types';
import { Error } from './Style';


const RadioField = (props) => {
  const {
    options, onChange, error, value, onBlur,
  } = props;

  const radioField = options.map(({ value: optionValue, label }) => (
    <div key={label}>
      <input type="radio" name={value} value={optionValue} onChange={onChange} onBlur={onBlur} />
      {label}
    </div>
  ));

  const errorField = error ? (
    <Error>
      {error}
    </Error>
  ) : '';

  return (
    <>
      {radioField}
      {errorField}
    </>
  );
};


RadioField.propTypes = {
  options: propTypes.arrayOf(propTypes.object),
  onChange: propTypes.func.isRequired,
  value: propTypes.string.isRequired,
  error: propTypes.string,
  onBlur: propTypes.func.isRequired,
};
RadioField.defaultProps = {
  error: '',
  options: [],
};
export default RadioField;
