import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import { IconButton, Snackbar } from "@material-ui/core";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
// @material-ui/icons
import Button from "components/CustomButtons/Button.jsx";
// import Button from '@material-ui/core/Button';

// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import Expansionpanel from "../../../components/ExpansionPanel/Expansionpanel";
import { EXPANSION_DEPARTMENT_FORM } from "../../../Utils";
import DeptDialog from "./DeptDialog";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import MessageDialog from "../../../components/Dialog/MessageDialog";

import CustomSnackbar from "../../../components/Snackbar/CustomSnackbar";

class DeptManage extends React.Component {
  constructor(props) {
    super(props);
    //state to manage department dialog
    this.state = {
      updateDialogOpen: false,
      deleteDialogOpen: false,
      deptData: {},
      snackbar: {
        open: false
      },
      error: {
        message: ""
      }
    };

    this.deptToBeDeleted;

    this.deptDeleteMutation;
  }

  openSnackbar = () => {
    this.setState({
      snackbar: {
        ...this.state.snackbar,
        open: true
      }
    });
  };

  closeSnackbar = () => {
    this.setState({
      snackbar: {
        ...this.state.snackbar,
        open: false
      }
    });
  };

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

  deleteDepartment = () => {
    this.deptDeleteMutation({
      variables: {
        _id: this.deptToBeDeleted._id
      }
    })
      .then(res => console.log(res))
      .catch(err => {
        this.setState({
          error: {
            message: !!err.graphQLErrors
              ? err.graphQLErrors[0].message
              : err.networkError
          }
        });

        this.openSnackbar();
      })
      .finally(this.toggleDeleteDialogVisibility());
  };

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

  renderUpdateDialog = isVisible => {
    if (isVisible) {
      return (
        <DeptDialog
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
        <Expansionpanel
          headers={header1}
          header={header2}
          directingValue={EXPANSION_DEPARTMENT_FORM}
        />

        <Query query={deptList}>
          {({ data, loading, error }) => {
            return (
              <GridContainer>
                {!loading
                  ? data.departments.map(department => {
                      return (
                        <React.Fragment key={department._id}>
                          <GridItem xs={12} sm={6} md={4}>
                            <Card>
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
                                  {deleteDepartment => {
                                    return (
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
                                    );
                                  }}
                                </Mutation>
                                <Button
                                  round
                                  color="success"
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
          open={this.state.snackbar.open}
          autoHideDuration={6000}
        >
          <CustomSnackbar
            onClose={this.closeSnackbar}
            variant="error"
            message={this.state.error.message}
          />
        </Snackbar>
      </div>
    );
  }
}

DeptManage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(DeptManage);
