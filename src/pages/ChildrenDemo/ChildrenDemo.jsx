import React, { Component } from 'react';
import { Math } from '../../components';

class ChildrenDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  children = (first, second, operator, result) => {
    switch (operator) {
    case '+': {
      return (<p>{`Sum of ${first} and ${second} is ${result} `}</p>);
    }
    case '-': {
      return (<p>{`Sum of ${first} and ${second} is ${result} `}</p>);
    }
    case '*': {
      return (<p>{`Sum of ${first} and ${second} is ${result} `}</p>);
    }
    case '/': {
      return (<p>{`Sum of ${first} and ${second} is ${result} `}</p>);
    }
    default: {
      return (<p>{`Sum of ${first} and ${second} is ${result} `}</p>);
    }
    }
  }

  render() {
    return (
      <>
        <Math first={7} second={4} operator="+">{this.children}</Math>
        <Math first={7} second={3} operator="-">{this.children}</Math>
        <Math first={7} second={4} operator="*">{this.children}</Math>
        <Math first={7} second={4} operator="/">{this.children}</Math>
        <Math first={7} second={5} operator="-" />
      </>
    );
  }
}

export default ChildrenDemo;
