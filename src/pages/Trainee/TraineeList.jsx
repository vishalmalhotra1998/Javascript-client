import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import propTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { flowRight as Compose } from 'lodash';
import { graphql } from '@apollo/react-hoc';
import {
  FormDialog, TableComponent, EditDialog, RemoveDialog,
} from './components';
import { GET_TRAINEE } from './query';
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
      rowsPerPage: 10,
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

    onSubmitAdd = async (values, openSnackBar) => {
      const { page, rowsPerPage } = this.state;
      let apiData = { data: { ...values } };
      let url = '/trainee';
      let method = 'post';
      const responseData = await callApi(apiData, url, method);
      const { message, data } = responseData;
      if (data) openSnackBar(message, 'success');
      apiData = {
        params: { skip: page * rowsPerPage, limit: rowsPerPage },
      };
      url = '/trainee';
      method = 'get';
      this.toggleDialogBox();
      this.toggleLoader();
      this.handleTableData(apiData, url, method);
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

     onSubmitEdit= async (editValues, openSnackBar) => {
       const snackBarMessages = {
         success: 'Trainee Updated Successfully',
         error: 'Error in Updating the field',
       };
       let apiData = { data: { ...editValues } };
       let url = '/trainee';
       let method = 'put';
       const responseData = await callApi(apiData, url, method);
       const { data } = responseData;
       const status = data ? 'success' : 'error';
       const snackBarMessage = snackBarMessages[status];
       openSnackBar(snackBarMessage, status);
       const { page, rowsPerPage } = this.state;
       apiData = { params: { skip: page * rowsPerPage, limit: rowsPerPage } };
       url = '/trainee';
       method = 'get';
       this.toggleEditDialogBox();
       this.toggleLoader();
       this.handleTableData(apiData, url, method);
     }

      handleRemoveDialogOpen = (values) => {
        this.toggleRemoveDialogBox();
        this.setState({ rowData: values });
      }

      onSubmitDelete = async (removeValues, openSnackBar) => {
        const snackBarMessages = {
          success: 'Trainee Succesfully Deleted',
          error: 'Error While deleted !',
        };
        const { id } = removeValues;
        let apiData = '';
        let url = `/trainee/${id}`;
        let method = 'delete';
        const responseData = await callApi(apiData, url, method);
        const { data } = responseData;
        const status = data ? 'success' : 'error';
        const snackBarMessage = snackBarMessages[status];
        openSnackBar(snackBarMessage, status);
        const { page, rowsPerPage, count } = this.state;
        const totalRowsInPage = count - (page * rowsPerPage);
        url = '/trainee';
        method = 'get';
        if (totalRowsInPage === 1 && page > 0) {
          this.setState({ page: page - 1 }, () => {
            const { page: newPage } = this.state;
            apiData = { params: { skip: newPage * rowsPerPage, limit: rowsPerPage } };
            this.handleTableData(apiData, url, method);
          });
          this.toggleRemoveDialogBox();
          this.toggleLoader();
          return true;
        }
        apiData = { params: { skip: page * rowsPerPage, limit: rowsPerPage } };
        this.handleTableData(apiData, url, method);
        this.toggleRemoveDialogBox();
        this.toggleLoader();
        return true;
      }

    handleChangePage =(refetch) => (event, newPage) => {
      const {
        rowsPerPage,
      } = this.state;
      this.setState({ page: newPage }, () => {
        const { page } = this.state;
        refetch({ skip: page * rowsPerPage, limit: rowsPerPage });
      });
    };

  handleTableData = async (data, url, method) => {
    const responseData = await callApi(data, url, method);
    const { data: { records = [], count = 0 } } = responseData;
    this.setState({
      tableData: records,
      count,
    });
    this.toggleLoader();
  }


  render() {
    const {
      showAddOpen, order, orderBy, page, rowData, rowsPerPage, showEditOpen, showRemoveOpen,
    } = this.state;
    const {
      data: {
        getAllTrainee: {
          records = [],
          count = 0,
        } = {},
        loading,
        refetch,
      },
      match: { url }, classes,
    } = this.props;
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
          id="originalId"
          data={records}
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
          onChangePage={this.handleChangePage(refetch)}
          rowsPerPage={rowsPerPage}
          loader={loading}
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
  data: propTypes.objectOf(propTypes.any).isRequired,
};

export default Compose(withStyles(useStyles, { withTheme: true }),
  graphql(GET_TRAINEE, {
    options: { variables: { skip: 0, limit: 10 } },
  }))(TraineeList);
