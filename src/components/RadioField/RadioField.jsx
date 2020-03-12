import React, { Fragment } from 'react';
import propTypes from 'prop-types';
import { Error } from './Style';


const RadioField = (props) => {
  const {
    Options, onChange, onBlur, error,
  } = props;
  return (
    <>
      {

        Options.map(({ value, label }) => (
          <Fragment key={label}>
            <input type="radio" name="Sports" value={value} onChange={onChange} onBlur={onBlur} />
            {label}
            <br />
          </Fragment>
        ))

      }
      {error ? (
        <Error>
          { error }
          {' '}
        </Error>
      ) : <br />}
    </>
  );
};


RadioField.propTypes = {
  Options: propTypes.arrayOf(propTypes.object).isRequired,
  onChange: propTypes.func.isRequired,
  value: propTypes.string.isRequired,
  error: propTypes.string.isRequired,
  onBlur: propTypes.func.isRequired,
};
RadioField.defaultTypes = {
  error: '',
  Options: [],
};
export default RadioField;
