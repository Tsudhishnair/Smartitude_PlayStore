import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/People";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import AccessTime from "@material-ui/icons/AccessTime";
import Button from "components/CustomButtons/Button.jsx";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import {
  emailsSubscriptionChart,
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { Link } from "react-router-dom";

class StudentDashboard extends React.Component {
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={5}>
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
          </GridItem>
          <GridItem xs={12} sm={6} md={5}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Ranking</p>
                <h3 className={classes.cardTitle}>
                  420th
                  <small> Postion</small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Last 24 Hours
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
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
                    <Card
                      style={{
                        background: "linear-gradient(60deg, #66bb6a, #43a047)",
                        height: "180px"
                      }}
                    >
                      <CardBody>
                        <h4 className={classes.cardTitleWhite}>Custom Quiz</h4>
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
                  </GridItem>

                  <GridItem xs={12} sm={6} md={4}>
                    <Card
                      style={{
                        background: "linear-gradient(60deg, #26c6da, #00acc1)",
                        height: "180px"
                      }}
                    >
                      <CardBody>
                        <h4 className={classes.cardTitleWhite}>Random Quiz</h4>
                        <p className={classes.cardCategoryWhite}>
                          Create a quick random quiz of set questions
                        </p>
                      </CardBody>
                      <CardFooter>
                        <Icon style={{ color: "white" }}>cached</Icon>
                        <Button
                          round
                          color="info"
                          style={{
                            background: "transparent",
                            marginLeft: "auto"
                          }}
                          onClick={this.handleRandomQuiz}
                        >
                          Take Quiz
                          </Button>
                      </CardFooter>
                    </Card>
                  </GridItem>
                  <GridItem xs={12} sm={6} md={4}>
                    <Card
                      style={{
                        background: "linear-gradient(60deg, #ef5350, #e53935)",
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
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Top Rankers</h4>
                <p className={classes.cardCategoryWhite}>
                  Top rankers on 15th January, 2019
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["ID", "Name", "Score", "Class"]}
                  tableData={[
                    ["1", "Dakota Rice", "8.7", "S7 EC A"],
                    ["2", "Minerva Hooper", "8.65", "S7 CS A"],
                    ["3", "Sage Rodriguez", "7.4", "S7 IT"],
                    ["4", "Philip Chaney", "7.33", "S7 IT"]
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
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
                <h4 className={classes.cardTitle}>Email Subscriptions</h4>
                <p className={classes.cardCategory}>
                  Last Campaign Performance
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

StudentDashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(StudentDashboard);
