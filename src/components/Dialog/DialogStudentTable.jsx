import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Typography,
  InputLabel,
  MenuItem,
  Select,
  FormControl
} from "@material-ui/core";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import Spacing from "../Spacing/Spacing";

// react apollo
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  formControl: {
    margin: 0,
    padding: theme.spacing.unit * 10,
    fullWidth: true,
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 2,
    backgroundColor: "#9ee",
    wrap: "nowrap"
  },
  elementPadding: {
    padding: "15px",
    // marginTop: theme.spacing.unit * 2,
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
  // formControl: {
  //   margin: theme.spacing.unit * 3,
  //   minWidth: 120
  // },
  button: {
    margin: theme.spacing.unit * 4
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

// edit student query
const EDIT_STUDENT = gql`
  mutation editStudent($_id: ID!, $studentEditInput: StudentEditInput!) {
    editStudent(_id: $_id, studentEditInput: $studentEditInput) {
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
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
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
  handleClickOpen = student => {
    this.setState({ open: true });
    this.setState({ ...student });
  };

  // close dialog
  handleClose = () => {
    this.setState({ open: false });
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
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Mutation mutation={EDIT_STUDENT} onCompleted={this.handleClose}>
        {editStudent => {
          return (
            <div>
              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">
                  {this.state.name}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    <GridContainer>
                      <GridItem
                        xs={6}
                        sm={7}
                        md={7}
                        className={classes.elementPadding}
                      >
                        Edit below to update/modify an individual student data.
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
                        <TextField
                          autoFocus
                          margin="dense"
                          id="name"
                          label="Name"
                          type="name"
                          name="name"
                          onChange={this.handleValueChange}
                          value={this.state.name}
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
                          type="name"
                          name="username"
                          onChange={this.handleValueChange}
                          value={this.state.username}
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
                          name="email"
                          label="Email Address"
                          type="email"
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
                          autoFocus
                          margin="dense"
                          name="phoneNumber"
                          id="phoneNumber"
                          label="Phone Number"
                          value={this.state.phoneNumber}
                          onChange={this.handleValueChange}
                          type="phone"
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
                                <FormControl fullWidth>
                                  <InputLabel htmlFor="department">
                                    Department
                                  </InputLabel>
                                  <Select
                                    onChange={this.handleValueChange}
                                    value={this.state.department.name}
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
                          autoFocus
                          margin="dense"
                          id="batch"
                          label="Batch"
                          name="batch"
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
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    onClick={e => {
                      e.preventDefault();
                      editStudent({
                        variables: {
                          _id: this.state._id,

                          studentEditInput: {
                            username: this.state.username,
                            name: this.state.name,
                            email: this.state.email,
                            phoneNumber: this.state.phoneNumber,
                            department: this.state.department._id,
                            batch: this.state.batch
                          }
                        }
                      });
                    }}
                  >
                    Save
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

StudentDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StudentDialog);
