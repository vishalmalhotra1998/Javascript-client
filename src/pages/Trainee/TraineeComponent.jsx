import React from 'react';
import Button from '@material-ui/core/Button';
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
        <Button variant="outlined" color="primary" onClick={this.toggleDialogBox}>
          Add Trainee
        </Button>
        <FormDialog open={open} onClose={this.toggleDialogBox} onSubmit={this.toggleDialogBox} />
      </>
    );
  }
}

export default TraineeComponent;
