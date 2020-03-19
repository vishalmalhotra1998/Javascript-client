import React from 'react';
import Button from '@material-ui/core/Button';
import FormDialog from './components/index';

class TraineeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

   handleClickOpen = () => {
     this.setState({ open: true });
   };

   handleClose = () => {
     this.setState({ open: false });
   };

   onSubmitHandle = (values) => {
     this.setState({ open: false });
     console.log(values);
   }

   render() {
     const { open } = this.state;
     return (
       <>
         <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
       Add Trainee
         </Button>
         <FormDialog open={open} onClose={this.handleClose} onSubmit={this.onSubmitHandle} />
       </>
     );
   }
}

export default TraineeComponent;
