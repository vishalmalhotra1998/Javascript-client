import React, { Fragment } from 'react';
import propTypes from 'prop-types';


const RadioField = (props) => {
  const { Options, onChange } = props;
  return (
    <>
      {

        Options.map(({ value, label }) => (
          <Fragment key={label}>
            <input type="radio" name="Sports" value={value} onChange={onChange} />
            {label}
            <br />
          </Fragment>
        ))

      }
    </>
  );
};


RadioField.propTypes = {
  Options: propTypes.arrayOf(propTypes.string.isRequired, propTypes.string.isRequired).isRequired,
  onChange: propTypes.func.isRequired,
  value: propTypes.string.isRequired,
  error: propTypes.string.isRequired,
};
RadioField.defaultTypes = {
  error: '',
  Options: [],
};
export default RadioField;
