import React from 'react';
import {
  TextField, SelectField, RadioField, Button,
} from '../../components/index';
import {
  Options, radioCricketOptions, radioFootballOptions, CRICKET, Default, ValidateSchema,
} from '../../components/Slider/configs/constants';

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
      touched: {
        text: false,
        SelectField: false,
        cricket: false,
        football: false,
      },
      isValid: false,
      hasError: {},
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

  hasError = () => {
    const {
      name, sport, cricket, football, isValid,
    } = this.state;
    ValidateSchema.isValid({
      text: name,
      SelectField: sport,
      cricket,
      football,
    }, { abortEarly: false }).then((value) => {
      if (isValid !== value) {
        this.setState({ isValid: value });
      }
    });
    return isValid;
  }

  isTouched=(value) => {
    const { touched } = this.state;
    this.setState({
      touched: {
        ...touched,
        [value]: true,
      },
    });
  }

  getError = (values) => {
    const { touched, hasError } = this.state;
    if (!this.hasError() && touched[values]) {
      const {
        name, sport, cricket, football,
      } = this.state;
      ValidateSchema.validateAt(values, {
        text: name,
        SelectField: sport,
        cricket,
        football,
      }).then(() => {
        if (hasError[values] !== undefined) {
          this.setState({
            hasError: {
              ...hasError,
              [values]: undefined,
            },
          });
        }
      }).catch((error) => {
        if (hasError[values] !== error.message) {
          this.setState({
            hasError: {
              ...hasError,
              [values]: error.message,
            },
          });
        }
      });
    }
    return hasError[values];
  }


  render() {
    const { sport, isValid } = this.state;
    return (
      <>
        <PTextField>Name</PTextField>
        <br />
        <TextField error={this.getError('text')} onChange={this.handleNameChange} onBlur={() => this.isTouched('text')} />
        <br />
        <PSelectField>Select the game you play ?</PSelectField>
        {Options.length && (
          <SelectField
            error={this.getError('SelectField')}
            defaultText={Default}
            Options={Options}
            onChange={this.handleSportChange}
            onBlur={() => this.isTouched('SelectField')}
          />
        )}
        <br />
        { sport && Options.length
        && (
          <>
            <PRadioField> What you do ?</PRadioField>
            <RadioField
              error={this.getError(sport)}
              Options={
                this.checkForRadioOptions()
              }
              onChange={this.handleRadioChange}
              onBlur={() => this.isTouched(sport)}
            />
          </>
        )}
        <ButtonDiv>
          <Button value="cancel" color="default" />
          <Button
            value="submit"
            disabled={!isValid}
            color="default"
          />
        </ButtonDiv>
      </>
    );
  }
}

export default InputDemo;
