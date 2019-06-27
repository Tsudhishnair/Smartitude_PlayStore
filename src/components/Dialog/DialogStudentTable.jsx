import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import formControlStyle from "../../assets/jss/form-control";

import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  TextField,
  Typography
} from "@material-ui/core";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Spacing from "../Spacing/Spacing";
// react apollo
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

// edit student query
const EDIT_STUDENT = gql`
  mutation editStudent($studentEditInput: StudentEditInput!) {
    editStudent(studentEditInput: $studentEditInput) {
      _id
    }
  }
`;

// get departments query
const FETCH_DEPARTMENTS = gql`
  {
    departments {
      _id
      name
      description
    }
  }
`;

// delete students query
const DELETE_STUDENT = gql`
  mutation deleteStudent($_id: ID!) {
    deleteStudent(_id: $_id) {
      _id
    }
  }
`;

class StudentDialog extends React.Component {
  reloadStudentsList = null;
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      loading: false,
      open: false,
      department: {
        name: "",
        _id: ""
      }
    };
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  // manage state for opening dialog
  handleClickOpen = (student, reloadStudentList) => {
    this.setState({ open: true });
    this.setState({ ...student });
    this.reloadStudentsList = reloadStudentList;
  };

  // close dialog
  handleClose = () => {
    this.setState({ open: false });
    this.props.onClose();
  };

  // handle value change for any field in student update field
  handleValueChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  // delete student
  handleDelete = deleteStudent => {
    deleteStudent({
      variables: {
        _id: this.state._id
      }
    })
      .then(response => {
        console.log("then called");
        if (this.reloadStudentsList !== null) {
          this.reloadStudentsList();
        }
        this.props.onClose("success");
      })
      .catch(err => {
        console.log("catch called");
        // TODO: Set snackbar
        console.log(err);
        if (this.reloadStudentsList !== null) {
          this.reloadStudentsList();
        }
        this.props.onClose("error", err);
      })
      .finally(() => {
        this.setState({ open: false });
      });
  };
  handleClick = (editStudent, e) => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    editStudent({
      variables: {
        studentEditInput: {
          _id: this.state._id,
          username: this.state.username,
          name: this.state.name,
          email: this.state.email,
          phoneNumber: this.state.phoneNumber,
          department: this.state.department._id,
          batch: parseInt(this.state.batch)
        }
      }
    })
      .then(response => {
        this.setState({
          loading: false
        });
        if (this.reloadStudentsList !== null) {
          this.reloadStudentsList();
        }
        this.props.onClose("success");
        this.handleClose();
      })
      .catch(err => {
        this.setState({
          loading: false
        });
        if (this.reloadStudentsList !== null) {
          this.reloadStudentsList();
        }
        this.props.onClose("error", err);
      });
  };

  render() {
    const { classes } = this.props;
    const { loading } = this.state;

    return (
      <Mutation mutation={EDIT_STUDENT} onCompleted={this.handleClose}>
        {editStudent => {
          return (
            <div>
              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                scroll={"body"}
                TransitionComponent={Transition}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">
                  {this.state.name}
                </DialogTitle>
                <form onSubmit={e => this.handleClick(editStudent, e)}>
                  <DialogContent>
                    <DialogContentText>
                      <GridContainer>
                        <GridItem
                          xs={6}
                          sm={7}
                          md={7}
                          className={classes.elementPadding}
                        >
                          Edit below to update/modify an individual student
                          data.
                        </GridItem>
                        <GridItem
                          xs={1.5}
                          sm={1}
                          md={1}
                          className={classes.elementPadding}
                        >
                          <Typography>Rank</Typography>
                          <Typography>
                            <h4>
                              <strong>{this.state.rank}</strong>
                            </h4>
                          </Typography>
                        </GridItem>
                        <GridItem
                          xs={1.5}
                          sm={1}
                          md={1}
                          className={classes.elementPadding}
                        >
                          <Typography>Score</Typography>
                          <Typography>
                            <h4>
                              <strong>{this.state.score}</strong>
                            </h4>
                          </Typography>
                        </GridItem>
                        <GridItem
                          xs={2}
                          sm={3}
                          md={3}
                          className={classes.elementPadding}
                        >
                          <Mutation
                            mutation={DELETE_STUDENT}
                            onCompleted={this.handleClose}
                          >
                            {deleteStudent => (
                              <Button
                                onClick={e => this.handleDelete(deleteStudent)}
                                fullWidth
                                disabled={loading}
                                color="primary"
                              >
                                Delete Student
                              </Button>
                            )}
                          </Mutation>
                        </GridItem>
                      </GridContainer>
                    </DialogContentText>
                    <div className={classes.root}>
                      <Spacing />
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
                          <Tooltip
                            disableFocusListener
                            title="Special characters or numbers are not allowed"
                          >
                          <TextField
                            margin="dense"
                            id="name"
                            label="Name"
                            type="name"
                            name="name"
                            disabled={loading}
                            required
                            InputProps={{
                              inputProps: { pattern: "^[a-zA-Z ]*$" }
                            }}
                            onChange={this.handleValueChange}
                            value={this.state.name}
                            fullWidth
                          />
                          </Tooltip>
                        </GridItem>
                        <GridItem
                          xs={12}
                          sm={4}
                          md={4}
                          className={classes.elementPadding}
                        >
                          <Tooltip
                            disableFocusListener
                            title="Special characters or numbers are not allowed"
                          >
                          <TextField
                            margin="dense"
                            id="username"
                            label="Username"
                            type="name"
                            name="username"
                            disabled={loading}
                            required
                            InputProps={{
                              inputProps: { pattern: "^[a-zA-Z ]*$" }
                            }}
                            onChange={this.handleValueChange}
                            value={this.state.username}
                            fullWidth
                          />
                          </Tooltip>
                        </GridItem>
                        <GridItem
                          xs={12}
                          sm={4}
                          md={4}
                          className={classes.elementPadding}
                        >
                          <TextField
                            margin="dense"
                            id="email"
                            name="email"
                            label="Email Address"
                            type="email"
                            disabled={loading}
                            required
                            value={this.state.email}
                            onChange={this.handleValueChange}
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
                            name="phoneNumber"
                            id="phoneNumber"
                            label="Phone Number"
                            required
                            disabled={loading}
                            value={this.state.phoneNumber}
                            onChange={this.handleValueChange}
                            type="number"
                            InputProps={{
                              inputProps: { min: 6000000000, max: 9999999999 }
                            }}
                            fullWidth
                          />
                        </GridItem>

                        <Query query={FETCH_DEPARTMENTS}>
                          {({ data, loading, error }) => {
                            if (loading) return "Loading departments...";
                            else if (error) return "Some error occured!";
                            else {
                              return (
                                <GridItem
                                  xs={12}
                                  sm={4}
                                  md={4}
                                  className={classes.formControl}
                                >
                                  <FormControl fullWidth disabled={loading}>
                                    <InputLabel htmlFor="department">
                                      Department
                                    </InputLabel>
                                    <Select
                                      onChange={this.handleValueChange}
                                      value={this.state.department.name}
                                      disabled={loading}
                                      renderValue={department => {
                                        return department;
                                      }}
                                      inputProps={{
                                        name: "department",
                                        id: "department"
                                      }}
                                      fullWidth
                                    >
                                      {data.departments.map(department => {
                                        return (
                                          <MenuItem
                                            value={department}
                                            key={department._id}
                                          >
                                            {department.name}
                                          </MenuItem>
                                        );
                                      })}
                                    </Select>
                                  </FormControl>
                                </GridItem>
                              );
                            }
                          }}
                        </Query>

                        <GridItem
                          xs={12}
                          sm={4}
                          md={4}
                          className={classes.elementPadding}
                        >
                          <TextField
                            id="batch"
                            label="Batch"
                            name="batch"
                            required
                            disabled={loading}
                            onChange={this.handleValueChange}
                            value={this.state.batch}
                            type="text"
                            fullWidth
                          />
                        </GridItem>
                      </GridContainer>
                      <Spacing />
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <Button size={"small"} onClick={this.handleClose}>
                      Cancel
                    </Button>
                    <div className={classes.wrapper}>
                      <Button
                        size="small"
                        color="primary"
                        type={"submit"}
                        disabled={loading}
                        variant={"outlined"}
                      >
                        Save
                      </Button>
                      {loading && (
                        <CircularProgress
                          size={24}
                          className={classes.buttonProgress}
                        />
                      )}
                    </div>
                  </DialogActions>
                </form>
              </Dialog>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

StudentDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onRef: PropTypes.object
};

export default withStyles(formControlStyle)(StudentDialog);
