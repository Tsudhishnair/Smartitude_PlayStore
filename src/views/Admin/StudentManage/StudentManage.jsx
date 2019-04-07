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

import ExpansionPanel from "../../../components/ExpansionPanel/Expansionpanel";
import TableDialog from "../../../components/Dialog/DialogStudentTable";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import {
  EXPANSION_STUDENT_BATCH,
  EXPANSION_STUDENT_FORM
} from "../../../Utils";
import { CircularProgress } from "@material-ui/core";
import CardBody from "../../../components/Card/CardBody";

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

const FETCH_STUDENTS = gql`
  {
    students {
      _id
      username
      name
      email
      password
      phoneNumber
      score
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
      sort: false,
      display: false
    }
  },
  {
    name: "Score",
    options: {
      filter: false,
      display: true,
      sort: true
    }
  }
];

class StudentManage extends React.Component {
  students = [];
  rowSelected = false;
  refetchStudentsList = null;

  reloadStudentsList = () => {
    console.log("reloadStudentsList called");
    if (this.refetchStudentsList !== null) {
      this.refetchStudentsList();
    }
  };

  tableOptions = {
    filterType: "checkbox",
    rowsPerPage: 100,
    elevation: 0,
    responsive: "stacked",
    rowsPerPageOptions: [20, 30, 100, 200, 1000, 10000],
    onRowsSelect: (currentRowsSelected, allRowsSelected) => {
      console.log("onRowSelect");
      console.log(allRowsSelected);
      this.rowSelected = allRowsSelected.length > 0;
    },
    onRowClick: (rowData, rowState) => {
      console.log("onRowClick");
      if (!this.rowSelected) {
        const clickedRowIndex = rowState.rowIndex;
        this.child.handleClickOpen(
          this.students[clickedRowIndex],
          this.reloadStudentsList
        );
      }
    }
  };

  render() {
    const { classes } = this.props;
    const header1 = "Student";
    const header2 = "Add a new student";

    return (
      <Fragment>
        <TableDialog onRef={ref => (this.child = ref)} />
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <ExpansionPanel
              headers={header1}
              header={header2}
              reloadList={this.reloadStudentsList}
              directingValue={EXPANSION_STUDENT_FORM}
            />
            <ExpansionPanel
              reloadList={this.reloadStudentsList}
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
              <CardBody>
                <Query query={FETCH_STUDENTS}>
                  {({ data, loading, error, refetch }) => {
                    if (loading) {
                      return <CircularProgress className={classes.progress} />;
                    } else if (error) {
                      return "Error occured!";
                    } else {
                      this.refetchStudentsList = refetch;
                      let studentsList = [];
                      studentsList = data.students.map(student => {
                        let studentData = [];
                        studentData.push(student.name);
                        studentData.push(student.username);
                        studentData.push(student.email);
                        studentData.push(student.department.name);
                        studentData.push(student.batch.toString());
                        studentData.push(student.phoneNumber);
                        studentData.push(student.score);
                        return studentData;
                      });
                      this.students = data.students;
                      return (
                        <MUIDataTable
                          title={""}
                          data={studentsList}
                          columns={columns}
                          options={this.tableOptions}
                        />
                      );
                    }
                  }}
                </Query>
              </CardBody>{" "}
            </Card>
          </GridItem>
        </GridContainer>
      </Fragment>
    );
  }
}

StudentManage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StudentManage);
