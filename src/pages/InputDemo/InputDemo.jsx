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
      touched: {},
      isValid: false,
      errorMessage: {},
    };
  }

    handleNameChange = (values) => {
      this.setState({ name: values.target.value }, () => {
        console.log(this.state);
        this.hasError();
      });
    }

    handleSportChange = (values) => {
      if (values.target.value === Default) {
        this.setState({ sport: '' }, () => {
          console.log(this.state);
          this.hasError();
        });
      } else {
        this.setState({ sport: values.target.value }, () => {
          console.log(this.state);
          this.hasError();
        });
        this.setState({ cricket: '', football: '' }, () => {
          console.log(this.state);
          this.hasError();
        });
      }
    }

    handleRadioChange = (values) => {
      const { sport } = this.state;
      this.setState({ cricket: '', football: '' }, () => {
        console.log(this.state);
        this.hasError();
      });
      if (sport === CRICKET) {
        this.setState({ cricket: values.target.value }, () => {
          console.log(this.state);
          this.hasError();
        });
        this.setState({ football: '' }, () => {
          console.log(this.state);
          this.hasError();
        });
      } else {
        this.setState({ football: values.target.value }, () => {
          console.log(this.state);
          this.hasError();
        });

        this.setState({ cricket: '' }, () => {
          console.log(this.state);
          this.hasError();
        });
      }
    }

    checkForRadioOptions = () => {
      const { sport } = this.state;
      return sport === CRICKET ? radioCricketOptions : radioFootballOptions;
    }

    hasError = () => {
      const {
        name, sport, cricket, football, touched,
      } = this.state;
      const errorStateHandler = {};
      ValidateSchema.validate({
        text: name,
        SelectField: sport,
        cricket,
        football,
      }, { abortEarly: false }).then(() => {
        this.setState({
          errorMessage: errorStateHandler,
          isValid: true,
        });
      }).catch((error) => {
        error.inner.forEach((element) => {
          if (touched[element.path]) {
            errorStateHandler[element.path] = element.message;
          }
        });
        this.setState({
          errorMessage: errorStateHandler,
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
  const { sport, errorMessage, isValid } = this.state;
  return (
    <>
      <PTextField>Name</PTextField>
      <br />
      <TextField error={errorMessage.text} onChange={this.handleNameChange} onBlur={() => this.isTouched('text')} />
      <br />
      <PSelectField>Select the game you play ?</PSelectField>
      {Options.length && (
        <SelectField
          error={errorMessage.SelectField}
          defaultText={Default}
          Options={Options}
          onChange={this.handleSportChange}
          onBlur={() => this.isTouched('SelectField')}
        />
      )}
      <br />
      {sport && Options.length
                && (
                  <>
                    <PRadioField> What you do ?</PRadioField>
                    <RadioField
                      error={errorMessage[sport]}
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
