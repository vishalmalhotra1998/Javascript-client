import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import propTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import * as moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import callApi from '../../../../libs/utils/api';
import { SnackBarConsumer } from '../../../../contexts';


class RemoveDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      showButton: true,
    };
  }

  toggleLoaderAndButton=() => {
    this.setState((prevState) => ({
      loader: !prevState.loader,
      showButton: !prevState.showButton,
    }));
  }

  handleOnClick = (removeData, openSnackBar) => {
    const date = '2019-02-14T18:15:11.778Z';
    const isAfter = (moment(removeData.createdAt).isAfter(date));
    const snackBarMessages = {
      success: 'Trainee Succesfully Deleted',
      error: 'Error While deleted !',
    };
    const status = isAfter ? 'success' : 'error';
    const snackBarMessage = snackBarMessages[status];
    if (status === 'success') {
      this.handleCallApiForRemove(removeData, openSnackBar, snackBarMessages);
    } else {
      openSnackBar(snackBarMessage, status);
    }
  }


  handleCallApiForRemove = async (removeData, openSnackBar, snackBarMessages) => {
    const { originalId: id } = removeData;
    const { onSubmit } = this.props;
    this.toggleLoaderAndButton();
    const apiData = '';
    const url = `/trainee/${id}`;
    const method = 'delete';
    const responseData = await callApi(apiData, url, method);
    const { data } = responseData;
    const status = data ? 'success' : 'error';
    const snackBarMessage = snackBarMessages[status];
    openSnackBar(snackBarMessage, status);
    this.toggleLoaderAndButton();
    onSubmit(removeData);
  }

  render = () => {
    const {
      onClose, open, data,
    } = this.props;
    const { loader, showButton } = this.state;
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
                    <Button disabled={!showButton} color="primary" variant="contained" onClick={() => this.handleOnClick(data, openSnackBar)}>
                      <span>{loader ? <CircularProgress size={20} /> : ''}</span>
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
