import React from 'react';
import propTypes from 'prop-types';
import { Select, Error } from './Style';

const SelectField = (props) => {
  const {
    Options, onChange, value, error,
  } = props;

  return (
    <>
      <Select value={value} error={error} onChange={onChange}>
        <option>Select</option>
        {Options.map(({ value: val, label }) => (<option key={val} value={val}>{label}</option>))}
      </Select>
      {error ? (
        <Error>
          { error}
          {' '}
        </Error>
      ) : ''}
    </>
  );
};

SelectField.propTypes = {
  Options: propTypes.arrayOf(propTypes.object),
  onChange: propTypes.func.isRequired,
  error: propTypes.string,
  value: propTypes.string,
};
SelectField.defaultProps = {
  error: '',
  value: 'Select',
  Options: [],
};


export default SelectField;
