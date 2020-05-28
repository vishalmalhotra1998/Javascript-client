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
      orderBy: 'Date',
      page: 0,
      editOpen: false,
      remOpen: false,
      rowData: {},
      rowsPerPage: 10,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, editOpen: false, remOpen: false });
  };

  onSubmitHandle = (values) => {
    this.setState({ open: false, editOpen: false });
    console.log(values);
  }

  handleOnSubmitDelete=(values) => {
    this.setState({ open: false, remOpen: false });
    console.log('Deleted Items', values);
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

  handleSelectChange = (value) => {
    console.log(value);
  }

  handleEditDialogOpen = (values) => {
    this.setState({ editOpen: true, rowData: values });
  }

  handleRemoveDialogOpen = (values) => {
    this.setState({ remOpen: true, rowData: values });
  }

handleChangePage = (event, newPage) => {
  this.setState({ page: newPage });
};


render() {
  const {
    open, order, orderBy, page, editOpen, rowData, remOpen, rowsPerPage,
  } = this.state;
  const { match: { url }, classes } = this.props;
  const getDateFormatted = (date) => moment(date).format('dddd,MMMM Do YYYY, h:mm:ss a');
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
        }]}

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
        onClose={this.handleClose}
        onSubmit={this.onSubmitHandle}
        data={rowData}
      />
      <RemoveDialog
        open={remOpen}
        onClose={this.handleClose}
        onSubmit={this.handleOnSubmitDelete}
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
}
}
export default withStyles(useStyles, { withTheme: true })(TraineeList);

TraineeList.propTypes = {
  match: propTypes.objectOf(propTypes.any).isRequired,
  classes: propTypes.objectOf(propTypes.any).isRequired,
};
