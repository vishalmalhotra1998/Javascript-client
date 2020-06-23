import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import propTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import { FormDialog, TableComponent } from './components';
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
    };
  }

    toggleDialogBox = () => {
      this.setState((prevState) => ({
        open: !prevState.open,
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

    render() {
      const { open, order, orderBy } = this.state;
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
            order={order}
            orderBy={orderBy}
            onSort={this.handleSort}
            onSelect={this.handleSelectChange}
          />
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
