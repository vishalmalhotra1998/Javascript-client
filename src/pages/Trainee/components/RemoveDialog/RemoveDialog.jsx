import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import propTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


class RemoveDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
    };
  }

  toggleLoader = () => {
    this.setState((prevState) => ({
      loader: !prevState.loader,
    }));
  }

  handleLoader = async (data) => {
    const { onSubmit } = this.props;
    await onSubmit(data);
    this.toggleLoader();
  }

  render = () => {
    const {
      onClose, open, data,
    } = this.props;
    const { loader } = this.state;
    return (
      <Dialog onClose={() => onClose()} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Remove Trainee</DialogTitle>
        <div>
          <DialogContentText>
            Do you really want to delete trainee ?
          </DialogContentText>
        </div>
        <DialogContent>
          <DialogActions>
            <Button onClick={() => onClose()} variant="contained">
              Cancel
            </Button>
            <Button
              disabled={loader}
              color="primary"
              variant="contained"
              onClick={() => { this.handleLoader(data); this.toggleLoader(); }}
            >
              <span>
                {loader ? <CircularProgress size={20} /> : ''}
              </span>
              Delete
            </Button>
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
