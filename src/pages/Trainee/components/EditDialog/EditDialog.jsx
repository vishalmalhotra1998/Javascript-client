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
import { SnackBarConsumer } from '../../../../contexts';
import FormSchema from './schema';
import callApi from '../../../../libs/utils/api';

const useStyles = {
  root: {
    flexGrow: 1,
  },
};

const editDialogStates = {
  name: '',
  email: '',
  showButton: false,
  touched: {},
  errorMessage: {},
  loader: false,

};

class EditDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...editDialogStates,
    };
  }

  toggleLoader=() => {
    this.setState((prevState) => ({
      loader: !prevState.loader,
      showButton: !prevState.showButton,
    }));
  }

  toggleButton=() => {
    this.setState((prevState) => ({
      showButton: !prevState.showButton,
    }));
  }

   handleFieldChange=(field) => (event) => {
     this.setState({
       [field]: event.target.value,
     }, () => {
       this.hasError();
       this.isTouched(field);
     });
   }

   hasError=() => {
     const { name, email, touched } = this.state;
     const parsedError = {};
     FormSchema.validate({
       name,
       email,
     }, { abortEarly: false }).then(() => {
       this.setState({
         showButton: true,
         errorMessage: parsedError,
       });
     }).catch((error) => {
       const { inner } = error;
       inner.forEach((element) => {
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

     isTouched=(value) => {
       const { touched } = this.state;
       const { data } = this.props;
       const touchedField = {};
       this.setState({
         touched: {
           ...touched,
           [value]: true,
         },
       }, () => {
         const { touched: newTouched } = this.state;
         const stateObject = this.state;
         Object.keys(data).forEach((keys) => {
           if (!newTouched[keys] || !stateObject[value]) {
             touchedField[keys] = data[keys];
           }
         });
         this.setState({
           ...touchedField,
         }, () => this.hasError());
       });
     }

     isError = (fields) => {
       const { errorMessage } = this.state;
       if (errorMessage[fields]) {
         return true;
       }
       return false;
     }

     formReset=() => {
       this.setState({
         ...editDialogStates,
       });
     }

    handleOnClick= async (editData, openSnackBar) => {
      const { onSubmit, data: { originalId } } = this.props;
      const { name, email } = editData;
      const snackBarMessages = {
        success: 'Trainee Updated Successfully',
        error: 'Error in Updating the field',
      };
      const apiData = { data: { id: originalId, name, email } };
      const url = '/trainee';
      const method = 'put';
      this.toggleLoader();
      const responseData = await callApi(apiData, url, method);
      const { data } = responseData;
      const status = data ? 'success' : 'error';
      const snackBarMessage = snackBarMessages[status];
      this.toggleLoader();
      if (data) {
        openSnackBar(snackBarMessage, status);
        onSubmit(editData);
        this.formReset();
      } else {
        this.toggleButton();
        openSnackBar(snackBarMessage, status);
      }
    }

    handleOnClose=() => {
      const { onClose } = this.props;
      onClose();
      this.formReset();
    }

  render = () => {
    const {
      open, onClose, classes, data,
    } = this.props;
    const {
      name, email, showButton, errorMessage, loader,
    } = this.state;
    return (
      <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Edit Trainee</DialogTitle>
        <DialogContent>
          <div className={classes.root}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="Name"
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
                  onChange={this.handleFieldChange('name')}
                  onBlur={() => this.isTouched('name')}
                  error={this.isError('name')}
                  helperText={errorMessage.name}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="Email"
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
                  onChange={this.handleFieldChange('email')}
                  onBlur={() => this.isTouched('email')}
                  error={this.isError('email')}
                  helperText={errorMessage.email}

                />
              </Grid>
            </Grid>
          </div>
          <DialogActions>
            <Button onClick={this.handleOnClose} color="primary">
            Cancel
            </Button>
            <SnackBarConsumer>
              {(value) => {
                const { openSnackBar } = value;
                return (
                  <>
                    <Button disabled={!showButton} onClick={() => this.handleOnClick({ name, email }, openSnackBar)} color="primary">
                      <span>{loader ? <CircularProgress size={30} /> : ''}</span>
              Submit
                    </Button>
                  </>
                );
              }}
            </SnackBarConsumer>
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
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withStyles(useStyles)(EditDialog);
