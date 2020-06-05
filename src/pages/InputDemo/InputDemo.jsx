import React from 'react';
import {
  TextField, SelectField, RadioField, Button,
} from '../../components';
import {
  options, radioCricketOptions, radioFootballOptions, CRICKET, defaultValue,
} from '../../configs/constants';
import { ValidateSchema } from '../../configs/ValidateSchema';
import { PSelectField } from '../../components/SelectField/Style';
import { PRadioField } from '../../components/RadioField/Style';
import { PTextField } from '../../components/TextField/style';
import { ButtonDiv } from '../../components/Button/style';


class InputDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sport: '',
      cricket: '',
      football: '',
      touched: {},
      isValid: false,
      errorMessage: {},
    };
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value }, () => {
      console.log(this.state);
      this.hasError();
    });
  }

  handleSportChange = (event) => {
    if (event.target.value === defaultValue) {
      this.setState({ sport: '', cricket: '', football: '' }, () => {
        console.log(this.state);
        this.hasError();
      });
    } else {
      this.setState({ sport: event.target.value, cricket: '', football: '' }, () => {
        console.log(this.state);
        this.hasError();
      });
    }
  }

  handleRadioChange = (event) => {
    const { sport } = this.state;
    this.setState({ [sport]: event.target.value }, () => {
      console.log(this.state);
      this.hasError();
    });
  }

  checkForRadioOptions = () => {
    const { sport } = this.state;
    return sport === CRICKET ? radioCricketOptions : radioFootballOptions;
  }

  hasError = () => {
    const {
      name, sport, cricket, football, touched,
    } = this.state;
    const parsedError = {};
    ValidateSchema.validate({
      name,
      sport,
      cricket,
      football,
    }, { abortEarly: false }).then(() => {
      this.setState({
        errorMessage: parsedError,
        isValid: true,
      });
    }).catch((error) => {
      error.inner.forEach((element) => {
        if (touched[element.path]) {
          parsedError[element.path] = element.message;
        }
      });
      this.setState({
        errorMessage: parsedError,
        isValid: false,
      });
    });
  }

isTouched = (value) => {
  const { touched } = this.state;
  this.setState({
    touched: {
      ...touched,
      [value]: true,
    },
  }, () => { this.hasError(); });
}

render() {
  const {
    sport, name, cricket, football, errorMessage, isValid,
  } = this.state;
  return (
    <>
      <PTextField>Name</PTextField>
      <TextField
        value={name}
        onChange={this.handleNameChange}
        error={errorMessage.name}
        onBlur={() => this.isTouched('name')}
      />
      <PSelectField>Select the game you play ?</PSelectField>
      {options.length && (
        <SelectField
          error={errorMessage.sport}
          options={options}
          value={sport}
          onChange={this.handleSportChange}
          onBlur={() => this.isTouched('sport')}
        />
      )}
      { sport && options.length
        && (
          <>
            <PRadioField> What you do ?</PRadioField>
            <RadioField
              error={errorMessage[sport]}
              options={
                this.checkForRadioOptions()
              }
              onChange={this.handleRadioChange}
              value={cricket || football || ''}
              onBlur={() => this.isTouched(sport)}
            />
          </>
        )}
      <div>
        <ButtonDiv>
          <Button value="cancel" color="default" onClick={() => { console.log('Clicked Cancel'); }} />
          <Button
            value="submit"
            disabled={!isValid}
            color="primary"
            onClick={() => { console.log('Clicked Submit'); }}
          />
        </ButtonDiv>
      </div>
    </>
  );
}
}

export default InputDemo;
