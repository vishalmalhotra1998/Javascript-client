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
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
    border: 'solid',
    borderWidth: 'thin',
    borderColor: 'lightGrey',
  },
  color: {
    color: 'grey',
  },
}));

const TableComponent = (props) => {
  const classes = useStyles();
  const { id, data, column } = props;

  const tableHeading = (
    <TableRow key={id}>
      {column.map((col) => (
        <TableCell
          key={col.label}
          align={col.align}
          className={classes.color}
        >
          {col.label}
        </TableCell>
      ))}
    </TableRow>
  );

  const tableBody = data.map((element) => (
    <TableRow key={element[id]}>
      {column.map(({ field, align }) => (

        <TableCell key={field} align={align}>{element[field]}</TableCell>

      ))}
    </TableRow>

  ));
  return (
    <Box p={2}>
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            {tableHeading}
          </TableHead>
          <TableBody>
            {tableBody}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};


TableComponent.propTypes = {
  id: propTypes.string.isRequired,
  data: propTypes.arrayOf(propTypes.object),
  column: propTypes.arrayOf(propTypes.object),
};
TableComponent.defaultProps = {
  data: [],
  column: [],
};

export default TableComponent;
