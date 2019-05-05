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
import Warning from "@material-ui/icons/Warning";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Icon from "@material-ui/core/Icon";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import MUIDataTable from "mui-datatables";
import { CircularProgress } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import gql from "graphql-tag";
import { Query } from "react-apollo";
// RealScore is used for calulating the average score and displaying them
let realscore = 0;
//RealAttemptedQuizNo is used for calulating and displaying the number of admin assigned quizes
let realAttemptedQuizNo = 0;
// Header Data is used to stores the avg score and no of admin quizes atempted
let HeaderData = [];
// Query to obtain the enitre data on the set of quizes which the student have attended
const MY_ATTEMPTED_QUIZ = gql`
  {
    myAttemptedAdminQuizzes {
      quiz {
        name
        description
        sections {
          markPerQuestion
          negativeMarkPerQuestion
        }
      }
      totalScore
      attemptedSections {
        category {
          name
        }
        timeTaken
        attemptedQuestions {
          question{
            question
            options
            correctOption
            solution 
          }
          markedOption
          correctness
        }
        sectionScore
        sectionMaximumScore
      }
      totalMaximumScore
      attemptedAt
    }
  }
`;
class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      NoOfAttemptedQuiz: 0,
      avgScore: 0
    };
    // Properties of the miui data table used for displaying the attempted quizes
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
      rowsPerPageOptions: [20, 30, 100, 200]
      // onRowClick: (rowData, rowState) => {
      //   if (!this.rowSelected) {
      //     this.handleRowClick(rowState.dataIndex);
      //   }
      // }
    };
  }
  //sets state of the header fields such as total no of attempted questions and total score
  displayDataHeader = data => {
    this.setState(prevState => ({
      ...prevState,
      score: data[0],
      NoOfAttemptedQuiz: data[1],
      avgScore: (data[0] / data[1]).toFixed(2)
    }));
  };
  render() {
    const { classes } = this.props;

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={6}>
            <Card Green>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>grade</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Current Avg. Score</p>
                <h3 className={classes.cardTitle}>{this.state.avgScore}</h3>
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
          {/* <GridItem xs={12} sm={6} md={3}>
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
          </GridItem> */}
          <GridItem xs={12} sm={6} md={6}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>info_outline</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Attempted Quizzes</p>
                <h3 className={classes.cardTitle}>
                  {this.state.NoOfAttemptedQuiz}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  Last updated at 3/5/2019
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          {/* <GridItem xs={12} sm={6} md={3}>
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
          </GridItem> */}
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card className={classes.root}>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Attempted Quizzes</h4>
              </CardHeader>
              <Query query={MY_ATTEMPTED_QUIZ}>
                {({ data, loading, error }) => {
                  if (loading) {
                    return <CircularProgress className={classes.progress} />;
                  } else if (error) {
                    return (
                      <Typography>
                        Error occured while fetching data.
                      </Typography>
                    );
                  } else {
                    let AttemptedQuizData = [];
                    AttemptedQuizData = data.myAttemptedAdminQuizzes.map(
                      (AttemptedData, index) => {
                        let eachAttemptedQuiz = [];
                        eachAttemptedQuiz.push(index + 1);
                        eachAttemptedQuiz.push(AttemptedData.quiz.name);
                        eachAttemptedQuiz.push(AttemptedData.quiz.description);
                        eachAttemptedQuiz.push(AttemptedData.totalScore);
                        eachAttemptedQuiz.push(AttemptedData.totalMaximumScore);
                        return eachAttemptedQuiz;
                      }
                    );
                    for (let index in AttemptedQuizData) {
                      realscore = realscore + AttemptedQuizData[index][3];
                      realAttemptedQuizNo = AttemptedQuizData[index][0];
                    }

                    HeaderData.push(realscore);
                    HeaderData.push(realAttemptedQuizNo);
                    if (this.state.NoOfAttemptedQuiz != HeaderData[1]) {
                      this.displayDataHeader(HeaderData);
                    }
                    return (
                      <MUIDataTable
                        title={""}
                        data={AttemptedQuizData}
                        columns={[
                          "NO",
                          "Quiz Name",
                          "Description",
                          "Score Obtained",
                          "Max Score"
                        ]}
                        options={this.options}
                      />
                    );
                  }
                }}
              </Query>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(dashboardStyle)(Results);
