import styled from 'styled-components';

const Input = styled.input`
  width: 96%;
  border-color: ${(props) => (props.value === '101' ? 'red' : props)};
  padding-top:1%;
  padding-bottom:1%;
  padding-left:0.2%;
  padding-right:3%;
  
`;

const Error = styled.p`
  width: 100%;
  margin-top:0.2%;
  color: red;
`;

const Paragraph = styled.p`
font-weight:bold;
`;

export { Input, Error, Paragraph };
