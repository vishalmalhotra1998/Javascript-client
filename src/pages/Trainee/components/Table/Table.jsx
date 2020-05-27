import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableSortLabel from '@material-ui/core/TableSortLabel';
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
    borderWidth: 'thin',
    borderColor: 'lightGrey',
  },
  color: {
    color: 'red',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
//   tableCell: {
//     color: 'red',
//   },

}));

const TableComponent = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const {
    id, data, column, order, orderBy, onSort, onSelect,
  } = props;
  const handleSortIcon = () => {
    setOpen(true);
  };

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow key={id}>
            {column.length && column.map((col) => (
              <TableCell align={col.align} className={classes.color}>
                <TableSortLabel
                  
                 
                  className={classes.tableCell}
                  active={orderBy === col.field}
                  direction={orderBy === col.field ? order : 'asc'}
                  onClick={() => onSort(col.field)}
                  hideSortIcon={open}
                >
                  {col.label}
                  {orderBy === col.field ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}

          </TableRow>
        </TableHead>
        <TableBody>
          {data.length && data.map((element) => (
            <TableRow hover key={element[id]}>
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
