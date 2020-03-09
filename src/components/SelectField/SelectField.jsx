import React from 'react';
import propTypes from 'prop-types';
import { Select } from './Style';

const SelectField = (props) => {
  const {
    Options, onChange, defaultText,
  } = props;
  return (
    <>
      <Select onChange={onChange}>
        <option>{defaultText}</option>
        {Options.map(({ value, label }) => (<option value={value}>{label}</option>))}
      </Select>
    </>
  );
};

SelectField.propTypes = {
  error: propTypes.string.isRequired,
  Options: propTypes.arrayOf(propTypes.string.isRequired, propTypes.string.isRequired).isRequired,
  onChange: propTypes.func.isRequired,
  value: propTypes.string.isRequired,
  defaultText: propTypes.string.isRequired,
};
SelectField.defaultTypes = {
  error: '',
  defaultText: 'Select',
  Options: [],
};


export default SelectField;
