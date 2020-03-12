import React from 'react';
import * as yup from 'yup';
import {
  TextField, SelectField, RadioField, Button,
} from '../../components/index';
import {
  Options, radioCricketOptions, radioFootballOptions, CRICKET, Default,
} from '../../components/Slider/configs/constants';

import { PSelectField } from '../../components/SelectField/Style';
import { PRadioField } from '../../components/RadioField/Style';
import { PTextField } from '../../components/TextField/style';
import { ButtonDiv } from '../../components/Button/style';

const ValidateSchema = yup.object().shape({
  text: yup
    .string()
    .required('Name is a required Field')
    .min(3)
    .matches('^[A-Za-z\\s]+$')
    .label('Name'),
  SelectField: yup
    .string()
    .required()
    .label('SelectField'),
  cricket: yup
    .string()
    .when('SelectField', {
      is: 'cricket',
      then: yup.string().required('What do you do  ?'),
    }),
  football: yup
    .string()
    .when('SelectField', {
      is: 'football',
      then: yup.string().required('What do you do ?'),
    }),

});


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

  hasError= () => {
    const {
      name, sport, cricket, football,
    } = this.state;
    try {
      const check = ValidateSchema.validateSync({
        text: name,
        SelectField: sport,
        cricket,
        football,
      }, { abortEarly: false });
      return check;
    } catch (error) {
      return false;
    }
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
    const { touched } = this.state;
    if (this.hasError && touched[values]) {
      try {
        const {
          name, sport, cricket, football,
        } = this.state;
        ValidateSchema.validateSyncAt(values, {
          text: name,
          SelectField: sport,
          cricket,
          football,
        });
      } catch (error) {
        return error.message;
      }
    }
  }

  render() {
    const { sport } = this.state;
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
            disabled={!this.hasError()}
            color="default"
          />
        </ButtonDiv>
      </>
    );
  }
}

export default InputDemo;
