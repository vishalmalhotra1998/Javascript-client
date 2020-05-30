import React, { Fragment } from 'react';
import propTypes from 'prop-types';
import { Error } from './Style';


const RadioField = (props) => {
  const {
    Options, onChange, error, value,
  } = props;
  return (
    <>
      {

        Options.map(({ value: val, label }) => (
          <Fragment key={label}>
            <input type="radio" name={value} value={val} onChange={onChange} />
            {label}
            <br />
          </Fragment>
        ))

      }
      {error ? (
        <Error>
          {error}
          {' '}
        </Error>
      ) : <br />}
    </>
  );
};


RadioField.propTypes = {
  Options: propTypes.arrayOf(propTypes.object),
  onChange: propTypes.func.isRequired,
  value: propTypes.string.isRequired,
  error: propTypes.string,
};
RadioField.defaultProps = {
  error: '',
  Options: [],
};
export default RadioField;
