import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import Expansionpanel from "../../../components/ExpansionPanel/Expansionpanel";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import MUIDataTable from "mui-datatables";
import TableDialog from "../../../components/Dialog/DialogQuizTable";
import Spacing from "../../../components/Spacing/Spacing.jsx";
import { EXPANSION_QUIZ_FORM } from "../../../Utils";
import gql from "graphql-tag";

const QUIZ_VIEW_QUERY = gql`
{
  AdminQuiz{
    _id
    name
    description
    createdBy
    section{
      category
      subcategories{
        _id
        category
        name
      }
    }
    target
    active
    activeTo
    activeFrom
    negativeMarkPerQuestion
    markperQuestion
  }
}
`;
class Dashboard extends React.Component {

  render() {
    const { classes } = this.props;
    const header1 = "Quiz";
    const header2 = "Create & Assign Quiz";
    const columns = [
      {
        name: "QuizName",
        options: {
          filter: false,
          sort: true
        }
      },
      {
        name: "Description",
        options: {
          filter: false,
          sort: true
        }
      },
      {
        name: "Created By",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "Target",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "Active",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "Expiry",
        options: {
          filter: false,
          sort: true
        }
      }
    ];

    const data = [
      ["Joe James", "uxxxxx", "Incharge", "email@abc.com", "IT", "Verbal"],
      ["Joe James", "uxxxxx", "Incharge", "email@abc.com", "IT", "Verbal"],
      ["Joe James", "uxxxxx", "Incharge", "email@abc.com", "IT", "Verbal"],
      ["Joe James", "uxxxxx", "Incharge", "email@abc.com", "IT", "Verbal"],
      ["Joe James", "uxxxxx", "Incharge", "email@abc.com", "IT", "Verbal"],
      ["Joe James", "uxxxxx", "Incharge", "email@abc.com", "IT", "Verbal"],
      ["Joe James", "uxxxxx", "Incharge", "email@abc.com", "IT", "Verbal"],
      ["Joe James", "uxxxxx", "Incharge", "email@abc.com", "IT", "Verbal"],
      ["Joe James", "uxxxxx", "Incharge", "email@abc.com", "IT", "Verbal"],
      ["Joe James", "uxxxxx", "Incharge", "email@abc.com", "IT", "Verbal"],
      ["Joe James", "uxxxxx", "Incharge", "email@abc.com", "IT", "Verbal"],
      ["Joe James", "uxxxxx", "Incharge", "email@abc.com", "IT", "Verbal"],
      ["Joe James", "uxxxxx", "Incharge", "email@abc.com", "IT", "Verbal"]
    ];

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
        <TableDialog onRef={ref => (this.child = ref)}/>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Expansionpanel
              headers={header1}
              header={header2}
              directingValue={EXPANSION_QUIZ_FORM}
            />
          </GridItem>
        </GridContainer>
        <Spacing />
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card className={classes.root}>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Quizzes</h4>
              </CardHeader>
              <MUIDataTable
                title={""}
                data={data}
                columns={columns}
                options={this.options}
              />
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
