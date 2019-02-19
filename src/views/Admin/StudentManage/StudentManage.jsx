import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import MUIDataTable from "mui-datatables";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import Exp from "../../../components/ExpansionPanel/Expansionpanel";
import TableDialog from "../../../components/Dialog/DialogStudentTable";

import { Query } from "react-apollo";
import gql from "graphql-tag";

import { ApolloProvider } from "react-apollo";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 6
  }
});
class Dashboard extends React.Component {
  render() {
    const { classes } = this.props;
    const header1 = "Student";
    const header2 = "Add a new student";
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
        name: "Department",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "Batch",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "Phone",
        options: {
          filter: false,
          sort: false
        }
      },
      {
        name: "Rank",
        options: {
          filter: false,
          sort: true
        }
      },
      {
        name: "Score",
        options: {
          filter: false,
          sort: true
        }
      }
    ];

    const dataList = gql`
      {
        students {
          _id
          username
          name
          email
          password
          phoneNumber
          department {
            name
          }
          batch
          attemptedAdminQuizzes
          attemptedCustomQuizzes
        }
      }
    `;
 

    const options = {
      filterType: "checkbox",
      rowsPerPage: 20,
      elevation: 0,
      rowsPerPageOptions: [20, 30, 100, 200],

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
            <Exp
              headers={header1}
              header={header2}
              Footer1={"Cancel"}
              Footer2={"Assign"}
              directingValue={"4"}
            />
            <Exp
              headers={"Multiple Student"}
              header={"Add groups of students"}
              Footer1={"Cancel"}
              Footer2={"Assign"}
              directingValue={"3"}
            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card className={classes.root}>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Student List</h4>
              </CardHeader>
              <Query query={dataList}>
                {({ data, loading, error }) => {
                
                  return (
                    <MUIDataTable
                      title={""}
                      data={ !loading ? data.students.map(student => {
                        let studentData = [];
                        studentData.push(student.name);
                        studentData.push(student.username);
                        studentData.push(student.department.name);
                        studentData.push(student.email);
                        studentData.push(student.phoneNumber);
                        studentData.push(student.batch.toString());
                        return studentData;
                        
                      }) : "" }
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

export default withStyles(styles)(Dashboard);
