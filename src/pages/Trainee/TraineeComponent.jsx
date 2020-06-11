import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { NavBar } from '../Components';
import { FormDialog } from './components';


class TraineeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

    toggleDialogBox = () => {
      this.setState((prevState) => ({
        open: !prevState.open,
      }));
    }

    onSubmitHandle = (values) => {
      this.toggleDialogBox();
      console.log(values);
    }

    render() {
      const { open } = this.state;
      return (
        <>
          <NavBar />
          <Box p={1} />
          <Button variant="outlined" color="primary" onClick={this.toggleDialogBox}>
                    Add Trainee
          </Button>
          <FormDialog open={open} onClose={this.toggleDialogBox} onSubmit={this.toggleDialogBox} />
        </>
      );
    }
}

export default TraineeComponent;
