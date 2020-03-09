import styled from 'styled-components';

const Input = styled.input`
  width: 96%;
  border-color: ${(props) => (props.value === '101' ? 'red' : 'lightgrey')};
  padding-top:1%;
  padding-bottom:1%;
  padding-left:0.2%;
  padding-right:3%;
  border-width: thin;
  border-style: solid;
  border-radius: 6px;
  
`;

const Error = styled.p`
  width: 100%;
  margin-top:0.2%;
  color: red;
`;

const PTextField = styled.p`
font-weight:bold;
`;

export { Input, Error, PTextField };
