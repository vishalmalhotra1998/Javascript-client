import React from 'react';
import propTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { StyledTableRow, useStyles } from './Style';

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

  const tableHeading = (
    <TableRow key={id}>
      {column.map((col) => (
        <TableCell
          key={col.label}
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
  );

  const tableBody = data.map((element) => (
    <StyledTableRow
      hover
      className={classes.style}
      onClick={() => onSelect(element)}
      key={element[id]}
    >
      {column.map(({ field, align, format }) => (

        <TableCell key={field} align={align}>
          {format ? format(element[field]) : element[field]}
        </TableCell>

      ))}
    </StyledTableRow>

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
  order: propTypes.oneOf(['asc', 'desc']),
  orderBy: propTypes.string,
  onSort: propTypes.func.isRequired,
  onSelect: propTypes.func.isRequired,
};
TableComponent.defaultProps = {
  data: [],
  column: [],
  order: 'asc',
  orderBy: '',
};

export default TableComponent;
