import React from 'react';
import { TextField, Slider } from '../../components/index';
import { PTextField } from '../../components/TextField/style';
import { imageArray } from '../../components/Slider/configs/constants';

const TextEditor = () => (
  <>
    <Slider altText="Default Banner" banners={imageArray} random={false} />
    <PTextField>This is a disable input</PTextField>
    <TextField value="Disabled Input" disabled="true" />
    <p><b>A valid input</b></p>
    <TextField value="Accessible" />
    <p><b>A input with errors</b></p>
    <TextField value="101" error="could not be greater than" />
  </>
);
export default TextEditor;
