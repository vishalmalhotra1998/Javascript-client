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

   handleClickEvent=() => {
     this.setState((prevState) => ({
       open: !prevState.open,
     }));
   }

   onSubmitHandle = (values) => {
     this.setState({ open: false });
     console.log(values);
   }

   render() {
     const { open } = this.state;
     return (
       <>
         <Button variant="outlined" color="primary" onClick={this.handleClickEvent}>
       Add Trainee
         </Button>
         <FormDialog open={open} onClose={this.handleClickEvent} onSubmit={this.onSubmitHandle} />
       </>
     );
   }
}

export default TraineeComponent;
