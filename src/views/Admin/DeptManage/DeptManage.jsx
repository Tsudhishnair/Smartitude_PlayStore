import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Button from "components/CustomButtons/Button.jsx";

// core components
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import Expansionpanel from "../../../components/ExpansionPanel/Expansionpanel";
import Grow from "../AdminDashboard/AdminDashboard";
import { Link } from "react-router-dom";

class DeptManage extends React.Component {
  render() {
    const { classes } = this.props;
    let header1 = "Dept";
    let header2 = "Add new department";
    return (
      <div>
        <Expansionpanel
          headers={header1}
          header={header2}
          Footer1={"Cancel"}
          Footer2={"Assign"}
          directingValue={"5"}
        />
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Take a Test</h4>
                <p className={classes.cardCategoryWhite}>
                  Choose your desired test type below
                </p>
              </CardHeader>
              <CardBody>
                {/* <h3 className={classes.cardTitle}>Dashboard</h3> */}
                <p className={classes.cardCategory}>
                  Choose your desired settings from below
                </p>
                <GridContainer>
                  <GridItem xs={12} sm={6} md={4}>
                    <Grow in={true}>
                      <Card>
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
                          <Button
                            round
                            color="success"
                            style={{ marginLeft: "auto" }}
                          >
                            Manage
                          </Button>
                        </CardFooter>
                      </Card>
                    </Grow>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

DeptManage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(DeptManage);
