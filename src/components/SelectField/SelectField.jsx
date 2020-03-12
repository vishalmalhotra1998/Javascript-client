import React from 'react';
import propTypes from 'prop-types';
import { Select, Error } from './Style';

const SelectField = (props) => {
  const {
    Options, onChange, defaultText, error, onBlur,
  } = props;
  return (
    <>
      <Select error={error} onChange={onChange} onBlur={onBlur}>
        <option>{defaultText}</option>
        {Options.map(({ value, label }) => (<option value={value}>{label}</option>))}
      </Select>
      {error ? (
        <Error>
          { error}
          {' '}
        </Error>
      ) : <br />}
    </>
  );
};

SelectField.propTypes = {
  error: propTypes.string.isRequired,
  Options: propTypes.arrayOf(propTypes.object).isRequired,
  onChange: propTypes.func.isRequired,
  value: propTypes.string.isRequired,
  defaultText: propTypes.string.isRequired,
  onBlur: propTypes.func.isRequired,
};
SelectField.defaultTypes = {
  error: '',
  defaultText: 'Select',
  Options: [],
};


export default SelectField;
