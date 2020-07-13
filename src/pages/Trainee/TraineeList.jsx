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
import { Mutation } from 'react-apollo';
import { CREATE_TRAINEE, UPDATE_TRAINEE, DELETE_TRAINEE } from './mutation';
import {
  FormDialog, TableComponent, EditDialog, RemoveDialog,
} from './components';
import { GET_TRAINEE } from './query';
import trainee from './data/trainee';
import { SnackBarConsumer } from '../../contexts';

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

  handleSelectChange = (value) => {
    console.log(value);
  }

  handleEditDialogOpen = (values) => {
    this.toggleEditDialogBox();
    this.setState({ rowData: values });
  }

  onSubmitEdit =(updateTrainee, openSnackBar) => async (editValues) => {
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


    render = () => {
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
      const variables = { skip: page * rowsPerPage, limit: rowsPerPage };
      const getDateFormatted = (date) => moment(date).format('dddd,MMMM Do YYYY, h:mm:ss a');
      const traineeList = (
        <>
          <SnackBarConsumer>
            {({ openSnackBar }) => (
              <Mutation
                mutation={DELETE_TRAINEE}
                refetchQueries={[{ query: GET_TRAINEE, variables }]}
                onError={() => {}}
              >
                {(deleteTrainee, { loading: removeLoader }) => (
                  <>
                    <Mutation
                      mutation={UPDATE_TRAINEE}
                      refetchQueries={() => [{ query: GET_TRAINEE, variables }]}
                      onError={() => {}}
                    >
                      {
                        (updateTrainee, { loading: updateLoader }) => (
                          <>
                            <Mutation
                              mutation={CREATE_TRAINEE}
                              refetchQueries={[{ query: GET_TRAINEE, variables }]}
                              onError={() => {}}
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
                                    open={showAddOpen}
                                    onClose={this.toggleDialogBox}
                                    onSubmit={this.onSubmitAdd(createTrainee, openSnackBar)}
                                    loading={createLoader}
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
                                    onSubmit={this.onSubmitEdit(updateTrainee, openSnackBar)}
                                    data={rowData}
                                    loading={updateLoader}
                                  />
                                  <RemoveDialog
                                    open={showRemoveOpen}
                                    onClose={this.toggleRemoveDialogBox}
                                    onSubmit={this.onSubmitDelete(deleteTrainee, openSnackBar)}
                                    data={rowData}
                                    loading={removeLoader}
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
                              )}
                            </Mutation>
                          </>
                        )
                      }
                    </Mutation>
                  </>
                )}
              </Mutation>
            )}
          </SnackBarConsumer>
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
