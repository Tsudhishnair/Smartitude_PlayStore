import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Button from "components/CustomButtons/Button.jsx";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Grow from "@material-ui/core/Grow";
import dashboardStyle from "../../../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { Link, Redirect } from "react-router-dom";
import gql from "graphql-tag";
import { CircularProgress } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Mutation, Query } from "react-apollo";

//mutation for generating random quiz questions
const RANDOM_QUIZ = gql`
  mutation generateRandomQuiz {
    generateRandomQuiz {
      _id
      questions {
        _id
        question
        options
        correctOption
        solution
        category {
          _id
          name
        }
        subcategory {
          _id
          name
        }
      }
    }
  }
`;
// Query to retrive top ten rankers
const TOP_TEN_RANKERS = gql`
  {
    topTenRankersStudent {
      name
      department {
        name
      }
      score
    }
  }
`;
//date for displaying in top rankers
// complete data month year time fields are included in todays_date
let todays_date = new Date();
//data_tdy contains todays day in integer
let date_tdy = todays_date.getDate();

//data_tdy contains current month in integer
let month = todays_date.getMonth() + 1;

//data_tdy contains current year in integer
let year = todays_date.getFullYear();

//stores the questions
class StudentDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      loading: false,
      value: 0,
      _id:0,
      RandomQuizQuestion: [],
      //checks the state to redirect to next page
      redirector: false
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  handleRandomQuizCreate = generateRandomQuiz => {
    this.setState({
      loading: true
    });
    generateRandomQuiz();
  };

  handleMutationComplete = data => {
    const quizIdVal = data._id;
    const sectionFormattedData = {
      sections: [
        {
          category: {
            name: "Quick Random Quiz"
          },
          questions: data.questions
        }
      ]
    };
    console.log("Section wise formatted data: ");
    console.log(sectionFormattedData);
    this.setState(prevState => ({
      ...prevState,
      _id:quizIdVal,
      RandomQuizQuestion: sectionFormattedData,
      redirector: true
    }));
  };
  render() {
    const { classes } = this.props;
    const { loading } = this.state;
    if (this.state.redirector === true) {
      return (
        <Redirect
          push
          to={{
            pathname: "/student/quiz",
            state: {
              
              ...this.state.RandomQuizQuestion
            }
          }}
        />
      );
    }
    return (
      <div>
        {/* <GridContainer> */}
          {/* <GridItem xs={12} sm={6} md={5}>
            <Card Green>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>grade</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Current Score</p>
                <h3 className={classes.cardTitle}>
                  4.9/10 <small>points</small>
                </h3>
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
          </GridItem> */}
          {/* <GridItem xs={12} sm={6} md={5}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Ranking</p>
                <h3 className={classes.cardTitle}>
                  420th
                  <small>Postion</small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Last 24 Hours
                </div>
              </CardFooter>
            </Card>
          </GridItem> */}
        {/* </GridContainer> */}
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardBody>
                <h4 className={classes.cardTitle}>Take a Test</h4>
                <p className={classes.cardCategory}>
                  Choose your desired test type below
                </p>
                <GridContainer>
                  <GridItem xs={12} sm={6} md={4}>
                    <Grow in={true}>
                      <Card
                        style={{
                          background:
                            "linear-gradient(60deg, #66bb6a, #43a047)",
                          height: "180px"
                        }}
                      >
                        <CardBody>
                          <h4 className={classes.cardTitleWhite}>
                            Custom Quiz
                          </h4>
                          <p className={classes.cardCategoryWhite}>
                            Create a customised quiz from a set of categories
                          </p>
                        </CardBody>
                        <CardFooter>
                          <Icon style={{ color: "white" }}>build</Icon>
                          <Link to="/student/custom_quiz_setup">
                            <Button
                              round
                              color="success"
                              style={{
                                background: "transparent",
                                marginLeft: "auto"
                              }}
                            >
                              Create Quiz
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    </Grow>
                  </GridItem>
                  <GridItem xs={12} sm={6} md={4}>
                    <Grow
                      in={true}
                      style={{ transformOrigin: "0 0 0" }}
                      {...(true ? { timeout: 500 } : {})}
                    >
                      <Card
                        style={{
                          background:
                            "linear-gradient(60deg, #26c6da, #00acc1)",
                          height: "180px"
                        }}
                      >
                        <CardBody>
                          <h4 className={classes.cardTitleWhite}>
                            Random Quiz
                          </h4>
                          <p className={classes.cardCategoryWhite}>
                            Create a quick random quiz of set questions
                          </p>
                        </CardBody>
                        <CardFooter>
                          <Icon style={{ color: "white" }}>cached</Icon>
                          <Mutation
                            mutation={RANDOM_QUIZ}
                            onCompleted={({ generateRandomQuiz }) => {
                              this.handleMutationComplete(generateRandomQuiz);
                            }}
                          >
                            {(generateRandomQuiz, { data }) => {
                              return (
                                <div className={classes.wrapper}>
                                  <Button
                                    round
                                    color="info"
                                    disabled={loading}
                                    style={{
                                      background: "transparent",
                                      marginLeft: "auto"
                                    }}
                                    onClick={e => {
                                      this.handleRandomQuizCreate(
                                        generateRandomQuiz
                                      );
                                    }}
                                  >
                                    Take Quiz
                                  </Button>
                                  {loading && (
                                    <CircularProgress
                                      size={26}
                                      className={classes.buttonProgress}
                                    />
                                  )}
                                </div>
                              );
                            }}
                          </Mutation>
                        </CardFooter>
                      </Card>
                    </Grow>
                  </GridItem>
                  <GridItem xs={12} sm={6} md={4}>
                    <Grow
                      in={true}
                      style={{ transformOrigin: "0 0 0" }}
                      {...(true ? { timeout: 1500 } : {})}
                    >
                      <Card
                        style={{
                          background:
                            "linear-gradient(60deg, #ef5350, #e53935)",
                          height: "180px"
                        }}
                      >
                        <CardBody>
                          <h4 className={classes.cardTitleWhite}>
                            Assigned Quizzes
                          </h4>
                          <p className={classes.cardCategoryWhite}>
                            Attempt assigned quizzes
                          </p>
                        </CardBody>
                        <CardFooter>
                          <Icon style={{ color: "white" }}>done_all</Icon>
                          <Link to="/student/assigned_quizzes">
                            <Button
                              round
                              color="danger"
                              style={{
                                background: "transparent",
                                marginLeft: "auto"
                              }}
                            >
                              View Quizzes
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    </Grow>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Top Rankers</h4>
                <p className={classes.cardCategoryWhite}>
                  <strong>
                    Top rankers as on {date_tdy}/{month} /{year}
                  </strong>
                </p>
              </CardHeader>
              <CardBody>
                <Query query={TOP_TEN_RANKERS}>
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
                      let toprankers = [];
                      toprankers = data.topTenRankersStudent.map((rankers, index) => {
                        let student_rank = [];
                        student_rank.push(index + 1);
                        student_rank.push(rankers.name);
                        student_rank.push(rankers.department.name);
                        student_rank.push(rankers.score.toFixed(2));
                        return student_rank;
                      });
                      return (
                        <Table
                          tableHeaderColor="warning"
                          tableHead={["No", "Name", "Department", "Score"]}
                          tableData={toprankers}
                        />
                      );
                    }
                  }}
                </Query>
              </CardBody>
            </Card>
          </GridItem>
          {/* <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={emailsSubscriptionChart.data}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Previous Score History</h4>
                <p className={classes.cardCategory}>Last Quiz Performance</p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> quiz attempted 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem> */}
        </GridContainer>
      </div>
    );
  }
}

StudentDashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(StudentDashboard);
