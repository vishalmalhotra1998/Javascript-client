import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import propTypes from 'prop-types';
import MuiAlert from '@material-ui/lab/Alert';

const SnackBarContext = React.createContext();

const snackBarStates = {
  message: '',
  status: '',
  open: false,
};

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

class SnackBarProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...snackBarStates,
    };
  }

    handleSnackBar = (message, status) => {
      this.setState({
        message,
        status,
      });
      this.toggleButtonSnackbar();
    }

    toggleButtonSnackbar = () => {
      this.setState((prevState) => ({
        open: !prevState.open,
      }));
    }

    render() {
      const { children } = this.props;
      const { message, status, open } = this.state;
      const snackBar = (
        <div>
          <Snackbar open={open} autoHideDuration={6000} onClose={this.toggleButtonSnackbar}>
            <Alert onClose={this.toggleButtonSnackbar} severity={status}>
              {message}
            </Alert>
          </Snackbar>
        </div>
      );
      return (
        <>
          <SnackBarContext.Provider
            value={{
              openSnackBar: this.handleSnackBar,
            }}
          >
            {children}
            {snackBar}
          </SnackBarContext.Provider>
        </>
      );
    }
}

SnackBarProvider.propTypes = {
  children: propTypes.element.isRequired,
};

const SnackBarConsumer = SnackBarContext.Consumer;
export { SnackBarProvider, SnackBarConsumer };
