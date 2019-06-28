import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Button from "components/CustomButtons/Button.jsx";
// core components
import { CircularProgress, Typography, Grow, Icon } from "@material-ui/core";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import dashboardStyle from "../../../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

// Query to retrive top ten rankers
const TOP_TEN_RANKERS = gql`
  {
    topTenRankers {
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

class AdminDashboard extends React.Component {
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
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardBody>
                <p className={classes.cardCategory}>
                  Choose your desired settings from below
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
                            Student Management
                          </h4>
                          <p className={classes.cardCategoryWhite}>
                            Add, Remove and Manage Students
                          </p>
                        </CardBody>
                        <CardFooter>
                          <Icon style={{ color: "white" }}>school</Icon>
                          <Link to="/admin/student_management">
                            <Button
                              round
                              color="success"
                              style={{
                                background: "transparent",
                                marginLeft: "auto"
                              }}
                            >
                              Manage
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
                            Notification
                          </h4>
                          <p className={classes.cardCategoryWhite}>
                            Send Notifications for students and faculty and
                            Manage them
                          </p>
                        </CardBody>
                        <CardFooter>
                          <Icon style={{ color: "white" }}>notifications</Icon>
                          <Link to="/admin/notification_management">
                            <Button
                              round
                              color="info"
                              style={{
                                background: "transparent",
                                marginLeft: "auto"
                              }}
                            >
                              Message
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
                            Quiz Management
                          </h4>
                          <p className={classes.cardCategoryWhite}>
                            Assign quizes to students and manage them
                          </p>
                        </CardBody>
                        <CardFooter>
                          <Icon style={{ color: "white" }}>done_all</Icon>
                          <Link to="/admin/quiz_management">
                            <Button
                              round
                              color="danger"
                              style={{
                                background: "transparent",
                                marginLeft: "auto"
                              }}
                            >
                              Assign
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
        {/* <GridContainer>
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
                  420th<small> Postion</small>
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
        </GridContainer> */}
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
                      toprankers = data.topTenRankers.map((rankers, index) => {
                        let student_rank = [];
                        student_rank.push(index + 1);
                        student_rank.push(rankers.name);
                        student_rank.push(rankers.department.name);
                        student_rank.push(rankers.score);
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
        </GridContainer>
      </div>
    );
  }
}

AdminDashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(AdminDashboard);
