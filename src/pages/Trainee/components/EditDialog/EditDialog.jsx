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

    };
  }


   handleFieldChange=(field) => (event) => {
     const { touched } = this.state;
     this.setState({
       [field]: event.target.value,
       isValid: true,
     }, () => {
       this.setState({
         touched: {
           ...touched,
           [field]: true,
         },
       });
     });
   }

     isTouched=(value) => {
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

     formReset=() => {
       this.setState({
         name: '',
         email: '',
         isValid: false,
         touched: {},
       });
     }

  render = () => {
    const {
      open, onClose, onSubmit, classes, data,
    } = this.props;
    const { name, email, isValid } = this.state;
    return (
      <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
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
                  onBlur={() => { this.isTouched('name'); }}

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
                  onBlur={() => { this.isTouched('email'); }}

                />
              </Grid>
            </Grid>
          </div>
          <DialogActions>
            <Button onClick={onClose} color="primary">
            Cancel
            </Button>
            <Button disabled={!isValid} onClick={() => { onSubmit({ name, email }); this.formReset(); }} color="primary">

            Submit
            </Button>
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
