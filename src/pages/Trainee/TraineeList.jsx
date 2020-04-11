import React, { Fragment } from 'react';
import propTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import FormDialog from './components/index';
import trainee from './data/trainee';

class TraineeList extends React.Component {
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
     const { match: { url } } = this.props;
     return (
       <>
         <Box p={1} />
         <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
       Add Trainee
         </Button>
         <FormDialog open={open} onClose={this.handleClose} onSubmit={this.onSubmitHandle} />
         <Box p={1} />
         <ul>
           {trainee.length && trainee.map((data) => (
             <Fragment key={data.id}>
               <li>
                 <Link to={`${url}/${data.id}`}>{data.name}</Link>
               </li>

             </Fragment>
           ))}
         </ul>
       </>
     );
   }
}
export default TraineeList;

TraineeList.propTypes = {
  match: propTypes.string.isRequired,
};
