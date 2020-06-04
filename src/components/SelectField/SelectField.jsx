import React from 'react';
import propTypes from 'prop-types';
import { Select, Error } from './Style';

const SelectField = (props) => {
  const {
    options, onChange, value, error,
  } = props;

  const selectField = (
    <Select value={value} error={error} onChange={onChange}>
      <option>Select</option>
      {options.map(({ value: optionValue, label }) => (
        <option key={optionValue} value={optionValue}>
          {label}
        </option>
      ))}
    </Select>
  );

  const errorHandler = error ? (
    <Error>
      {error}
    </Error>
  ) : '';

  return (
    <>
      {selectField}
      {errorHandler}
    </>
  );
};

SelectField.propTypes = {
  options: propTypes.arrayOf(propTypes.object),
  onChange: propTypes.func.isRequired,
  error: propTypes.string,
  value: propTypes.string.isRequired,
};
SelectField.defaultProps = {
  error: '',
  options: [],
};


export default SelectField;
