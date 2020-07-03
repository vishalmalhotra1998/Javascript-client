import styled from 'styled-components';

const ButtonField = styled.input`
  background-color:${(props) => (!props.disabled && props.value === 'submit' ? '#4CAF50' : 'default')};
  color:${(props) => (!props.disabled && props.value === 'submit' ? 'white' : '')};
  font-weight: bold;
  border-radius: 3px;
  border-style:solid;
  border-width: thin;
  width: 45%;
  height:39px;

`;
const ButtonDiv = styled.div`
 padding-top:2%;
 padding-left: 74%;
 display: flex;
 justify-content: space-around;

`;

export { ButtonField, ButtonDiv };
