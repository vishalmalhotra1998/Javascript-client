import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import * as moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import trainee from './data/trainee';
import NoMatch from '../NoMatch/index';


const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  cover: {
    width: 151,
  },
  wrapper: {
    textAlign: 'center',
  },
  button: {
    position: 'absolute',
    backgroundColor: 'lightGrey',
  },
});

const getDateFormatted = (date) => moment(date).format('dddd,MMMM Do YYYY, h:mm:ss a');

const TraineeDetails = () => {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  let matchedUser;
  if (trainee.length) {
    trainee.forEach((data) => {
      if (data.id === id) {
        matchedUser = data;
      }
    });
  }
  return (
    <>
      { Object.keys(matchedUser).length
        ? (
          <Card className={classes.root}>
            <CardMedia
              className={classes.cover}
              image="/images/thumbnail.png"
            />
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  {matchedUser.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {getDateFormatted(matchedUser.createdAt)}
                </Typography>
                <Typography variant="subtitle1">
                  {matchedUser.email}
                </Typography>
              </CardContent>
            </div>
          </Card>
        ) : <NoMatch />}
      <Box p={1} />
      <div className={classes.wrapper}>
        <Button className={classes.button} onClick={history.goBack}>Back</Button>
      </div>
    </>
  );
};
export default TraineeDetails;
