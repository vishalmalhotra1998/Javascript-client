import React from 'react';
import { TextField, SelectField, RadioField } from '../../components/index';
import {
  Options, radioCricketOptions, radioFootballOptions, CRICKET, Default,
} from '../../components/Slider/configs/constants';

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
    if (values.target.value === Default) {
      this.setState({ sport: '' }, () => {
        console.log(this.state);
      });
    } else {
      this.setState({ sport: values.target.value }, () => {
        console.log(this.state);
      });
      this.setState({ cricket: '', football: '' }, () => {
        console.log(this.state);
      });
    }
  }

  handleRadioChange = (values) => {
    const { sport } = this.state;
    this.setState({ cricket: '', football: '' }, () => {
      console.log(this.state);
    });
    if (sport === CRICKET) {
      this.setState({ cricket: values.target.value }, () => {
        console.log(this.state);
      });
      this.setState({ football: '' }, () => {
        console.log(this.state);
      });
    } else {
      this.setState({ football: values.target.value }, () => {
        console.log(this.state);
      });

      this.setState({ cricket: '' }, () => {
        console.log(this.state);
      });
    }
  }

  checkForRadioOptions = () => {
    const { sport } = this.state;
    return sport === CRICKET ? radioCricketOptions : radioFootballOptions;
  }

  render() {
    const { sport } = this.state;
    return (
      <>
        <PTextField>Name</PTextField>
        <br />
        <TextField error onChange={this.handleNameChange} />
        <br />
        <PSelectField>Select the game you play ?</PSelectField>
        {Options.length && (
          <SelectField
            defaultText={Default}
            Options={Options}
            onChange={this.handleSportChange}
          />
        )}
        <br />
        { sport && Options.length
        && (
          <>
            <PRadioField> What you do ?</PRadioField>
            <RadioField
              Options={
                this.checkForRadioOptions()
              }
              onChange={this.handleRadioChange}
            />
          </>
        )}
      </>
    );
  }
}

export default InputDemo;
