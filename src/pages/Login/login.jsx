import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EmailIcon from '@material-ui/icons/Email';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import propTypes from 'prop-types';
import signInSchema from './validateSchema';
import { SnackBarConsumer } from '../../contexts';

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
      showButton: false,
      loader: false,
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
          showButton: true,
        });
      }).catch((error) => {
        error.inner.forEach((element) => {
          if (touched[element.path]) {
            parsedError[element.path] = element.message;
          }
        });
        this.setState({
          errorMessage: parsedError,
          showButton: false,
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

    toggleLoaderAndShowButton = () => {
      this.setState((prevState) => ({
        loader: !prevState.loader,
        showButton: !prevState.showButton,
      }));
    }

    handleOnClick = async (openSnackBar) => {
      try {
        this.toggleLoaderAndShowButton();
        const { email, password } = this.state;
        const { history, loginUser } = this.props;
        const loginData = await loginUser({ variables: { email, password } });
        const { data = {} } = loginData;
        const { loginUser: token = '' } = data;
        this.toggleLoaderAndShowButton();
        localStorage.setItem('token', token);
        history.push('/trainee');
      } catch (error) {
        this.toggleLoaderAndShowButton();
        openSnackBar(error.message, 'error');
      }
    }

    render = () => {
      const { classes } = this.props;
      const {
        showButton, errorMessage, email, password, loader,
      } = this.state;

      return (

        <Container component="main" maxWidth="xs">
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
                <SnackBarConsumer>
                  {(value) => {
                    const { openSnackBar } = value;
                    return (
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={!showButton}
                        onClick={() => this.handleOnClick(openSnackBar)}
                      >
                        <span>{loader ? <CircularProgress size={30} /> : ''}</span>
                                            Sign In
                      </Button>
                    );
                  }}
                </SnackBarConsumer>
              </form>
            </div>
          </Box>
        </Container>
      );
    }
}

export default withStyles(useStyles, { withTheme: true })(SignIn);

SignIn.propTypes = {
  classes: propTypes.objectOf(propTypes.string).isRequired,
  history: propTypes.objectOf(propTypes.any).isRequired,
  loginUser: propTypes.func.isRequired,
};
