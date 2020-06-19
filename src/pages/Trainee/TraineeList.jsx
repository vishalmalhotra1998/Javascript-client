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
import { TRAINEE_UPDATED, TRAINEE_DELETED } from './subscriptions';
import {
  FormDialog, TableComponent, EditDialog, RemoveDialog,
} from './components';
import { GET_TRAINEE } from './query';
import trainee from './data/trainee';
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

    onSubmitHandle = (createTrainee) => async (values) => {
      const { name, email, password } = values;
      const response = await createTrainee({ variables: { name, email, password } });
      const { data } = response;
      const { createTrainee: resData } = data;
      this.setState({ open: false });
      if (data) {
        this.handleSnackBar('Successfully Deleted', 'success');
      } else {
        this.handleSnackBar('There is an Error!', 'error');
      }
      this.setState({ open: false });
      return resData;
    }

    handleOnSubmitDelete = (deleteTrainee) => async (values) => {
      const { originalId } = values;
      const { page, rowsPerPage } = this.state;
      const {
        data: {
          getAllTrainee: {
            count = 0,
          } = {},
          refetch,
        },
      } = this.props;
      const response = await deleteTrainee({ variables: { id: originalId } });
      if (count - page * rowsPerPage === 1 && page > 0) {
        this.setState({ page: page - 1 }, () => {
          const { page: updatePage } = this.state;
          refetch({ skip: updatePage, limit: rowsPerPage });
        });
      }
      this.setState({ remOpen: false });
      if (response) {
        this.handleSnackBar('Successfully Deleted', 'success');
      } else {
        this.handleSnackBar('There is an Error!', 'error');
      }
      return response;
    }

    handleSnackBar = (message, status) => {
      const contextValue = this.context;
      const { openSnackBar } = contextValue;
      return openSnackBar(message, status);
    }

    onSubmitEditHandle = (updateTrainee) => async (values) => {
      const { name, email, originalId } = values;
      const response = await updateTrainee(
        { variables: { id: originalId, name, email } },
      );
      if (response) {
        this.handleSnackBar('Successfully Updated', 'success');
      } else {
        this.handleSnackBar('There is an Error!', 'error');
      }
      this.setState({ editOpen: false });
      return response;
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

    componentDidMount = () => {
      console.log('---------Component Did Mount-----------');
      const { data: { subscribeToMore } } = this.props;
      subscribeToMore({
        document: TRAINEE_UPDATED,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData) return prev;
          const { getAllTrainee: { records } } = prev;
          const { data: { traineeUpdated } } = subscriptionData;
          const updateRecords = [...records].map((record) => {
            if (record.originalId === traineeUpdated.originalId) {
              return {
                ...record,
                ...traineeUpdated,
              };
            }
            return record;
          });
          return {
            getAllTrainee: {
              ...prev.getAllTrainee,
              count: prev.getAllTrainee.count,
              records: updateRecords,
            },
          };
        },
      });

      subscribeToMore({
        document: TRAINEE_DELETED,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData) return prev;
          const { getAllTrainee: { records } } = prev;
          const { data: { traineeDeleted } } = subscriptionData;
          const delRecords = [...records].filter((record) => record.originalId !== traineeDeleted);
          return {
            getAllTrainee: {
              ...prev.getAllTrainee,
              count: prev.getAllTrainee.count,
              records: delRecords,
            },
          };
        },
      });
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

      const variables = { skip: page * rowsPerPage, limit: rowsPerPage };
      const getDateFormatted = (date) => moment(date).format('dddd,MMMM Do YYYY, h:mm:ss a');
      return (
        <>
          <Mutation
            mutation={DELETE_TRAINEE}
          >
            {(deleteTrainee) => (
              <>
                <Mutation
                  mutation={UPDATE_TRAINEE}
                >
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
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  onClick={this.handleClickOpen}
                                >
                                                                Add Trainee
                                </Button>
                              </div>
                              <FormDialog
                                open={open}
                                onClose={this.handleClose}
                                onSubmit={this.onSubmitHandle(createTrainee)}
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
                                onSubmit={this.onSubmitEditHandle(updateTrainee)}
                                data={rowData}
                              />
                              <RemoveDialog
                                open={remOpen}
                                onClose={this.handleClose}
                                onSubmit={this.handleOnSubmitDelete(deleteTrainee)}
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
