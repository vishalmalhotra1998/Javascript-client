import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EmailIcon from '@material-ui/icons/Email';
import InputAdornment from '@material-ui/core/InputAdornment';
import Box from '@material-ui/core/Box';
import propTypes from 'prop-types';
import signInSchema from './validateSchema';

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isValid: false,
      touched: {},
      errorMessage: {},

    };
  }

    handleFieldChange = (field) => (event) => {
      this.setState({
        [field]: event.target.value,
      }, () => this.hasError(), this.isTouched(field));
    }

    hasError = () => {
      const { email, password, touched } = this.state;
      const parsedError = {};
      signInSchema.validate({
        email,
        password,
      }, { abortEarly: false }).then(() => {
        this.setState({
          errorMessage: {},
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

    isTouched = (keys) => {
      const { touched } = this.state;
      this.setState({
        touched: {
          ...touched,
          [keys]: true,
        },

      }, () => { this.hasError(); });
    }

    isError = (fields) => {
      const { errorMessage } = this.state;
      if (errorMessage[fields]) {
        return true;
      }
      return false;
    }

    render = () => {
      const { classes } = this.props;
      const {
        isValid, errorMessage, email, password,
      } = this.state;

      return (

        <Container component="main" maxWidth="xs">
          <CssBaseline />

          <Box boxShadow={6} padding={3} marginTop={6}>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                            Login
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={this.handleFieldChange('email')}
                  onBlur={() => { this.isTouched('email'); }}
                  autoFocus
                  helperText={errorMessage.email}
                  error={this.isError('email')}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VisibilityIcon />
                      </InputAdornment>
                    ),
                  }}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  autoComplete="current-password"
                  onChange={this.handleFieldChange('password')}
                  onBlur={() => { this.isTouched('password'); }}
                  helperText={errorMessage.password}
                  error={this.isError('password')}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={!isValid}
                >
                    Sign In
                </Button>
              </form>
            </div>
          </Box>
        </Container>
      );
    }
}
export default withStyles(useStyles, { withTheme: true })(SignIn);

SignIn.propTypes = {
  classes: propTypes.objectOf(propTypes.any).isRequired,
};
