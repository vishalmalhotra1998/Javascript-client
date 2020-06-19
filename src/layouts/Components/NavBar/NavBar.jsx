import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  textSize:
    {
      fontSize: '1rem',
    },
  padding: {
    marginRight: 30,
  },
});

const NavBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
                        Trainee Portal
          </Typography>
          <Typography>
            <Button className={classes.textSize} component={Link} to="/Trainee" size="small" color="inherit">Trainee</Button>
            <Button className={classes.textSize} component={Link} to="/TextFieldDemo" size="small" color="inherit">TextField Demo</Button>
            <Button className={classes.textSize} component={Link} to="/InputDemo" size="small" color="inherit">Input Demo</Button>
            <Button className={`${classes.textSize} ${classes.padding}`} component={Link} to="/ChildrenDemo" size="small" color="inherit">Children Demo</Button>
            <Button className={classes.textSize} size="small" color="inherit">Logout</Button>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
