import React from 'react';
import propTypes from 'prop-types';
import { Select, Error } from './Style';

const SelectField = (props) => {
  const {
    options, onChange, value, error, onBlur,
  } = props;

  const selectField = (
    <Select value={value} error={error} onChange={onChange} onBlur={onBlur}>
      <option>Select</option>
      {options.map(({ value: optionValue, label }) => (
        <option key={optionValue} value={optionValue}>
          {label}
        </option>
      ))}
    </Select>
  );

  const errorField = error ? (
    <Error>
      {error}
    </Error>
  ) : '';

  return (
    <>
      {selectField}
      {errorField}
    </>
  );
};

SelectField.propTypes = {
  options: propTypes.arrayOf(propTypes.object),
  onChange: propTypes.func.isRequired,
  error: propTypes.string,
  value: propTypes.string.isRequired,
  onBlur: propTypes.func.isRequired,
};
SelectField.defaultProps = {
  error: '',
  options: [],
};


export default SelectField;
