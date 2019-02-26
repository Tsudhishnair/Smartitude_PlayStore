import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import FormControl from "@material-ui/core/FormControl";
import Spacing from "../../../components/Spacing/Spacing";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import { ExpansionPanelActions, Button, Divider } from "@material-ui/core";
import { Mutation } from "react-apollo";

const styles = theme => ({
  formControl: {
    margin: 0,
    padding: theme.spacing.unit * 10,
    fullWidth: true,
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 2,
    wrap: "nowrap",
    minWidth: 120
  },
  elementPadding: {
    padding: "15px",
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 10
  },
  container: {
    display: "flex",

    flexGrow: 1
  },
  root: {
    flexGrow: 1,
    marginLeft: 10
  },
  button: {
    margin: theme.spacing.unit * 4
  }
});

class FormAddStudent extends Component {
  state = {
    selectedDate: ""
  };

  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      deptdrop: { deptid: "", department: "", open: false },
      assignval: {
        username: "",
        mname: "",
        email: "",
        password: "",
        phoneNumber: "",
        department: "",
        batch: ""
      }
    };
  }

  handleDateChange = date => {
    this.setState({ selectedDate: date });
    this.setState({
      assignval: {
        ...this.state.assignval,
        batch: date
      }
    });
  };

  handleOpen = () => {
    this.setState({ deptdrop: { open: true } });
  };
  handleClose = () => {
    this.setState({ deptdrop: { open: false } });
  };
  handleChange = (value, id) => {
    if (this.state.open) {
      this.setState({ deptdrop: { open: false } });
    }
    this.setState({ deptdrop: { deptid: id, department: value } });
    this.setState({
      assignval: {
        ...this.state.assignval,
        department: this.state.deptdrop.deptid
      }
    });
  };
  handleValueChange = event => {
    this.setState({
      assignval: {
        ...this.state.assignval,
        [event.target.name]: event.target.value
      }
    });
  };
  handleReset = e => {
    this.setState({
      deptdrop: {
        deptid: "",
        department: ""
      },
      assignval: {
        username: "",
        mname: "",
        email: "",
        password: "",
        phoneNumber: "",
        department: "",
        batch: ""
      }
    });
  };
  render() {
    const { classes } = this.props;
    const deptquery = gql`
      {
        departments {
          _id
          name
        }
      }
    `;
    const Add_Student = gql`
      mutation addStudent($studentInput: StudentInput!) {
        addStudent(studentInput: $studentInput) {
          username
          name
          email
          password
          phoneNumber
          department {
            name
          }
          batch
        }
      }
    `;
    return (
      <Mutation mutation={Add_Student}>
        {(addStudent, { error }) => {
          if (error) {
            console.log(error);
          }
          return (
            <div className={classes.root}>
              <form onSubmit={e => e.preventDefault()}>
                <Typography>
                  <strong>Basic Info</strong>
                </Typography>
                <GridContainer>
                  <GridItem
                    xs={12}
                    sm={4}
                    md={4}
                    className={classes.elementPadding}
                  >
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Name"
                      type="text"
                      name="mname"
                      onChange={this.handleValueChange}
                      value={this.state.assignval.mname}
                      fullWidth
                    />
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={4}
                    md={4}
                    className={classes.elementPadding}
                  >
                    <TextField
                      autoFocus
                      margin="dense"
                      id="username"
                      label="Username"
                      type="text"
                      name="username"
                      onChange={this.handleValueChange}
                      value={this.state.assignval.username}
                      fullWidth
                    />
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={4}
                    md={4}
                    className={classes.elementPadding}
                  >
                    <TextField
                      autoFocus
                      margin="dense"
                      id="email"
                      label="Email Address"
                      type="email"
                      name="email"
                      onChange={this.handleValueChange}
                      value={this.state.assignval.email}
                      fullWidth
                    />
                  </GridItem>

                  <GridItem
                    xs={12}
                    sm={4}
                    md={4}
                    className={classes.elementPadding}
                  >
                    <TextField
                      autoFocus
                      margin="dense"
                      id="password"
                      label="Password"
                      type="password"
                      name="password"
                      onChange={this.handleValueChange}
                      value={this.state.assignval.password}
                      fullWidth
                    />
                  </GridItem>
                </GridContainer>
                <Spacing />
                <Typography>
                  <strong>College Info</strong>
                </Typography>
                <GridContainer>
                  <GridItem
                    xs={12}
                    sm={4}
                    md={4}
                    className={classes.elementPadding}
                  >
                    <TextField
                      autoFocus
                      margin="dense"
                      id="phone"
                      label="Phone Number"
                      type="phone"
                      name="phoneNumber"
                      onChange={this.handleValueChange}
                      value={this.state.assignval.phoneNumber}
                      fullWidth
                    />
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={4}
                    md={4}
                    className={classes.formControl}
                  >
                    <FormControl fullWidth>
                      <InputLabel htmlFor="dept">Department</InputLabel>
                      <Select
                        open={this.state.deptdrop.open}
                        onClose={this.handleClose}
                        onOpen={this.handleOpen}
                        onChange={this.handleChange}
                        value={this.state.deptdrop.department}
                        renderValue={value => {
                          return value;
                        }}
                        inputProps={{
                          name: "department",
                          id: "dept"
                        }}
                        fullWidth
                      >
                        <Query query={deptquery}>
                          {({ data, loading, error }) => {
                            if (!loading) {
                              return (
                                <Fragment>
                                  {data.departments.map(department => {
                                    return (
                                      <MenuItem
                                        onClick={() =>
                                          this.handleChange(
                                            department.name,
                                            department._id
                                          )
                                        }
                                        value={department.name}
                                        key={department._id}
                                      >
                                        {department.name}
                                      </MenuItem>
                                    );
                                  })}
                                </Fragment>
                              );
                            }
                          }}
                        </Query>
                      </Select>
                    </FormControl>
                  </GridItem>
                  {/* <GridItem
                    xs={12}
                    sm={4}
                    md={4}
                    className={classes.elementPadding}
                  >
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        className={classes.date_root}
                        minDate={this.state.selectedDate}
                        views={["year"]}
                        label="Batch"
                        value={this.state.selectedDate}
                        onChange={this.handleDateChange}
                        
                        disableFuture="true"
                        animateYearScrolling
                      />
                      {console.log(this.state.selectedDate)}
                    </MuiPickersUtilsProvider>
                  </GridItem> */}
                  <GridItem
                    xs={12}
                    sm={4}
                    md={4}
                    className={classes.elementPadding}
                  >
                    <TextField
                      autoFocus
                      margin="dense"
                      id="phone"
                      label="batch"
                      type="number"
                      name="batch"
                      onChange={this.handleValueChange}
                      value={this.state.assignval.batch}
                      fullWidth
                    />
                  </GridItem>
                </GridContainer>
                <Divider />
                <ExpansionPanelActions>
                  <Button
                    size="small"
                    onClick={e => {
                      e.preventDefault();
                      this.handleReset();
                    }}
                  >
                    Clear
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    onClick={e => {
                      e.preventDefault();
                      addStudent({
                        variables: {
                          studentInput: {
                            username: this.state.assignval.username,
                            name: this.state.assignval.mname,
                            email: this.state.assignval.email,
                            password: this.state.assignval.password,
                            phoneNumber: this.state.assignval.phoneNumber,
                            department: this.state.deptdrop.deptid,
                            batch: parseInt(this.state.assignval.batch.substring(0, 4))
                          }
                        }
                      });
                    }}
                  >
                    Assign
                  </Button>
                </ExpansionPanelActions>
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default withStyles(styles)(FormAddStudent);
