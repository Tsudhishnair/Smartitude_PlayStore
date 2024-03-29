import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import {
  Button,
  CircularProgress,
  ExpansionPanelActions
} from "@material-ui/core";
import { Mutation } from "../../../../node_modules/react-apollo";

import CustomSnackbar from "../../../components/Snackbar/CustomSnackbar";

import gql from "graphql-tag";
import formControlStyle from "../../../assets/jss/form-control";

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
    e.preventDefault();
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
                message: this.state.form.name + "Department added successfully!"
              }
            },
            () => this.openSnackbar()
          );
          if (this.props.reloadDepartmentsList !== null) {
            this.props.reloadDepartmentsList();
          }
        })
        .catch(err => {
          this.setState(
            {
              // error: {
              //   ...this.state.error,
              //   message: err.graphQLErrors
              //     ? err.graphQLErrors[0].message
              //     : err.networkError
              // },
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
            <form onSubmit={e => this.handleClick(addDepartment, e)}>
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
              <CustomSnackbar
                onClose={this.closeSnackbar}
                variant={snackbar.variant}
                autoHideDuration={snackbar.duration}
                open={snackbar.open}
                message={snackbar.message}
              />
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

export default withStyles(formControlStyle)(FormAddDepartment);
