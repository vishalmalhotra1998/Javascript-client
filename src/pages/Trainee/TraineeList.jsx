import React, { Fragment } from 'react';
import propTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import { FormDialog } from './components';
import trainee from './data/trainee';

class TraineeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
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

    render() {
      const { open } = this.state;
      const { match: { url } } = this.props;

      const traineeList = (
        <>
          <Box p={1} />
          <Button variant="outlined" color="primary" onClick={this.toggleDialogBox}>
                Add Trainee
          </Button>
          <FormDialog open={open} onClose={this.toggleDialogBox} onSubmit={this.toggleDialogBox} />
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
};

export default TraineeList;
