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
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { withStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';
import FormSchema from './schema';

const useStyles = {
  root: {
    flexGrow: 1,
  },
};

class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errorMessage: {},
      touched: {},
      isValid: false,
    };
  }

    handleNameChange = (event) => {
      this.setState({ name: event.target.value }, () => {
        this.hasError();
      });
    };

    handleEmailChange = (event) => {
      this.setState({ email: event.target.value }, () => {
        this.hasError();
      });
    };

    handlePasswordChange = (event) => {
      this.setState({ password: event.target.value }, () => {
        this.hasError();
      });
    };

    handleConfirmPasswordChange = (event) => {
      this.setState({ passwordConfirmation: event.target.value }, () => {
        this.hasError();
      });
    };

    hasError = () => {
      const {
        name,
        email,
        password,
        passwordConfirmation,
        touched,
      } = this.state;
      const parsedError = {};
      FormSchema.validate(
        {
          name,
          email,
          password,
          passwordConfirmation,
        },
        { abortEarly: false },
      )
        .then(() => {
          this.setState({
            isValid: true,
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
            isValid: false,
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

    render = () => {
      const {
        classes, open, onClose, onSubmit,
      } = this.props;
      const {
        name, email, password, errorMessage, isValid,
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
                      helperText={errorMessage.name}
                      fullWidth
                      variant="outlined"
                      onChange={this.handleNameChange}
                      onBlur={() => this.isTouched('name')}
                      required
                      error={Boolean(errorMessage.name)}
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
                      helperText={errorMessage.email}
                      fullWidth
                      variant="outlined"
                      onChange={this.handleEmailChange}
                      onBlur={() => this.isTouched('email')}
                      error={Boolean(errorMessage.email)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Password"
                      type="password"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <VisibilityIcon />
                          </InputAdornment>
                        ),
                      }}
                      helperText={errorMessage.password}
                      fullWidth
                      variant="outlined"
                      onChange={this.handlePasswordChange}
                      onBlur={() => this.isTouched('password')}
                      error={Boolean(errorMessage.password)}
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
                      type="password"
                      fullWidth
                      helperText={
                        errorMessage.passwordConfirmation
                      }
                      variant="outlined"
                      onChange={
                        this.handleConfirmPasswordChange
                      }
                      onBlur={() => this.isTouched(
                        'passwordConfirmation',
                      )}
                      error={Boolean(
                        errorMessage.passwordConfirmation,
                      )}
                    />
                  </Grid>
                </Grid>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} color="primary">
                            Cancel
              </Button>
              <Button
                disabled={!isValid}
                onClick={() => {
                  onSubmit({ name, email, password });
                }}
                color="primary"
              >
                            Submit
              </Button>
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
