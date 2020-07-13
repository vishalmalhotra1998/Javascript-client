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
      showButton: true,
    };
  }

  toggleButton=() => {
    this.setState((prevState) => ({
      showButton: !prevState.showButton,
    }));
  }

  handleOnClick = (removeData) => {
    const { onSubmit } = this.props;
    this.toggleButton();
    onSubmit(removeData);
    this.toggleButton();
  }

  render = () => {
    const {
      onClose, open, data, loading,
    } = this.props;
    const { showButton } = this.state;
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
            <Button disabled={!showButton} color="primary" variant="contained" onClick={() => this.handleOnClick(data)}>
              <span>{loading ? <CircularProgress size={20} /> : ''}</span>
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
  loading: propTypes.bool,
};

RemoveDialog.defaultProps = {
  loading: false,
};

export default RemoveDialog;
