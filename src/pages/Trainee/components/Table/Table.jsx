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
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { withLoaderAndMessage } from '../../../../components';

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
  button: {
    padding: 0,
    border: 'none',
    background: 'none',
  },
}));

const TableComponent = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const {
    id, data, column, order, orderBy, onSort, onSelect, actions,
    count, page, onChangePage, rowsPerPage, dataLength,
  } = props;

  const handleSortIcon = (e) => {
    e.target.style.color = 'black';
    setOpen(true);
  };
  const handleColorChange = (e) => {
    e.target.style.color = 'grey';
  };

  return (
    <>
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
              <TableCell />

            </TableRow>
          </TableHead>
          <TableBody>
            {dataLength ? data.map((element) => (
              <StyledTableRow hover onClick={() => onSelect(element)} key={element[id]}>
                {column.map(({ field, align, format }) => (

                  <StyledTableCell align={align}>
                    {format ? format(element[field]) : element[field]}
                  </StyledTableCell>

                ))}
                {
                  <StyledTableCell>

                    {
                      actions.map((
                        { icons, handler },
                      ) => (
                        <div>
                          <Button
                            className={classes.background}
                            onClick={() => { handler(element); }}
                          >
                            {icons}
                          </Button>
                        </div>
                      ))
                    }

                  </StyledTableCell>
                }
              </StyledTableRow>

            )) : (
              <Box paddingLeft={72}>
                <h2>Oops No more Trainees</h2>
              </Box>
            )}

          </TableBody>
        </Table>
      </TableContainer>
      {count ? (
        <TablePagination
          component="div"
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[0]}
          onChangePage={onChangePage}
        />
      ) : ''}
    </>
  );
};

export default withLoaderAndMessage(TableComponent);

TableComponent.propTypes = {
  id: propTypes.string.isRequired,
  data: propTypes.arrayOf(propTypes.object).isRequired,
  column: propTypes.arrayOf(propTypes.object).isRequired,
  actions: propTypes.arrayOf(propTypes.object).isRequired,
  order: propTypes.oneOf(['asc', 'desc']),
  orderBy: propTypes.string,
  onSort: propTypes.func.isRequired,
  onSelect: propTypes.func.isRequired,
  count: propTypes.number.isRequired,
  page: propTypes.number,
  onChangePage: propTypes.func.isRequired,
  rowsPerPage: propTypes.number,
};

TableComponent.defaultProps = {
  order: 'asc',
  orderBy: '',
  page: 0,
  rowsPerPage: 100,
};
