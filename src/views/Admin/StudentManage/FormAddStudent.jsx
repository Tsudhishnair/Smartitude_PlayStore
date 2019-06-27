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
  ExpansionPanelActions,
  Snackbar,
  Divider,
  Tooltip
} from "@material-ui/core";
import CustomSnackbar from "../../../components/Snackbar/CustomSnackbar";
import formControlStyle from "../../../assets/jss/form-control";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

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
          this.setState(
            {
              loading: false,
              snackbar: {
                ...this.state.snackbar,
                variant: "error",
                message: "Student Adding Failed!" + err.message
              }
            },
            () => {
              this.openSnackbar();
            }
          );
          // this.closeSnackbar();
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
      <Mutation mutation={Add_Student} onCompleted={this.handleReset}>
        {(addStudent, { data }) => {
          return (
            <div className={classes.root}>
              {console.log(data)}
              <form onSubmit={e => this.handleClick(addStudent, e)}>
                <Typography>
                  <strong>Basic Info</strong>
                </Typography>
                <GridContainer>
                  <GridItem
                    xs={12}
                    sm={3}
                    md={3}
                    className={classes.elementPadding}
                  >
                    <Tooltip
                      disableFocusListener
                      title="Special characters or numbers are not allowed"
                    >
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        required
                        type="text"
                        InputProps={{
                          inputProps: { pattern: "^[a-zA-Z ]*$" }
                        }}
                        name="mname"
                        onChange={this.handleValueChange}
                        value={this.state.assignval.mname}
                        fullWidth
                      />
                    </Tooltip>
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={3}
                    md={3}
                    className={classes.elementPadding}
                  >
                    <TextField
                      autoFocus
                      id="phone"
                      label="Phone Number"
                      margin={"dense"}
                      type="number"
                      name="phoneNumber"
                      required
                      InputProps={{
                        inputProps: { min: 6000000000, max: 9999999999 }
                      }}
                      onChange={this.handleValueChange}
                      value={this.state.assignval.phoneNumber}
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
                      required
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
                    sm={2}
                    md={2}
                    className={classes.elementPadding}
                  >
                    <Tooltip
                      disableFocusListener
                      title="At least 6 characters necessary & a mixture of letters and numbers recommended"
                    >
                      <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        name="password"
                        InputProps={{
                          inputProps: { pattern: ".{6,}" }
                        }}
                        required
                        onChange={this.handleValueChange}
                        value={this.state.assignval.password}
                        fullWidth
                      />
                    </Tooltip>
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
                    <Tooltip
                      disableFocusListener
                      title="Only alphanumeric characters and underscore allowed"
                    >
                      <TextField
                        autoFocus
                        id="username"
                        label="Username"
                        required
                        type="text"
                        InputProps={{
                          inputProps: { pattern: "^[a-zA-Z0-9_]*$" }
                        }}
                        name="username"
                        onChange={this.handleValueChange}
                        value={this.state.assignval.username}
                        fullWidth
                      />
                    </Tooltip>
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={4}
                    md={4}
                    className={classes.formControl}
                  >
                    <FormControl required fullWidth>
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
                      id="phone"
                      label="Batch"
                      required
                      placeholder="20XX"
                      type="number"
                      name="batch"
                      InputProps={{ inputProps: { min: 2000, max: 2040 } }}
                      onChange={this.handleValueChange}
                      value={this.state.assignval.batch}
                      fullWidth
                    />
                  </GridItem>
                </GridContainer>
                <Divider/>
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
export default withStyles(formControlStyle)(FormAddStudent);
