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

import Exp from "../../../components/ExpansionPanel/Expansionpanel";
import TableDialog from "../../../components/Dialog/DialogStudentTable";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import {
  EXPANSION_STUDENT_BATCH,
  EXPANSION_STUDENT_FORM
} from "../../../Utils";
import { CircularProgress } from "@material-ui/core";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 6
  },
  progress: {
    margin: theme.spacing.unit * 10,
    marginLeft: theme.spacing.unit * 20
  }
});
class Dashboard extends React.Component {
  students = [];

  rowSelected = false;

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
          sort: true,
          display: false
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
          display: false,
          sort: true
        }
      }
    ];

    const FETCH_STUDENTS = gql`
      {
        students {
          _id
          username
          name
          email
          password
          phoneNumber
          department {
            _id
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
      onRowsSelect: (currentRowsSelected, allRowsSelected) => {
        console.log("onRowSelect");
        console.log(allRowsSelected);
        this.rowSelected = allRowsSelected.length > 0;
      },
      onRowClick: (rowData, rowMeta) => {
        console.log("onRowClick");
        if (!this.rowSelected) {
          const clickedRowIndex = rowMeta.rowIndex;
          this.child.handleClickOpen(this.students[clickedRowIndex]);
        }
      }
    };

    return (
      <Fragment>
        <TableDialog onRef={ref => (this.child = ref)} />
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Exp
              headers={header1}
              header={header2}
              directingValue={EXPANSION_STUDENT_FORM}
            />
            <Exp
              headers={"Multiple Student"}
              header={"Add groups of students"}
              directingValue={EXPANSION_STUDENT_BATCH}
            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card className={classes.root}>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Student List</h4>
              </CardHeader>
              <Query query={FETCH_STUDENTS}>
                {({ data, loading, error }) => {
                  if (loading) {
                    return <CircularProgress className={classes.progress} />;
                  } else if (error) {
                    return "Error occured!";
                  } else {
                    let studentsList = [];
                    studentsList = data.students.map(student => {
                      let studentData = [];
                      studentData.push(student.name);
                      studentData.push(student.username);
                      studentData.push(student.email);
                      studentData.push(student.department.name);
                      studentData.push(student.batch.toString());
                      studentData.push(student.phoneNumber);
                      studentData.push(student.phoneNumber);
                      return studentData;
                    });
                    this.students = data.students;
                    return (
                      <MUIDataTable
                        title={""}
                        data={studentsList}
                        columns={columns}
                        options={options}
                      />
                    );
                  }
                }}
              </Query>
            </Card>
          </GridItem>
        </GridContainer>
      </Fragment>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
