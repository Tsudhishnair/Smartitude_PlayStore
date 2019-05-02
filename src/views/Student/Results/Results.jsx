import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardIcon from "components/Card/CardIcon.jsx";

import Danger from "components/Typography/Danger.jsx";
import Store from "@material-ui/icons/People";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Icon from "@material-ui/core/Icon";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import MUIDataTable from "mui-datatables";
import CardBody from "../../../components/Card/CardBody";
import gql from "graphql-tag";
let datalist = [];
datalist = [
  [
    "1",
    "Quiz 1",
    "Be the top in this quiz and get place in Musigma",
    "100",
    "200"
  ],
  [
    "1",
    "Quiz 1",
    "Be the top in this quiz and get place in Musigma",
    "100",
    "200"
  ],
  [
    "1",
    "Quiz 1",
    "Be the top in this quiz and get place in Musigma",
    "100",
    "200"
  ]
];
const MY_ATTEMPTED_QUIZ = gql`
  mutation myAttemptedAdminQuizzes {
    myAttemptedAdminQuizzes {
      quiz {
        name
        description
        sections {
          category
          questions {
            question
            options
            correctOption
            solution
          }
        }
      }
      totalScore
      totalMaximumScore
    }
  }
`;
class Results extends React.Component {
  constructor(props) {
    super(props);
    this.options = {
      filterType: "checkbox",
      rowsPerPage: 20,
      elevation: 0,
      print: false,
      download: false,
      responsive: "scroll",
      pagination: false,
      filter: false,
      viewColumns: false,
      selectableRows: false,
      rowsPerPageOptions: [20, 30, 100, 200],
      onRowClick: (rowData, rowState) => {
        if (!this.rowSelected) {
          this.handleRowClick(rowState.dataIndex);
        }
      }
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card Green>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>grade</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Current Score</p>
                <h3 className={classes.cardTitle}>4.9/10</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Danger>
                    <Warning />
                  </Danger>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    Prepare More
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Ranking</p>
                <h3 className={classes.cardTitle}>420th</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Last 24 Hours
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>info_outline</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Attempted Quizzes</p>
                <h3 className={classes.cardTitle}>12</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  Last one at 11/04/19
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <LocalOffer />
                </CardIcon>
                <p className={classes.cardCategory}>Followers</p>
                <h3 className={classes.cardTitle}>+245</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  Just Updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card className={classes.root}>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Attempted Quizzes</h4>
              </CardHeader>
              <MUIDataTable
                title={""}
                data={datalist}
                columns={["No", "QuizName", "Description", "Score", "Rank"]}
                options={this.options}
              />
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(dashboardStyle)(Results);
