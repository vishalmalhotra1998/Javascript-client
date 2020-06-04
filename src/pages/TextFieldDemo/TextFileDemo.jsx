import React from 'react';
import { TextField, Slider } from '../../components';
import { PTextField } from '../../components/TextField/style';
import { imageArray } from '../../configs/constants';

const TextEditor = () => (
  <>
    <Slider altText="Default Banner" banners={imageArray} random />
    <PTextField>This is a disable input</PTextField>
    <TextField value="Disabled Input" disabled />
    <p><b>A valid input</b></p>
    <TextField value="Accessible" />
    <p><b>A input with errors</b></p>
    <TextField value="101" error="could not be greater than" />
  </>
);
export default TextEditor;
