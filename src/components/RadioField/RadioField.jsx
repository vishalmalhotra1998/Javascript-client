import React from 'react';
import propTypes from 'prop-types';
import { Error } from './Style';


const RadioField = (props) => {
  const {
    options, onChange, error, value,
  } = props;

  const radioField = options.map(({ value: optionValue, label }) => (
    <div key={label}>
      <input type="radio" name={value} value={optionValue} onChange={onChange} />
      {label}
    </div>
  ));

  const errorHandler = error ? (
    <Error>
      {error}
    </Error>
  ) : '';

  return (
    <>
      {radioField}
      {errorHandler}
    </>
  );
};


RadioField.propTypes = {
  options: propTypes.arrayOf(propTypes.object),
  onChange: propTypes.func.isRequired,
  value: propTypes.string.isRequired,
  error: propTypes.string,
};
RadioField.defaultProps = {
  error: '',
  options: [],
};
export default RadioField;
