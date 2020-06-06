import React from 'react';
import propTypes from 'prop-types';

const Math = (props) => {
  const {
    first, second, operator, children,
  } = props;
  let result;
  switch (operator) {
  case '+': {
    result = first + second;
    break;
  }
  case '-': {
    result = first - second;
    break;
  }
  case '*': {
    result = first * second;
    break;
  }
  case '/': {
    result = first / second;
    break;
  }
  default: {
    result = 'invalid operation';
    break;
  }
  }
  if (children) {
    return (children(first, second, operator, result));
  }

  return (
    <>
      <p>
        {first}
        {' '}
        {operator}
        {' '}
        {second}
=
        {' '}
        {result}
      </p>
    </>
  );
};

Math.propTypes = {

  first: propTypes.number.isRequired,
  second: propTypes.number.isRequired,
  operator: propTypes.string.isRequired,
  children: propTypes.func.isRequired,
};

export default Math;
