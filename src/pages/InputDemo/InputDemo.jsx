import React from 'react';
import { TextField, SelectField, RadioField } from '../../components';
import {
  options, radioCricketOptions, radioFootballOptions, CRICKET, defaultValue,
} from '../../configs/constants';

import { PSelectField } from '../../components/SelectField/Style';
import { PRadioField } from '../../components/RadioField/Style';
import { PTextField } from '../../components/TextField/style';

class InputDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sport: '',
      cricket: '',
      football: '',
    };
  }

  handleNameChange = (values) => {
    this.setState({ name: values.target.value }, () => {
      console.log(this.state);
    });
  }

  handleSportChange = (values) => {
    if (values.target.value === defaultValue) {
      this.setState({ sport: '', cricket: '', football: '' }, () => {
        console.log(this.state);
      });
    } else {
      this.setState({ sport: values.target.value, cricket: '', football: '' }, () => {
        console.log(this.state);
      });
    }
  }

  handleRadioChange = (values) => {
    const { sport } = this.state;
    this.setState({ [sport]: values.target.value }, () => {
      console.log(this.state);
    });
  }

  checkForRadioOptions = () => {
    const { sport } = this.state;
    return sport === CRICKET ? radioCricketOptions : radioFootballOptions;
  }

  render() {
    const {
      sport, name, cricket, football,
    } = this.state;
    return (
      <>
        <PTextField>Name</PTextField>
        <TextField value={name} onChange={this.handleNameChange} />
        <PSelectField>Select the game you play ?</PSelectField>
        {options.length && (
          <SelectField
            options={options}
            onChange={this.handleSportChange}
            value={sport}
          />
        )}
        { sport && options.length
        && (
          <>
            <PRadioField> What you do ?</PRadioField>
            <RadioField
              options={
                this.checkForRadioOptions()
              }
              onChange={this.handleRadioChange}
              value={cricket || football || ''}
            />
          </>
        )}
      </>
    );
  }
}

export default InputDemo;
