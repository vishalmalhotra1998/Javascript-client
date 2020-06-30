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
import callApi from '../../libs/utils/api';

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
      showAddOpen: false,
      order: 'asc',
      orderBy: '',
      page: 0,
      showEditOpen: false,
      showRemoveOpen: false,
      rowData: {},
      rowsPerPage: 20,
      tableData: [],
      count: 0,
      loader: true,
    };
  }


    toggleDialogBox = () => {
      this.setState((prevState) => ({
        showAddOpen: !prevState.showAddOpen,
      }));
    }

    toggleRemoveDialogBox = () => {
      this.setState((prevState) => ({
        showRemoveOpen: !prevState.showRemoveOpen,
      }));
    }

    toggleEditDialogBox = () => {
      this.setState((prevState) => ({
        showEditOpen: !prevState.showEditOpen,
      }));
    }

    toggleLoader=() => {
      this.setState((prevState) => ({
        loader: !prevState.loader,
      }));
    }

    onSubmitAdd = (values) => {
      this.toggleDialogBox();
      this.toggleLoader();
      const { page, rowsPerPage } = this.state;
      const apiData = {
        params: { skip: page * rowsPerPage, limit: rowsPerPage },
        headers: { Authorization: localStorage.getItem('token') },
      };
      const url = '/trainee';
      const method = 'get';
      this.handleTableData(apiData, url, method);
      console.log(values);

    };

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
      const {
        rowsPerPage,
      } = this.state;

      this.setState({ page: newPage }, () => {
        const { page } = this.state;
        const apiData = {
          params: { skip: page * rowsPerPage, limit: rowsPerPage },
          headers: { Authorization: localStorage.getItem('token') },
        };
        const url = '/trainee';
        const method = 'get';
        this.handleTableData(apiData, url, method);
        this.toggleLoader();
      });
    };

  handleTableData = (data, url, method) => {
    callApi(data, url, method).then((response) => {
      const { data: { records = [], count = 0 } } = response;
      this.setState({
        tableData: records,
        count,
      });
      this.toggleLoader();
    });
  }

componentDidMount =() => {
  console.log('---------Component Did Mount-----------');
  const apiData = { params: { skip: 0, limit: 20 }, headers: { Authorization: localStorage.getItem('token') } };
  const url = '/trainee';
  const method = 'get';
  callApi(apiData, url, method).then((response) => {
    const { data: { records = [], count = 0 } } = response;
    this.toggleLoader();
    this.setState({
      tableData: records,
      count,
    });
  });
}

render() {
  const {
    showAddOpen, order, orderBy, page, rowData, rowsPerPage, showEditOpen, showRemoveOpen,
    tableData, loader, count,
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
      <FormDialog
        open={showAddOpen}
        onClose={this.toggleDialogBox}
        onSubmit={this.onSubmitAdd}
      />
      <Box p={1} />
      <TableComponent
        id="_id"
        data={tableData}
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
          key: 'editIcon',
        },
        {
          icons: <DeleteIcon />,
          handler: this.handleRemoveDialogOpen,
          key: 'removeIcon',

        }]}
        order={order}
        orderBy={orderBy}
        onSort={this.handleSort}
        onSelect={this.handleSelectChange}
        count={count}
        page={page}
        onChangePage={this.handleChangePage}
        rowsPerPage={rowsPerPage}
        loader={loader}
      />
      <EditDialog
        open={showEditOpen}
        onClose={this.toggleEditDialogBox}
        onSubmit={this.onSubmitEdit}
        data={rowData}
      />
      <RemoveDialog
        open={showRemoveOpen}
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
