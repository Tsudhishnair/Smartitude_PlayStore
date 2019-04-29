import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/People";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
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
import Grow from "@material-ui/core/Grow";

import dashboardStyle from "../../../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

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
                                marginLeft: "auto" }}
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
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
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
        </GridContainer>
      </div>
    );
  }
}

AdminDashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(AdminDashboard);
