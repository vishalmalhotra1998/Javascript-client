import React from 'react';
import TextField from '../../components/index';
import { Paragraph } from '../../components/TextField/style';

const TextEditor = () => (
  <>
    <Paragraph>This is a disable input</Paragraph>
    <TextField value="Disabled Input" disabled="true" />
    <p><b>A valid input</b></p>
    <TextField value="Accessible" />
    <p><b>A input with errors</b></p>
    <TextField value="101" error="could not be greater than" />
  </>
);
export default TextEditor;
