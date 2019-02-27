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
import { EXPANSION_DEPARTMENT_FORM } from "../../../Utils";

class DeptManage extends React.Component {
  render() {
    const { classes } = this.props;
    let header1 = "Dept";
    let header2 = "Add new department";
    let data = [
      {
        dept_id: "124",
        dept_name: "Computer Science",
        dept_desc:
          "Division of Computing Sciences laid its foundation stone in the year 2001 with the commencement of a B. Tech. programme in Computer Science & Engineering."
      },
      {
        dept_id: "123",
        dept_name: "Information Technology",
        dept_desc:
          "Division of Computing Sciences laid its foundation stone in the year 2001 with the commencement of a B. Tech. programme in Computer Science & Engineering."
      },
      {
        dept_id: "124",
        dept_name: "Mechanical Engineering",
        dept_desc:
          "Division of Computing Sciences laid its foundation stone in the year 2001 with the commencement of a B. Tech. programme in Computer Science & Engineering."
      }
    ];
    const Frameworks = props => {
      return (
        <React.Fragment>
          {props.items.map(item => (
            <React.Fragment key={item.id}>
              <GridItem xs={12} sm={6} md={4}>
                <Card>
                  <CardBody>
                    <h4 className={classes.cardTitle}>{item.dept_name}</h4>
                    <p className={classes.cardCategory}>{item.dept_desc}</p>
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
              </GridItem>
            </React.Fragment>
          ))}
        </React.Fragment>
      );
    };
    return (
      <div>
        <Expansionpanel
          headers={header1}
          header={header2}
          Footer1={"Cancel"}
          Footer2={"Assign"}
          directingValue={EXPANSION_DEPARTMENT_FORM}
        />
        <GridContainer>
          <Frameworks items={data} />
        </GridContainer>
      </div>
    );
  }
}

DeptManage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(DeptManage);
