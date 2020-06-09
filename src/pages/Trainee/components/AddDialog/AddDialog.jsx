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
      confirmPassword: '',
      errorMessage: {},
      touched: {},
      isValid: false,
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
            isValid: true,
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
        name, email, password, confirmPassword, errorMessage, isValid,
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
                      value={email}
                      helperText={errorMessage.email}
                      fullWidth
                      variant="outlined"
                      onChange={this.handleFieldChange('email')}
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
                      value={password}
                      helperText={errorMessage.password}
                      fullWidth
                      variant="outlined"
                      onChange={this.handleFieldChange('password')}
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
                      value={confirmPassword}
                      type="password"
                      fullWidth
                      helperText={errorMessage.confirmPassword}
                      variant="outlined"
                      onChange={this.handleFieldChange('confirmPassword')}
                      onBlur={() => this.isTouched('confirmPassword')}
                      error={Boolean(errorMessage.confirmPassword)}
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
