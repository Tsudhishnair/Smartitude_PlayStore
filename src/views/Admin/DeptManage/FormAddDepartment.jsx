import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import TextField from "@material-ui/core/TextField";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import {
  Button,
  CircularProgress,
  ExpansionPanelActions,
  Snackbar
} from "@material-ui/core";
import { Mutation } from "../../../../node_modules/react-apollo";

import CustomSnackbar from "../../../components/Snackbar/CustomSnackbar";

import gql from "graphql-tag";

const styles = theme => ({
  formControl: {
    margin: 0,
    padding: theme.spacing.unit * 10,
    fullWidth: true,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    backgroundColor: "#9ee",
    wrap: "nowrap"
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

// mutation command
const ADD_DEPARTMENT = gql`
  mutation addDepartment($departmentInput: DepartmentInput!) {
    addDepartment(departmentInput: $departmentInput) {
      _id
    }
  }
`;
class FormAddDepartment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // state for add dept fields
      form: {
        name: "",
        description: ""
      },
      // used to handle loading state
      loading: false,
      // maintaining snackbar states
      snackbar: {
        open: false,
        variant: "error",
        message: "",
        duration: 4000
      }
    };
  }

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
    }, this.state.snackbar.duration);
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

  // handle assign button click
  handleClick = (addDepartment, e) => {
    // check if name or dept fields are empty, if so, throw up snackbar and set msg accordingly
    if (!this.state.form.name) {
      this.setState(
        {
          snackbar: {
            ...this.state.snackbar,
            variant: "error",
            message: "Dept. Code field empty!"
          }
        },
        () => this.openSnackbar()
      );
    } else if (!this.state.form.description) {
      this.setState(
        {
          snackbar: {
            ...this.state.snackbar,
            variant: "error",
            message: "Department Name field empty!"
          }
        },
        () => this.openSnackbar()
      );
    } else {
      // set loading state and start mutation. upon completion, change loading states
      this.setState({
        loading: true
      });
      addDepartment({
        variables: {
          departmentInput: {
            name: this.state.form.name.toUpperCase(),
            description: this.state.form.description
          }
        }
      })
        .then(response => {
          this.setState(
            {
              loading: false,
              snackbar: {
                ...this.state.snackbar,
                variant: "success",
                message: this.state.form.name + "department added successfully!"
              }
            },
            () => this.openSnackbar()
          );
          if (this.props.reloadDepartmentsList !== null) {
            this.props.reloadDepartmentsList();
          }
        })
        .catch(err => {
          this.setState({
            // set error message of snackbar
            error: {
              ...this.state.error,
              message: err.graphQLErrors
                ? err.graphQLErrors[0].message
                : err.networkError
            }
          });
          this.setState(
            {
              loading: false,
              snackbar: {
                ...this.state.snackbar,
                variant: "error",
                duration: 10000,
                message:
                  "Could not add department!" +
                  " " +
                  err.graphQLErrors[0].message
              }
            },
            () => this.openSnackbar()
          );
          if (this.props.reloadDepartmentsList !== null) {
            this.props.reloadDepartmentsList();
          }
        });
    }
  };

  // handle name fields
  handleName = event => {
    this.setState({
      form: {
        ...this.state.form,
        name: event.target.value
      }
    });
  };

  // handle description fields
  handleDescription = event => {
    this.setState({
      form: {
        ...this.state.form,
        description: event.target.value
      }
    });
  };

  // clear name & desc fields
  clearFields = () => {
    this.setState({
      form: {
        name: "",
        description: ""
      }
    });
  };

  render() {
    const { classes } = this.props;
    const { loading, snackbar } = this.state;

    return (
      <Mutation mutation={ADD_DEPARTMENT} onCompleted={this.clearFields}>
        {(addDepartment, data) => (
          <div className={classes.root}>
            <form>
              <GridContainer>
                <GridItem xs={6} md={6}>
                  <TextField
                    autoFocus
                    margin="normal"
                    id="name"
                    label="Department Code"
                    type="name"
                    placeholder={
                      "Enter department code as in IT for Information Technology"
                    }
                    value={this.state.form.name}
                    onChange={this.handleName}
                    fullWidth
                    required
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Department Name"
                    type="name"
                    placeholder={"Enter the full department name here"}
                    value={this.state.form.description}
                    onChange={this.handleDescription}
                    multiline
                    fullWidth
                    required
                  />
                </GridItem>
              </GridContainer>
              <ExpansionPanelActions>
                <Button size="small" onClick={e => this.clearFields(e)}>
                  Clear
                </Button>
                <div className={classes.wrapper}>
                  <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    disabled={loading}
                    type="submit"
                    onClick={e => this.handleClick(addDepartment, e)}
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
        )}
      </Mutation>
    );
  }
}

FormAddDepartment.propTypes = {
  classes: PropTypes.object.isRequired,
  reloadDepartmentsList: PropTypes.func.isRequired
};

export default withStyles(styles)(FormAddDepartment);
