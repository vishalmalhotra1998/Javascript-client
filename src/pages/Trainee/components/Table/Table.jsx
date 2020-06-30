import React from 'react';
import propTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { StyledTableRow, useStyles } from './Style';
import { withLoaderAndMessage } from '../../../../components';

const TableComponent = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const {
    id, data, column, order, orderBy, onSort, onSelect, actions,
    count, page, onChangePage, rowsPerPage, loader, dataLength,
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
      <TableCell />
    </TableRow>
  );

  const tableBody = dataLength ? data.map((element) => (
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
      {
        <TableCell>
          <div className={classes.buttonSetup}>
            {
              actions.map((
                { icons, handler, key },
              ) => (
                <div key={key}>
                  <Button
                    className={classes.background}
                    onClick={() => { handler(element); }}
                  >
                    {icons}
                  </Button>
                </div>
              ))
            }
          </div>
        </TableCell>
      }

    </StyledTableRow>

  )) : (
    (
      <>
        <Box paddingLeft={72}>
          <h2>Oops No more Trainees</h2>
        </Box>
      </>
    )
  );

  const tablePagination = count && (
    <TablePagination
      component="div"
      count={count}
      page={page}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[]}
      onChangePage={onChangePage}
    />
  );

  const tableWithLoaderAndBody = loader ? (
    <Box pl={72}>
      <CircularProgress />
    </Box>
  ) : (tableBody);
  return (
    <Box p={2}>
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            {tableHeading}
          </TableHead>
          <TableBody>
            {tableWithLoaderAndBody}
          </TableBody>
        </Table>
      </TableContainer>
      {tablePagination}
    </Box>
  );
};

TableComponent.propTypes = {
  id: propTypes.string.isRequired,
  data: propTypes.arrayOf(propTypes.object),
  column: propTypes.arrayOf(propTypes.object),
  actions: propTypes.arrayOf(propTypes.object).isRequired,
  order: propTypes.oneOf(['asc', 'desc']),
  orderBy: propTypes.string,
  onSort: propTypes.func.isRequired,
  onSelect: propTypes.func.isRequired,
  count: propTypes.number.isRequired,
  page: propTypes.number,
  onChangePage: propTypes.func.isRequired,
  rowsPerPage: propTypes.number,
  loader: propTypes.bool,
  dataLength: propTypes.number,

};

TableComponent.defaultProps = {
  data: [],
  column: [],
  order: 'asc',
  orderBy: '',
  page: 0,
  rowsPerPage: 100,
  loader: true,
  dataLength: 0,
};

export default withLoaderAndMessage(TableComponent);
