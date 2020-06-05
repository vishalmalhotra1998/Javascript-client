import propTypes from 'prop-types';
import React from 'react';
import { ButtonField } from './style';

const Button = (props) => {
  const {
    disabled, onClick, value, color,
  } = props;
  return (
    <>
      <ButtonField color={color} type="button" value={value} disabled={disabled} onClick={onClick} />
    </>
  );
};


Button.propTypes = {
  onClick: propTypes.func.isRequired,
  value: propTypes.string.isRequired,
  color: propTypes.string,
  disabled: propTypes.bool,
};

Button.defaultProps = {
  disabled: false,
  color: 'default',
};


export default Button;
