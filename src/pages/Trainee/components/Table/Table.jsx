import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
    border: 'solid',
    borderWidth:'thin',
    borderColor:'lightGrey'
  },
  color: {
    color: 'grey',
  },
}));

const TableComponent = (props) => {
  const classes = useStyles();

  const { id, data, column } = props;

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow key={id}>
            {column.length && column.map((col) => (
              <TableCell align={col.align} className={classes.color}>{col.label}</TableCell>
            ))}

          </TableRow>
        </TableHead>
        <TableBody>
          {data.length && data.map((element) => (
            <TableRow key={element[id]}>
              {column.map(({ field, align }) => (

                <TableCell align={align}>{element[field]}</TableCell>

              ))}
            </TableRow>

          ))}

        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;

TableComponent.propTypes = {
  id: propTypes.string.isRequired,
  data: propTypes.arrayOf(propTypes.object).isRequired,
  column: propTypes.arrayOf(propTypes.object).isRequired,
};
