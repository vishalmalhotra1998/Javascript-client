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
import { Mutation } from '@apollo/react-components';
import { CREATE_TRAINEE, UPDATE_TRAINEE, DELETE_TRAINEE } from './mutation';
import {
  FormDialog, TableComponent, EditDialog, RemoveDialog,
} from './components';
import { GET_TRAINEE } from './query';
import trainee from './data/trainee';
import callApi from '../../libs/utils/api';
import { MyContext } from '../../contexts';

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
      rowsPerPage: 20,
    };
  }

    handleClickOpen = () => {
      this.setState({ open: true });
    };

    handleClose = () => {
      this.setState({ open: false, editOpen: false, remOpen: false });
    };

    onSubmitHandle = (createTrainee, openSnackBar) => async (values) => {
      this.setState({ open: false, editOpen: false });
      const { name, email, password } = values;
      const response = await createTrainee({ variables: { name, email, password } });
      const { data } = response;
      const { createTrainee: resData } = data;
      return resData ? openSnackBar('Succesfully Added', 'success') : openSnackBar('There is An Error!', 'error');
    }

    handleOnSubmitDelete = (deleteTrainee, openSnackBar) => async (values) => {
      this.setState({ open: false, remOpen: false });
      const { originalId } = values;
      const { page, rowsPerPage } = this.state;
      const {
        data: {
          getAllTrainee: {
            records = [],
            count = 0,
          } = {},
        },
      } = this.props;
      if (count - page * rowsPerPage === 1) {
        this.setState({ page: page - 1 });
      }
      const response = await deleteTrainee({ variables: { id: originalId } });
      return response ? openSnackBar('Successful deleted', 'success') : openSnackBar('There is an Error!', 'error');
    }

    onSubmitEditHandle = (updateTrainee, openSnackBar) => async (values) => {
      const { name, email, originalId } = values;
      const response = await updateTrainee(
        { variables: { id: originalId, name, email } },
      );
      return response ? (openSnackBar('Successfull Updated', 'success')) : (openSnackBar('There is an Error!', 'error'));
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

    handleChangePage = (refetch) => (event, newPage) => {
      const { rowsPerPage } = this.state;
      refetch({ skip: newPage * rowsPerPage, limit: rowsPerPage });
      this.setState({ page: newPage });
    }

    handleTableData = (data, url, method) => {
      callApi(data, url, method).then((response) => {
        const { records, count } = response.data;
        this.setState({
          tableData: records,
          loader: false,
          tableDataLength: records.length,
          count,
        });
      });
    }

    componentDidMount = () => {
      console.log('---------Component Did Mount-----------');
    }

    render() {
      const {
        open, order, orderBy, page, editOpen, rowData, remOpen, rowsPerPage,
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
      const contextValue = this.context;
      const { openSnackBar } = contextValue;
      const variables = { skip: page * rowsPerPage, limit: rowsPerPage };
      const getDateFormatted = (date) => moment(date).format('dddd,MMMM Do YYYY, h:mm:ss a');
      return (
        <>
          <Mutation mutation={DELETE_TRAINEE} refetchQueries={[{ query: GET_TRAINEE, variables }]}>
            {(deleteTrainee) => (
              <>
                <Mutation mutation={UPDATE_TRAINEE}>
                  {
                    (updateTrainee) => (
                      <>
                        <Mutation
                          mutation={CREATE_TRAINEE}
                          refetchQueries={[{ query: GET_TRAINEE, variables }]}
                        >
                          {(createTrainee) => (
                            <>
                              <Box p={1} />
                              <div className={classes.button}>
                                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                                                                Add Trainee
                                </Button>
                              </div>
                              <FormDialog
                                open={open}
                                onClose={this.handleClose}
                                onSubmit={this.onSubmitHandle(createTrainee, openSnackBar)}
                              />
                              <Box p={1} />
                              <TableComponent

                                id="id"

                                data={records}

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
                                count={count}
                                page={page}
                                onChangePage={this.handleChangePage(refetch)}
                                rowsPerPage={rowsPerPage}
                                loader={loading}
                                dataLength={records.length}
                              />
                              <EditDialog
                                open={editOpen}
                                onClose={this.handleClose}
                                onSubmit={this.onSubmitEditHandle(updateTrainee, openSnackBar)}
                                data={rowData}
                              />
                              <RemoveDialog
                                open={remOpen}
                                onClose={this.handleClose}
                                onSubmit={this.handleOnSubmitDelete(deleteTrainee, openSnackBar)}
                                data={rowData}
                              />
                              <Box p={1} />
                              <ul>
                                {trainee.length && trainee.map((traineeData) => (
                                  <Fragment key={traineeData.id}>
                                    <li>
                                      <Link to={`${url}/${traineeData.id}`}>{traineeData.name}</Link>
                                    </li>
                                  </Fragment>
                                ))}
                              </ul>

                            </>
                          )}

                        </Mutation>
                      </>
                    )
                  }

                </Mutation>
              </>
            )}
          </Mutation>

        </>
      );
    }
}


TraineeList.propTypes = {
  match: propTypes.objectOf(propTypes.any).isRequired,
  classes: propTypes.objectOf(propTypes.any).isRequired,
  data: propTypes.objectOf(propTypes.any).isRequired,
};
TraineeList.contextType = MyContext;

export default Compose(withStyles(useStyles, { withTheme: true }),
  graphql(GET_TRAINEE, {
    options: { variables: { skip: 0, limit: 20 } },
  }))(TraineeList);
