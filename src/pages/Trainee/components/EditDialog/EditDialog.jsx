import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import ls from 'local-storage';
import callApi from '../../../../libs/utils/api';
import { MyContext } from '../../../../contexts';

const useStyles = {
  root: {
    flexGrow: 1,
  },
};

class EditDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      isValid: false,
      touched: {},
      loader: false,

    };
  }

  handleNameChange = (event) => {
    const { touched } = this.setState;
    this.setState({
      name: event.target.value,
      isValid: true,
    }, () => {
      this.setState({
        touched: {
          ...touched,
          name: true,
        },
      });
    });
  };

  handleEmailChange = (event) => {
    const { touched } = this.state;
    this.setState({
      email: event.target.value,
      isValid: true,
    }, () => {
      this.setState({
        touched: {
          ...touched,
          email: true,
        },
      });
    });
  };

  isTouched = (value) => {
    const { touched } = this.state;
    const { data } = this.props;
    this.setState({
      touched: {
        ...touched,
        [value]: true,

      },
      isValid: true,
    }, () => {
      Object.keys(data).forEach((keys) => {
        if (!touched[keys]) {
          this.setState({
            [keys]: data[keys],
          });
        }
      });
    });
  }

  formReset = () => {
    this.setState({
      name: '',
      email: '',
      isValid: false,
      touched: {},
    });
  }

  handleFormCallApi=(data, openSnackBar) => {
    const { name, email, originalId } = data;
    this.setState({ loader: true });
    const { onSubmit } = this.props;
    callApi({ data: { id: originalId, name, email }, headers: { Authorization: ls.get('token') } }, '/trainee', 'put').then((response) => {
      const { status } = response;
      if (status === 'ok') {
        this.setState({
          loader: false,
        }, () => {
          onSubmit({ name, email });
          openSnackBar('This is a success Message!', 'success');
        });
      } else {
        this.setState({ isValid: false }, () => {
          openSnackBar('There is an Error ! ', 'error');
        });
      }
    });
  }

  render = () => {
    const {
      open, onClose, classes, data,
    } = this.props;
    const {
      name, email, isValid, loader,
    } = this.state;
    const { originalId } = data;
    return (
      <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
        <DialogContent>
          <div className={classes.root}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="outlined-helperText"
                  label="Name"
                  defaultValue={data.name}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  variant="outlined"
                  onChange={this.handleNameChange}
                  onBlur={() => { this.isTouched('name'); }}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-helperText"
                  label="Email Address"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  defaultValue={data.email}
                  variant="outlined"
                  onChange={this.handleEmailChange}
                  onBlur={() => { this.isTouched('email'); }}

                />
              </Grid>
            </Grid>
          </div>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>

            <MyContext.Consumer>
              {(value) => (
                <>
                  <Button
                    variant="contained"
                    disabled={!isValid}
                    onClick={() => {
                      this.formReset();
                      this.handleFormCallApi({ name, email, originalId }, value.openSnackBar);
                    }}
                    color="primary"
                  >
                    <span>{loader ? <CircularProgress size={20} /> : '' }</span>
              Submit
                  </Button>
                </>
              )}
            </MyContext.Consumer>
          </DialogActions>
        </DialogContent>
      </Dialog>
    );
  }
}

EditDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
  classes: PropTypes.elementType.isRequired,
};

export default withStyles(useStyles)(EditDialog);
