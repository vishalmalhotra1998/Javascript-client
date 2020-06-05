import styled from 'styled-components';

const Select = styled.select`
  width: 99%;
  border-color: ${(props) => (props.error ? 'red' : 'lightgrey')};
  padding-top:1%;
  padding-bottom:1%;
  padding-left:0.2%;
  padding-right:3%;
  border-width: thin;
  border-style: solid;
  font-size:100%;
  
`;
const PSelectField = styled.p`
  font-weight: bold;
`;
const Error = styled.p`
  width: 100%;
  margin-top:0.2%;
  color: red;
`;
export { Select, PSelectField, Error };
