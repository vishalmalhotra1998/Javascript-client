import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import propTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { flowRight as Compose } from 'lodash';
import { graphql } from '@apollo/react-hoc';
import { Mutation } from 'react-apollo';
import { tableColumns } from './data/tableData';
import { CREATE_TRAINEE, UPDATE_TRAINEE, DELETE_TRAINEE } from './mutation';
import { TRAINEE_UPDATED, TRAINEE_DELETED } from './subscriptions';
import {
  FormDialog, TableComponent, EditDialog, RemoveDialog,
} from './components';
import { GET_TRAINEE } from './query';
import { withSnackBarConsumer } from '../../components';

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
      createDailogOpen: false,
      order: 'asc',
      orderBy: '',
      page: 0,
      editDailogOpen: false,
      removeDialogOpen: false,
      rowData: {},
      rowsPerPage: 10,
    };
  }


    toggleDialogBox = () => {
      this.setState((prevState) => ({
        createDailogOpen: !prevState.createDailogOpen,
      }));
    }

    toggleRemoveDialogBox = () => {
      this.setState((prevState) => ({
        removeDialogOpen: !prevState.removeDialogOpen,
      }));
    }

    toggleEditDialogBox = () => {
      this.setState((prevState) => ({
        editDailogOpen: !prevState.editDailogOpen,
      }));
    }


    onSubmitAdd = (createTrainee, openSnackBar) => async (values) => {
      const snackBarMessages = {
        success: 'Trainee Added Successfully',
        error: 'There is an Error!',
      };
      const { name, email, password } = values;
      const response = await createTrainee({ variables: { name, email, password } });
      const status = response ? 'success' : 'error';
      openSnackBar(snackBarMessages[status], status);
      this.toggleDialogBox();
    };

    // only for debug purpose
    // handleSelectChange = (value) => {
    //   console.log(value);
    // }
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

    onSubmitEdit = (updateTrainee, openSnackBar) => async (editValues) => {
      const snackBarMessages = {
        success: 'Trainee Updated Successfully',
        error: 'Error in Updating the field',
      };
      const { name, email, id } = editValues;
      const response = await updateTrainee(
        { variables: { id, name, email } },
      );
      const status = response ? 'success' : 'error';
      const snackBarMessage = snackBarMessages[status];
      openSnackBar(snackBarMessage, status);
      this.toggleEditDialogBox();
    }

    handleRemoveDialogOpen = (values) => {
      this.toggleRemoveDialogBox();
      this.setState({ rowData: values });
    }

    onSubmitDelete = (deleteTrainee, openSnackBar) => async (removeValues) => {
      const snackBarMessages = {
        success: 'Trainee Deleted Successfully',
        error: 'Error While Deleting!',
      };
      const { page, rowsPerPage } = this.state;
      const {
        data: {
          getAllTrainee: {
            count = 0,
          } = {},
          refetch,
        },
      } = this.props;
      const { originalId } = removeValues;
      const response = await deleteTrainee({ variables: { id: originalId } });
      if (count - page * rowsPerPage === 1 && page > 0 && response) {
        this.setState({ page: page - 1 }, () => {
          const { page: updatedPage } = this.state;
          refetch({ skip: updatedPage, limit: rowsPerPage });
        });
      }
      const status = response ? 'success' : 'error';
      const snackBarMessage = snackBarMessages[status];
      openSnackBar(snackBarMessage, status);
      this.toggleRemoveDialogBox();
    }

    handleChangePage = (refetch) => (event, newPage) => {
      const {
        rowsPerPage,
      } = this.state;
      this.setState({ page: newPage }, () => {
        const { page } = this.state;
        refetch({ skip: page * rowsPerPage, limit: rowsPerPage });
      });
    };

    componentDidMount = () => {
      const { data: { subscribeToMore } } = this.props;
      subscribeToMore({
        document: TRAINEE_UPDATED,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData) return prev;
          const { getAllTrainee: { records } } = prev;
          const { data: { traineeUpdated } = {} } = subscriptionData || {};
          const findRecord = (record) => record.originalId === traineeUpdated.originalId;
          const updatedRecordIndex = records.findIndex(findRecord);
          const updatedRecord = { ...records[updatedRecordIndex], ...traineeUpdated };
          records.splice(updatedRecordIndex, 1, updatedRecord);
          return {
            getAllTrainee: {
              ...prev.getAllTrainee,
              count: prev.getAllTrainee.count,
              records,
            },
          };
        },
      });

      subscribeToMore({
        document: TRAINEE_DELETED,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData) return prev;
          const { getAllTrainee: { records } } = prev;
          const { data: { traineeDeleted } = {} } = subscriptionData || {};
          const delRecords = records.filter((record) => record.originalId !== traineeDeleted);
          return {
            getAllTrainee: {
              ...prev.getAllTrainee,
              count: prev.getAllTrainee.count - 1,
              records: delRecords,
            },
          };
        },
      });
    }

    render = () => {
      const {
        createDailogOpen, order, orderBy, page, rowData, rowsPerPage,
        editDailogOpen, removeDialogOpen,
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
        classes,
        openSnackBar,
      } = this.props;
      const variables = { skip: page * rowsPerPage, limit: rowsPerPage };
      const traineeList = (
        <>
          <>
            <Mutation
              mutation={CREATE_TRAINEE}
              refetchQueries={[{ query: GET_TRAINEE, variables }]}
              onError={() => { }}
            >
              {(createTrainee, { loading: createLoader }) => (
                <>
                  <Box p={1} />
                  <div className={classes.button}>
                    <Button variant="outlined" color="primary" onClick={this.toggleDialogBox}>
                                                Add Trainee
                    </Button>
                  </div>
                  <FormDialog
                    open={createDailogOpen}
                    onClose={this.toggleDialogBox}
                    onSubmit={this.onSubmitAdd(createTrainee, openSnackBar)}
                    loading={createLoader}
                  />
                  <Box p={1} />
                  <TableComponent
                    id="originalId"
                    data={records}
                    column={tableColumns}
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
                </>
              )}
            </Mutation>
          </>
          <>
            <Mutation
              mutation={UPDATE_TRAINEE}
              onError={() => { }}
            >
              {
                (updateTrainee, { loading: updateLoader }) => (
                  <EditDialog
                    open={editDailogOpen}
                    onClose={this.toggleEditDialogBox}
                    onSubmit={this.onSubmitEdit(updateTrainee, openSnackBar)}
                    data={rowData}
                    loading={updateLoader}
                  />
                )
              }
            </Mutation>
          </>
          <>
            <Mutation
              mutation={DELETE_TRAINEE}
              onError={() => { }}
            >
              {(deleteTrainee, { loading: removeLoader }) => (
                <>
                  <RemoveDialog
                    open={removeDialogOpen}
                    onClose={this.toggleRemoveDialogBox}
                    onSubmit={this.onSubmitDelete(deleteTrainee, openSnackBar)}
                    data={rowData}
                    loading={removeLoader}
                  />
                </>
              )}
            </Mutation>
          </>
        </>
      );
      return (traineeList);
    }
}

TraineeList.propTypes = {
  classes: propTypes.objectOf(propTypes.any).isRequired,
  data: propTypes.objectOf(propTypes.any).isRequired,
  openSnackBar: propTypes.func.isRequired,
};

export default Compose(withStyles(useStyles, { withTheme: true }),
  withSnackBarConsumer,
  graphql(GET_TRAINEE, {
    options: { variables: { skip: 0, limit: 10 } },
  }))(TraineeList);
