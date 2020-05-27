import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

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

}));

const TableComponent = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const {
    id, data, column, order, orderBy, onSort, onSelect,
  } = props;
  const handleSortIcon = (e) => {
    e.target.style.color = 'black';
    setOpen(true);
  };
  const handleColorChange = (e) => {
    e.target.style.color = 'grey';
  };

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow key={id}>
            {column.length && column.map((col) => (
              <TableCell
                align={col.align}
                className={classes.color}
              >
                <TableSortLabel
                  onMouseEnter={handleSortIcon}
                  onMouseLeave={handleColorChange}
                  onBlur={handleColorChange}
                  active={orderBy === col.field}
                  direction={orderBy === col.field ? order : 'asc'}
                  onClick={() => onSort(col.field)}
                  hideSortIcon={open}
                >
                  <>
                    {col.label}
                    {orderBy === col.field ? (
                      <span className={classes.visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </span>
                    ) : null}
                  </>
                </TableSortLabel>
              </TableCell>
            ))}

          </TableRow>
        </TableHead>
        <TableBody>
          {data.length && data.map((element) => (
            <StyledTableRow hover onMouseEnter={() => onSelect(element)} key={element[id]}>
              {column.map(({ field, align, format }) => (

                <StyledTableCell align={align}>
                  {format ? format(element[field]) : element[field]}
                </StyledTableCell>

              ))}
            </StyledTableRow>

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
  order: propTypes.oneOf(['asc', 'desc']),
  orderBy: propTypes.string,
  onSort: propTypes.func.isRequired,
  onSelect: propTypes.func.isRequired,
};
TableComponent.defaultProps = {
  order: 'asc',
  orderBy: '',
};
