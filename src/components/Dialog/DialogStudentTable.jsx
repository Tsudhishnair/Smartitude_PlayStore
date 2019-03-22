import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import FormControl from "@material-ui/core/FormControl";

import Spacing from "../Spacing/Spacing";
import { Query } from "react-apollo";
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

  handleClickOpen = student => {
    this.setState({ open: true });
    this.setState({ ...student });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleValueChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };
  render() {
    const { classes } = this.props;
    const FETCH_DEPARTMENTS = gql`
    {
      departments {
        _id
        name
        description
      }
    }
  `;
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
                    {" "}
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
                    {" "}
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
                  <Button onClick={this.handleClose} fullWidth color="primary">
                    Delete Student
                  </Button>
                </GridItem>
              </GridContainer>
            </DialogContentText>
            <div className={classes.root}>
              <Spacing />
              <Typography>
                {" "}
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
                {" "}
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
                    if (loading) return "Loading departments..."
                    else if (error) return "Some error occured!"
                    else {
                      return (
                        <GridItem xs={12} sm={4} md={4} className={classes.formControl}>
                          <FormControl fullWidth>
                            <InputLabel htmlFor="department">Department</InputLabel>
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
                            >                                {
                                data.departments.map(department => {
                                  return (
                                    <MenuItem
                                      value={department}>
                                      {department.name}
                                    </MenuItem>
                                  );
                                })
                              }
                            </Select>
                          </FormControl>
                        </GridItem>)
                    }
                  }
                  }
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
                    studentInput: {
                      username: this.state.username,
                      name: this.state.name,
                      email: this.state.email,
                      password: this.state.password,
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
  }
}

StudentDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StudentDialog);