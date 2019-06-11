import React, { Fragment } from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import MUIDataTable from "mui-datatables";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import {
  Button,
  CircularProgress,
  Divider,
  ExpansionPanelActions,
  Snackbar
} from "@material-ui/core";
import ExpansionPanel from "../../../components/ExpansionPanel/Expansionpanel";
import TableDialog from "../../../components/Dialog/DialogFacultyTable";
import Spacing from "../../../components/Spacing/Spacing.jsx";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import {
  EXPANSION_FACULTY_BATCH,
  EXPANSION_FACULTY_FORM
} from "../../../Utils";
import CardBody from "../../../components/Card/CardBody";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import CustomSnackbar from "../../../components/Snackbar/CustomSnackbar";
import MessageDialog from "../../../components/Dialog/MessageDialog";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 6
  },
  progress: {
    margin: theme.spacing.unit * 10,
    marginLeft: "45%"
  }
});

const myTheme = createMuiTheme({
  overrides: {
    MUIDataTable: {
      responsiveScroll: {
        maxHeight: "none"
      }
    }
  }
});

const MULTIPLE_DELETE = gql`
  mutation deleteMultipleFaculties($_ids: [ID!]!) {
    deleteMultipleFaculties(_ids: $_ids)
  }
`;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //handle visibility of dialog
      isVisible: false,
      snackbar: {
        open: false,
        variant: "success",
        message: ""
      }
    };
    this.faculties = [];
    this.departments = [];
    this.categories = [];
    this.subcategories = [];
    this.categoryDetails = [];
    this.refetchFacultiesList = null;
    this.deleteFacultiesList = [];
    this.deleteMutation;
  }
  toggleDialogVisibility = () => {
    this.setState(prevState => ({
      isVisible: !prevState.isVisible
    }));
  };
  reloadFacultiesList = () => {
    console.log("reloadFacultiesList called");
    if (this.refetchFacultiesList !== null) {
      this.refetchFacultiesList();
    }
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
  //Deleting Faculties complete Details
  handleDelete = deleteFacultyIds => {
    console.log(deleteFacultyIds + "Deleted");
    this.deleteMutation({
      variables: {
        _ids: deleteFacultyIds
      }
    })
      .then(res => {
        this.setState(
          {
            snackbar: {
              ...this.state.snackbar,
              message: "Faculty Deleted Successfully !"
            }
          },
          () => this.openSnackbar()
        );
        this.reloadFacultiesList();
      })
      .catch(err => {
       console.log(err);
      });
  };
  render() {
    const { classes } = this.props;
    const { loading, snackbar } = this.state;
    const header1 = "Faculty";
    const header2 = "Add a new faculty member";
    const columns = [
      {
        name: "Name",
        options: {
          filter: false,
          sort: true,
          sortDirection: "desc"
        }
      },
      {
        name: "Username",
        options: {
          filter: false,
          sort: true
        }
      },
      {
        name: "Role",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "Email",
        options: {
          filter: false,
          sort: true
        }
      },
      {
        name: "Department",
        options: {
          filter: true,
          sort: true,
          display: false
        }
      },
      {
        name: "Assigned Category",
        options: {
          filter: true,
          sort: true
        }
      }
    ];

    const FETCH_DATA = gql`
      {
        departments {
          _id
          name
          description
        }
        categoryDetailsList {
          category {
            _id
            name
            description
          }
          subcategory {
            _id
            name
            description
          }
        }
      }
    `;
    const FETCH_FACULTIES_LIST = gql`
      {
        faculties {
          _id
          username
          name
          email
          phoneNumber
          department {
            _id
            name
          }
          subcategory {
            _id
            name
          }
          category {
            _id
            name
          }
          isInCharge
          inChargeSubcategories {
            _id
            name
          }
        }
      }
    `;

    const options = {
      filterType: "checkbox",
      rowsPerPage: 20,
      responsive: "scroll",
      elevation: 0,
      rowsPerPageOptions: [20, 30, 100, 200, 1000],
      onRowsSelect: (currentRowsSelected, allRowsSelected) => {
        console.log("onRowSelect");
        console.log(allRowsSelected);
        this.rowSelected = allRowsSelected.length > 0;
      },
      onRowsDelete: rowsDeleted => {
        let data = rowsDeleted.data;
        for (let index in data) {
          this.deleteFacultiesList.push(
            this.faculties[data[index].dataIndex]._id
          );
        }
        this.toggleDialogVisibility();
      },
      onRowClick: (rowData, rowMeta) => {
        if (!this.rowSelected) {
          const clickedRowIndex = rowMeta.dataIndex;
          this.child.handleClickOpen(
            this.faculties[clickedRowIndex],
            this.reloadFacultiesList
          );
        }
      }
    };

    return (
      <Mutation mutation={MULTIPLE_DELETE}>
        {deleteMultipleFaculties => {
          return (
            <Fragment>
              {(this.deleteMutation = deleteMultipleFaculties)}
              {this.state.isVisible ? (
                <MessageDialog
                  title="Faculty Delete"
                  content="Are you sure you want to Delete. Deletion may result in unrecoverable state of the details of the faculty"
                  positiveAction="Delete"
                  negativeAction="Cancel"
                  action={() => {
                    this.handleDelete(this.deleteFacultiesList);
                  }}
                  onClose={this.toggleDialogVisibility}
                />
              ) : null}
              <Query query={FETCH_DATA}>
                {({ data, loading, error }) => {
                  if (loading) {
                    return <CircularProgress className={classes.progress} />;
                  } else if (error) {
                    return "Error occured!";
                  } else {
                    this.departments = data.departments;
                    if (data.categoryDetailsList) {
                      this.categoryDetails = data.categoryDetailsList;
                      return (
                        <Fragment>
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                              <ExpansionPanel
                                headers={header1}
                                header={header2}
                                departments={this.departments}
                                categoryDetails={this.categoryDetails}
                                directingValue={EXPANSION_FACULTY_FORM}
                                reloadList={this.reloadFacultiesList}
                              />
                              <ExpansionPanel
                                reloadList={this.reloadFacultiesList}
                                headers={"Multiple Faculty"}
                                header={"Add groups of faculty"}
                                directingValue={EXPANSION_FACULTY_BATCH}
                              />
                            </GridItem>
                          </GridContainer>
                          <Spacing />
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                              <Card className={classes.root}>
                                <CardHeader color="warning">
                                  <h4 className={classes.cardTitleWhite}>
                                    Faculty List
                                  </h4>
                                </CardHeader>
                                <CardBody>
                                  <Query query={FETCH_FACULTIES_LIST}>
                                    {({ data, loading, error, refetch }) => {
                                      if (loading) {
                                        return "Loading faculty list...";
                                      } else if (error) {
                                        return "Error occured!";
                                      } else {
                                        this.refetchFacultiesList = refetch;
                                        let facultiesList = [];
                                        facultiesList = data.faculties.map(
                                          faculty => {
                                            let facultyData = [];
                                            facultyData.push(faculty.name);
                                            facultyData.push(faculty.username);
                                            facultyData.push(
                                              faculty.isInCharge
                                                ? "In-charge"
                                                : "Faculty"
                                            );
                                            facultyData.push(faculty.email);
                                            facultyData.push(
                                              faculty.department.name
                                            );
                                            if (faculty.category) {
                                              facultyData.push(
                                                faculty.category.name
                                              );
                                            }
                                            return facultyData;
                                          }
                                        );
                                        this.faculties = data.faculties;
                                        return (
                                          <Fragment>
                                            <TableDialog
                                              onRef={ref => (this.child = ref)}
                                              categoryDetails={
                                                this.categoryDetails
                                              }
                                              departments={this.departments}
                                            />
                                            <MuiThemeProvider theme={myTheme}>
                                              <MUIDataTable
                                                title={""}
                                                data={facultiesList}
                                                columns={columns}
                                                options={options}
                                              />
                                            </MuiThemeProvider>
                                          </Fragment>
                                        );
                                      }
                                    }}
                                  </Query>
                                </CardBody>
                              </Card>
                            </GridItem>
                          </GridContainer>
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
                        </Fragment>
                      );
                    }
                  }
                }}
              </Query>
            </Fragment>
          );
        }}
      </Mutation>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
