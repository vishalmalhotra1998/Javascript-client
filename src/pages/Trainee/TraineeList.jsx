import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import propTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  FormDialog, TableComponent, EditDialog, RemoveDialog,
} from './components';
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
      order: 'asc',
      orderBy: '',
      page: 0,
      editOpen: false,
      removeOpen: false,
      rowData: {},
      rowsPerPage: 10,
    };
  }

    toggleDialogBox = () => {
      this.setState((prevState) => ({
        open: !prevState.open,
      }));
    }

    toggleRemoveDialogBox = () => {
      this.setState((prevState) => ({
        removeOpen: !prevState.removeOpen,
      }));
    }

    toggleEditDialogBox = () => {
      this.setState((prevState) => ({
        editOpen: !prevState.editOpen,
      }));
    }

    onSubmitHandle = (values) => {
      this.toggleDialogBox();
      console.log(values);
    }

    handleSelectChange = (value) => {
      console.log(value);
    }

    handleSort = (value) => {
      const { orderBy, order } = this.state;
      const isAsc = orderBy === value && order === 'asc';
      const data = isAsc ? 'desc' : 'asc';
      this.setState({
        order: data,
        orderBy: value,
      });
    }

    handleEditDialogOpen = (values) => {
      this.toggleEditDialogBox();
      this.setState({ rowData: values });
    }

     onSubmitEdit=(values) => {
       this.toggleEditDialogBox();
       console.log('Edited Items', values);
     }

      handleRemoveDialogOpen = (values) => {
        this.toggleRemoveDialogBox();
        this.setState({ rowData: values });
      }

      onSubmitDelete=(values) => {
        this.toggleRemoveDialogBox();
        console.log('Deleted Items', values);
      }

    handleChangePage = (event, newPage) => {
      this.setState({ page: newPage });
    };


    render() {
      const {
        open, order, orderBy, page, rowData, rowsPerPage, editOpen, removeOpen,
      } = this.state;
      const { match: { url }, classes } = this.props;
      const getDateFormatted = (date) => moment(date).format('dddd,MMMM Do YYYY, h:mm:ss a');
      const traineeList = (
        <>
          <Box p={1} />
          <div className={classes.button}>
            <Button variant="outlined" color="primary" onClick={this.toggleDialogBox}>
                Add Trainee
            </Button>
          </div>
          <FormDialog open={open} onClose={this.toggleDialogBox} onSubmit={this.toggleDialogBox} />
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
              format: (value) => value && value.toUpperCase(),

            },
            {
              field: 'createdAt',
              label: 'Date',
              align: 'right',
              format: getDateFormatted,
            },
            ]}
            actions={[{
              icons: <EditIcon />,
              handler: this.handleEditDialogOpen,
            },
            {
              icons: <DeleteIcon />,
              handler: this.handleRemoveDialogOpen,

            }]}
            order={order}
            orderBy={orderBy}
            onSort={this.handleSort}
            onSelect={this.handleSelectChange}
            count={100}
            page={page}
            onChangePage={this.handleChangePage}
            rowsPerPage={rowsPerPage}
          />
          <EditDialog
            open={editOpen}
            onClose={this.toggleEditDialogBox}
            onSubmit={this.onSubmitEdit}
            data={rowData}
          />
          <RemoveDialog
            open={removeOpen}
            onClose={this.toggleRemoveDialogBox}
            onSubmit={this.onSubmitDelete}
            data={rowData}
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
      return (traineeList);
    }
}

TraineeList.propTypes = {
  match: propTypes.objectOf(propTypes.any).isRequired,
  classes: propTypes.objectOf(propTypes.any).isRequired,
};

export default withStyles(useStyles, { withTheme: true })(TraineeList);
