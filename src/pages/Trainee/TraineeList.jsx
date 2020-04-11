import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import { FormDialog, TableComponent } from './components/index';
import trainee from './data/trainee';

const useStyles = {

  button: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
};
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
     const { match: { url }, classes } = this.props;
     return (
       <>
         <Box p={1} />
         <div className={classes.button}>
           <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
       Add Trainee
           </Button>
         </div>
         <FormDialog open={open} onClose={this.handleClose} onSubmit={this.onSubmitHandle} />
         <Box p={1} />
         <TableComponent

           id="id"

           data={trainee}

           column={[{
             field: 'name',
             label: 'Name',
             align: 'center',
           },
           {
             field: 'email',
             label: 'Email-Address',

           }]}

         />
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
export default withStyles(useStyles, { withTheme: true })(TraineeList);
