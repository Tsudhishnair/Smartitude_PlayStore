import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Button from "components/CustomButtons/Button.jsx";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit'
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";

import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";

import Chip from '@material-ui/core/Chip';

import Expansionpanel from "../../../components/ExpansionPanel/Expansionpanel";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

let counter = 0;

const containerStyle = {
  padding: 40,
  paddingBottom: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: 1,
};
const menuItemStyle = {
  whiteSpace: 'normal',
  display: 'flex',
  justifyContent: 'space-between',
  lineHeight: 'normal',
};

function createData(name, role, category, carbs, protein) {
  counter += 1;
  return { id: counter, name, role, category, carbs, protein };
}
function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}
function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}
const rows = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Faculty Name' },
  { id: 'role', numeric: true, disablePadding: false, label: 'Role' },
  { id: 'category', numeric: false, disablePadding: false, label: 'Category Assigned' },
  { id: 'carbs', numeric: true, disablePadding: false, label: 'Questions Submitted' },
  { id: 'protein', numeric: false, disablePadding: false, label: 'User-ID' },
  { disablePadding: true, label: '' }
];
class FacultyManage extends React.Component {
  state = {
    open: true,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };
  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;
    return (

      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}
FacultyManage.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        // Selected color table header 
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});
let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;
  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
</Typography>
        ) : (
            <Typography variant="h6" id="tableTitle">

            </Typography>
          )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete"
              onClick={this.handleClickOpen}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
            <Tooltip title="Filter list">
              <IconButton aria-label="Filter list">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
      </div>
    </Toolbar>
  );
};
EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};
EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);
const styles = theme => ({
  elementPadding: { padding: '15px' },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing.unit * 2,
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing.unit,
  },
  table: {
    minWidth: 900,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});
class EnhancedTable extends React.Component {
  state = {
    open: false,
    fullWidth: true,
    maxWidth: 'sm',
    order: 'desc',
    orderBy: 'role',
    selected: [],
    data: [
      createData('Cupcake', 'Faculty', 'Quantitative', 67, 'uxxxxx'),
      createData('Donut', 'Faculty', 'Quantitative', 51, 'uxxxxx'),
      createData('Eclair', 'Faculty', 'Quantitative', 24, 'uxxxxx'),
      createData('Frozen yoghurt', 'Incharge', 'NA', 24, 'uxxxxx'),
      createData('Gingerbread', 'Faculty', 'Quantitative', 49, 'uxxxxx'),
      createData('Honeycomb', 'Faculty', 'Algebra', 87, 'uxxxxx'),
      createData('Ice cream sandwich', 'Faculty', 9.0, 37, 'uxxxxx'),
      createData('Jelly Bean', 'Faculty', 'Quantitative', 94, 'uxxxxx'),
      createData('KitKat', 'Faculty', 'Motion', 65, 'uxxxxx'),
      createData('Lollipop', 'Faculty', 0.2, 98, 'uxxxxx'),
      createData('Marshmallow', 'Incharge', 'NA', 81, 'uxxxxx'),
      createData('Nougat', 'Faculty', 19.0, 9, 'uxxxxx'),
      createData('Oreo', 'Incharge', 'NA', 63, 'uxxxxx'),
    ],
    state4: [
      {
        label: 'France',
        value: {
          'English short name': 'France',
          'French short name': 'France (la)',
          'Alpha-2 code': 'FR',
          'Alpha-3 code': 'FRA',
          Numeric: 250,
          Capital: 'Paris',
          Continent: 4,
        },
      },
    ],
    page: 0,
    rowsPerPage: 10,
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleMaxWidthChange = event => {
    this.setState({ maxWidth: event.target.value });
  };

  handleFullWidthChange = event => {
    this.setState({ fullWidth: event.target.checked });
  };
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';
    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }
    this.setState({ order, orderBy });
  };
  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };
  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    this.setState({ selected: newSelected });
  };
  handleChangePage = (event, page) => {
    this.setState({ page });
  };
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
  isSelected = id => this.state.selected.indexOf(id) !== -1;
  handleSelection = (values, name) => this.setState({ [name]: values });

  handleCustomDisplaySelections = (name) => (values) =>
    values.length ? (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {values.map(({ label, value: country }, index) => (
          <Chip key={index} style={{ margin: 5 }} onRequestDelete={this.onRequestDelete(index, name)}>
            {label}
          </Chip>
        ))}
      </div>
    ) : (
        <div style={{ minHeight: 42, lineHeight: '42px' }}>Select some values</div>
      ); // advice: use one of <option>s' default height as min-height

  onRequestDelete = (key, name) => (event) => {
    this.setState({ [name]: this.state[name].filter((v, i) => i !== key) });
  };


  render() {
    const { fullScreen } = this.props;
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    const { state4 } = this.state;
    const header1 = 'Faculty';
    const header2 = 'Add a new faculty member';
    console.debug('state4', state4); // eslint-disable-line no-console
    return (
      <React.Fragment>
        <Expansionpanel headers={header1} header={header2} Footer1={"Cancel"} Footer2={"Assign"} directingValue={"2"} />

        <Card className={classes.root}>
          <CardHeader color="warning">
            <h4 className={classes.cardTitleWhite}>All Faculty</h4>
          </CardHeader>

          <EnhancedTableToolbar numSelected={selected.length} />
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <FacultyManage
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
                {stableSort(data, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    const isSelected = this.isSelected(n.id);
                    return (
                      <TableRow
                        hover
                        onClick={event => this.handleClick(event, n.id)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n.id}
                        selected={isSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isSelected} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          {n.name}
                        </TableCell>
                        <TableCell align="right">{n.role}</TableCell>
                        <TableCell align="right">{n.category}</TableCell>
                        <TableCell align="right">{n.carbs}</TableCell>
                        <TableCell align="right">{n.protein}</TableCell>
                        <TableCell className={classes.tableActions}>
                          <Tooltip
                            id="tooltip-top"
                            title="Edit"
                            placement="top"
                            classes={{ tooltip: classes.tooltip }}
                          >
                            <IconButton
                              aria-label="Edit"
                              className={classes.tableActionButton}
                              onClick={this}
                            >
                              <Edit
                                className={
                                  classes.tableActionButtonIcon + " " + classes.edit
                                }
                              />
                            </IconButton>
                          </Tooltip>
                          <Tooltip
                            id="tooltip-top"
                            title="Delete"
                            placement="top"
                            classes={{ tooltip: classes.tooltip }}
                          >
                            <IconButton
                              aria-label="Delete"
                              className={classes.tableActionButton}
                              onClick={this.handleClickOpen}
                            >
                              <Delete
                                className={
                                  classes.tableActionButtonIcon + " " + classes.delete
                                }
                              />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={7} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={[10, 30, 50]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Card>
      </React.Fragment>
    );
  }
}
EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};
FacultyManage.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};
export default withStyles(styles)(EnhancedTable);