import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import MUIDataTable from "mui-datatables";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import ExpansionPanel from "../../../components/ExpansionPanel/Expansionpanel";
import TableDialog from "../../../components/Dialog/DialogFacultyTable";
import Spacing from "../../../components/Spacing/Spacing.jsx";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { EXPANSION_FACULTY_FORM, EXPANSION_FACULTY_BATCH } from "../../../Utils";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 6
  }
});

class Dashboard extends React.Component {
  render() {
    const { classes } = this.props;
    const header1 = "Faculty";
    const header2 = "Add a new faculty member";
    const columns = [
      {
        name: "Name",
        options: {
          filter: false,
          sort: true
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
          filter: true,
          sort: true
        }
      },
      {
        name: "Department",
        options: {
          filter: true,
          sort: true
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

    const dataList = gql`
      {
        faculties {
          _id
          username
          name
          email
          password
          phoneNumber
          department {
            name
          }
          subcategory {
            name
          }
          category {
            name
          }
          isInCharge
          inChargeSubcategories {
            name
          }
        }
      }
    `;

    const options = {
      filterType: "checkbox",
      rowsPerPage: 20,
      elevation: 0,
      rowsPerPageOptions: [20, 30, 100, 200],

      onRowsSelect: (rowsSelected, allRows) => {
        console.log(rowsSelected, allRows);
      },
      onRowClick: (rowData, rowState) => {
        console.log(rowData, rowState);
        this.child.handleClickOpen(rowData);
      }
    };

    return (
      <div>
        <TableDialog onRef={ref => (this.child = ref)} />
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <ExpansionPanel
              headers={header1}
              header={header2}
              directingValue={EXPANSION_FACULTY_FORM}
            />
            <ExpansionPanel
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
                <h4 className={classes.cardTitleWhite}>Faculty List</h4>
              </CardHeader>
              <Query query={dataList}>
                {({ data, loading, error }) => {
                  console.log({ data });
                  return (
                    <MUIDataTable
                      title={""}
                      data={
                        !loading
                          ? data.faculties.map(faculty => {
                              let facultyData = [];
                              facultyData.push(faculty.name);
                              facultyData.push(faculty.username);
                              facultyData.push(faculty.department.name);
                              facultyData.push(faculty.email);
                              facultyData.push(faculty.phoneNumber);
                              if (faculty.category) {
                                facultyData.push(faculty.category.name);
                              }
                              return facultyData;
                            })
                          : ""
                      }
                      columns={columns}
                      options={options}
                    />
                  );
                }}
              </Query>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
