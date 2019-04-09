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
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";

import {
  Button,
  CircularProgress,
  Divider,
  ExpansionPanelActions,
  Snackbar
} from "@material-ui/core";
import CustomSnackbar from "../../../components/Snackbar/CustomSnackbar";
import green from "@material-ui/core/colors/green";

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
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: "relative"
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
      },
      redirecter: false,
      snackbar: {
        open: false,
        variant: "error",
        message: ""
      }
    };
  }
  // handle changes in form fields
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

  // open snackbar
  openSnackbar = () => {
    this.setState({
      snackbar: {
        ...this.state.snackbar,
        open: true
      }
    });
    setTimeout(() => {
      this.setState({
        snackbar: {
          ...this.state.snackbar,
          open: false
        }
      });
    }, 4000);
  };

  // close snackbar by changing open state
  closeSnackbar = () => {
    this.setState({
      snackbar: {
        ...this.state.snackbar,
        open: false
      }
    });
  };
  handleClick = (addStudent, e) => {
    e.preventDefault();
    // check if fields are empty, if so, throw up snackbar and set msg accordingly
    if (
      !this.state.assignval.username ||
      !this.state.assignval.mname ||
      !this.state.assignval.email ||
      !this.state.assignval.phoneNumber ||
      !this.state.assignval.batch
    ) {
      this.setState(
        {
          snackbar: {
            ...this.state.snackbar,
            message: "Few fields are empty!"
          }
        },
        () => this.openSnackbar()
      );
    } else if (!this.state.deptdrop.department) {
      this.setState(
        {
          snackbar: {
            ...this.state.snackbar,
            variant: "error",
            message: "Please select a department!"
          }
        },
        () => this.openSnackbar()
      );
    } else if (!this.state.assignval.password) {
      this.setState(
        {
          snackbar: {
            ...this.state.snackbar,
            variant: "error",
            message: "Password field empty!"
          }
        },
        () => this.openSnackbar()
      );
    } else {
      // set loading state and start mutation. upon completion, change loading states
      this.setState({
        loading: true
      });
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
      })
        .then(response => {
          this.handleReset(e);
          this.setState(
            {
              loading: false,
              snackbar: {
                ...this.state.snackbar,
                variant: "success",
                message: "Student Added Successfully!"
              }
            },
            () => {
              this.openSnackbar();
              this.props.reloadStudentsList();
            }
          );
        })
        .catch(err => {
          this.setState({
            loading: false
          });
          this.closeSnackbar();
        });
    }
  };

  render() {
    const { classes } = this.props;
    const { loading, snackbar } = this.state;
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
          _id
        }
      }
    `;
    return (
      <Mutation mutation={Add_Student}>
        {addStudent => {
          return (
            <div className={classes.root}>
              <form>
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
                      required
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
                      required
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
                      required
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
                      required
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
                      required
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
                      <InputLabel htmlFor="department">Department</InputLabel>
                      <Select
                        open={this.state.deptdrop.open}
                        onClose={this.handleClose}
                        onOpen={this.handleOpen}
                        onChange={this.handleChange}
                        required
                        value={this.state.deptdrop.department}
                        renderValue={value => {
                          return value;
                        }}
                        inputProps={{
                          name: "department",
                          id: "department"
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
                      required
                      placeholder="20XX"
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
                  <div className={classes.wrapper}>
                    <Button
                      size="small"
                      color="primary"
                      variant="outlined"
                      type={"submit"}
                      onClick={e => this.handleClick(addStudent, e)}
                      disabled={loading}
                    >
                      Assign
                    </Button>
                    {loading && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </div>
                </ExpansionPanelActions>
                <Snackbar
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={snackbar.open}
                  auto
                  autoHideDuration={6000}
                >
                  <CustomSnackbar
                    onClose={this.closeSnackbar}
                    variant={snackbar.variant}
                    message={snackbar.message}
                  />
                </Snackbar>
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

FormAddStudent.propTypes = {
  classes: PropTypes.object.isRequired,
  reloadStudentsList: PropTypes.func.isRequired
};
export default withStyles(styles)(FormAddStudent);
