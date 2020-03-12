import propTypes from 'prop-types';
import React from 'react';
import { ButtonField } from './style';

const Button = (props) => {
  const {
    disabled, onClick, value,
  } = props;
  return (
    <>
      <ButtonField type="Button" value={value} disabled={disabled} onClick={onClick} />
    </>
  );
};


Button.propTypes = {
  disabled: propTypes.bool.isRequired,
  onClick: propTypes.func.isRequired,
  value: propTypes.string.isRequired,
};

Button.defaultTypes = {
  disbaled: false,
  style: {},
  color: 'default',
};


export default Button;
