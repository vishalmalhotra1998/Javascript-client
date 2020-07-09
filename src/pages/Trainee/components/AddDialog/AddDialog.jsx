import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import InputAdornment from '@material-ui/core/InputAdornment';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import Grid from '@material-ui/core/Grid';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import propTypes from 'prop-types';
import FormSchema from './schema';
import { SnackBarConsumer } from '../../../../contexts';


const useStyles = {
  root: {
    flexGrow: 1,
  },
};

const addDialogStates = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  errorMessage: {},
  touched: {},
  showButton: false,
  loader: false,

};

class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...addDialogStates,
    };
  }

    handleFieldChange = (field) => (event) => {
      this.setState({ [field]: event.target.value }, () => {
        this.hasError();
      });
    }

    hasError = () => {
      const {
        name,
        email,
        password,
        confirmPassword,
        touched,
      } = this.state;

      const parsedError = {};
      FormSchema.validate(
        {
          name,
          email,
          password,
          confirmPassword,
        },
        { abortEarly: false },
      )
        .then(() => {
          this.setState({
            showButton: true,
            errorMessage: {},
          });
        })
        .catch((error) => {
          error.inner.forEach((errors) => {
            if (touched[errors.path]) {
              parsedError[errors.path] = errors.message;
            }
          });
          this.setState({
            errorMessage: parsedError,
            showButton: false,
          });
        });
    };

    isTouched = (keys) => {
      const { touched } = this.state;
      this.setState(
        {
          touched: {
            ...touched,
            [keys]: true,
          },
        },
        () => {
          this.hasError();
        },
      );
    };

      isError=(field) => {
        const { errorMessage } = this.state;
        if (errorMessage[field]) {
          return true;
        }
        return false;
      }

      toggleLoaderAndShowButton=() => {
        this.setState((prevState) => ({
          loader: !prevState.loader,
          showButton: !prevState.showButton,
        }));
      }

      formReset=() => {
        this.setState({
          ...addDialogStates,
        });
      }

handleCallApi= async (value, openSnackBar) => {
  const { onSubmit } = this.props;
  this.toggleLoaderAndShowButton();
  await onSubmit(value, openSnackBar);
  this.formReset();
};

render = () => {
  const {
    classes, open, onClose,
  } = this.props;
  const {
    name, email, password, confirmPassword, errorMessage, showButton, loader,
  } = this.state;
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
        maxWidth="xl"
      >
        <DialogTitle id="form-dialog-title">
                        Add Trainee
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
                            Enter your Trainee Detail
          </DialogContentText>
          <div className={classes.root}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                  value={name}
                  helperText={errorMessage.name}
                  fullWidth
                  variant="outlined"
                  onChange={this.handleFieldChange('name')}
                  onBlur={() => this.isTouched('name')}
                  required
                  error={this.isError('name')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email Address"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  value={email}
                  helperText={errorMessage.email}
                  fullWidth
                  variant="outlined"
                  onChange={this.handleFieldChange('email')}
                  onBlur={() => this.isTouched('email')}
                  error={this.isError('email')}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Password"
                  type="password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VisibilityOffIcon />
                      </InputAdornment>
                    ),
                  }}
                  value={password}
                  helperText={errorMessage.password}
                  fullWidth
                  variant="outlined"
                  onChange={this.handleFieldChange('password')}
                  onBlur={() => this.isTouched('password')}
                  error={this.isError('password')}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Confirm Password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VisibilityOffIcon />
                      </InputAdornment>
                    ),
                  }}
                  value={confirmPassword}
                  type="password"
                  fullWidth
                  helperText={errorMessage.confirmPassword}
                  variant="outlined"
                  onChange={this.handleFieldChange('confirmPassword')}
                  onBlur={() => this.isTouched('confirmPassword')}
                  error={this.isError('confirmPassword')}
                />
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
                            Cancel
          </Button>
          <SnackBarConsumer>
            {(value) => {
              const { openSnackBar } = value;
              return (
                <Button
                  disabled={!showButton}
                  onClick={() => this.handleCallApi({ name, email, password }, openSnackBar)}
                  color="primary"
                >
                  <span>{loader ? <CircularProgress size={30} /> : ''}</span>
                            Submit
                </Button>
              );
            }}
          </SnackBarConsumer>
        </DialogActions>
      </Dialog>
    </div>
  );
};
}
FormDialog.propTypes = {
  open: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
  onSubmit: propTypes.func.isRequired,
  classes: propTypes.objectOf(propTypes.any).isRequired,
};
export default withStyles(useStyles, { withTheme: true })(FormDialog);
