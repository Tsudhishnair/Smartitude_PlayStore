import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

import { Button, IconButton, Snackbar } from "@material-ui/core";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import ExpansionPanel from "../../../components/ExpansionPanel/Expansionpanel";
import DeleteForeverIcon from "@material-ui/icons/Delete";
// apollo client
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
// dialog boxes
import MessageDialog from "../../../components/Dialog/MessageDialog";
import DeptDialog from "./DeptDialog";
// constant
import { EXPANSION_DEPARTMENT_FORM } from "../../../Utils";
// snackbar
import CustomSnackbar from "../../../components/Snackbar/CustomSnackbar";

const styles = theme => ({
  root: {
    margin: 0
  }
});

class DeptManage extends React.Component {
  refetchDepartmentsList = null;

  reloadDepartmentsList = () => {
    console.log("reloadDepartmentsList called");
    if (this.refetchDepartmentsList !== null) {
      this.refetchDepartmentsList();
    }
  };

  constructor(props) {
    super(props);
    //state to manage department dialog
    this.state = {
      updateDialogOpen: false,
      deleteDialogOpen: false,
      deptData: {},
      snackbar: {
        open: false,
        variant: "error",
        message: ""
      }
    };

    // stores dept which is to be deleted
    this.deptToBeDeleted;

    // stores mutation call of dept
    this.deptDeleteMutation;
  }

  // open snackbar with timer
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

  closeSnackbar = () => {
    this.setState({
      snackbar: {
        ...this.state.snackbar,
        open: false
      }
    });
  };

  // called when manage button is clicked
  handleUpdate = data => {
    if (data) {
      this.setState({
        deptData: data
      });
      this.toggleUpdateDialogVisibility();
    }
  };

  //delete function passsed to the dialog
  handleDelete(deleteDepartment, data) {
    this.toggleDeleteDialogVisibility();

    this.deptToBeDeleted = data;

    this.deptDeleteMutation = deleteDepartment;
  }

  // called by confirm action of delete confirmation dialog box
  deleteDepartment = () => {
    this.deptDeleteMutation({
      variables: {
        _id: this.deptToBeDeleted._id
      }
    })
      .then(res => {
        this.setState(
          {
            loading: false,
            snackbar: {
              ...this.state.snackbar,
              variant: "success",
              message: this.deptToBeDeleted.name + " deleted successfully!"
            }
          },
          () => this.openSnackbar()
        );
        console.log(res);
        if (this.reloadDepartmentsList !== null) {
          this.reloadDepartmentsList();
        }
      })
      .catch(err => {
        this.setState({
          // set error message of snackbar
          error: {
            message: err.graphQLErrors
              ? err.graphQLErrors[0].message
              : err.networkError
          }
        });
        if (this.reloadDepartmentsList !== null) {
          this.reloadDepartmentsList();
        }
      })
      // close snackbar after resolution of request
      .finally(this.toggleDeleteDialogVisibility());
  };

  // used to toggle visibility of update and delete dialogs
  toggleUpdateDialogVisibility = () => {
    this.setState(prevState => ({
      updateDialogOpen: !prevState.updateDialogOpen
    }));
  };

  toggleDeleteDialogVisibility = () => {
    this.setState(prevState => ({
      deleteDialogOpen: !prevState.deleteDialogOpen
    }));
  };

  // renders update & delete dialogs
  renderUpdateDialog = isVisible => {
    if (isVisible) {
      return (
        <DeptDialog
          reloadDepartmentsList={this.reloadDepartmentsList}
          department={this.state.deptData}
          onClose={this.toggleUpdateDialogVisibility}
        />
      );
    }
  };

  renderDeleteDialog = isVisible => {
    if (isVisible) {
      return (
        <MessageDialog
          title="Delete Department"
          content="Are you sure you want to delete this department?"
          positiveAction="Confirm"
          negativeAction="Cancel"
          action={this.deleteDepartment}
          onClose={this.toggleDeleteDialogVisibility}
        />
      );
    }
  };

  render() {
    const { classes } = this.props;
    const { snackbar } = this.state;

    // initialise query to get list of all departments
    const deptList = gql`
      {
        departments {
          _id
          name
          description
        }
      }
    `;
    const deletedept = gql`
      mutation deleteDepartment($_id: ID!) {
        deleteDepartment(_id: $_id) {
          _id
        }
      }
    `;

    const header1 = "Dept";
    const header2 = "Add new department";

    return (
      <div>
        {this.renderUpdateDialog(this.state.updateDialogOpen)}
        {this.renderDeleteDialog(this.state.deleteDialogOpen)}
        <ExpansionPanel
          headers={header1}
          header={header2}
          directingValue={EXPANSION_DEPARTMENT_FORM}
          reloadList={this.reloadDepartmentsList}
        />

        <Query query={deptList}>
          {({ data, loading, error, refetch }) => {
            this.refetchDepartmentsList = refetch;

            return (
              <GridContainer>
                {!loading
                  ? data.departments.map(department => {
                      return (
                        <React.Fragment key={department._id}>
                          <GridItem xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                              <CardBody>
                                <h4 className={classes.cardTitle}>
                                  {department.name}
                                </h4>
                                <p className={classes.cardCategory}>
                                  {department.description}
                                </p>
                              </CardBody>
                              <CardFooter>
                                <Mutation mutation={deletedept}>
                                  {deleteDepartment => (
                                    <IconButton
                                      onClick={e =>
                                        this.handleDelete(
                                          deleteDepartment,
                                          department
                                        )
                                      }
                                    >
                                      <DeleteForeverIcon
                                        className={classes.icon}
                                      />
                                    </IconButton>
                                  )}
                                </Mutation>
                                <Button
                                  size={"small"}
                                  color="primary"
                                  variant={"outlined"}
                                  style={{ marginLeft: "auto" }}
                                  onClick={e => this.handleUpdate(department)}
                                >
                                  Manage
                                </Button>
                              </CardFooter>
                            </Card>
                          </GridItem>
                        </React.Fragment>
                      );
                    })
                  : ""}
              </GridContainer>
            );
          }}
        </Query>
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
      </div>
    );
  }
}

DeptManage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DeptManage);
