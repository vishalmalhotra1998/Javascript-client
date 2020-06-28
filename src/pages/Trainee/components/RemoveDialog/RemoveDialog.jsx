import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import propTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import * as moment from 'moment';
import { SnackBarConsumer } from '../../../../contexts';

class RemoveDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleOnClick = (data, openSnackBar) => {
    const date = '2019-02-14T18:15:11.778Z';
    const { onSubmit } = this.props;
    const isAfter = (moment(data.createdAt).isAfter(date));
    const snackBarMessages = {
      success: 'Trainee Succesfully Deleted',
      error: 'Error While deleted !',
    };
    const status = isAfter ? 'success' : 'error';
    const snackBarMessage = snackBarMessages[status];
    openSnackBar(snackBarMessage, status);
    onSubmit(data);
  }

  render = () => {
    const {
      onClose, open, data,
    } = this.props;
    return (
      <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open} maxWidth="lg" fullWidth>
        <DialogTitle id="simple-dialog-title">Remove Trainee</DialogTitle>
        <DialogContentText>
           Do you really want to delete trainee ?
        </DialogContentText>
        <DialogContent>
          <DialogActions>
            <Button onClick={onClose} variant="contained">
              Cancel
            </Button>
            <SnackBarConsumer>
              {(value) => {
                const { openSnackBar } = value;
                return (
                  <>
                    <Button color="primary" variant="contained" onClick={() => this.handleOnClick(data, openSnackBar)}>
                    Delete
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

RemoveDialog.propTypes = {
  onClose: propTypes.func.isRequired,
  open: propTypes.bool.isRequired,
  onSubmit: propTypes.func.isRequired,
  data: propTypes.objectOf(propTypes.string).isRequired,
};

export default RemoveDialog;
