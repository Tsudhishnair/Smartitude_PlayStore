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
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import Expansionpanel from "../../../components/ExpansionPanel/Expansionpanel";
import { EXPANSION_DEPARTMENT_FORM } from "../../../Utils";

import { Query } from "react-apollo";
import gql from "graphql-tag";

class DeptManage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    // initialise query to get list of all departments
    const deptList = gql`
      {
        departments {
          _id
          name
          description
        }
      }
    `;

    const header1 = "Dept";
    const header2 = "Add new department";

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

        <Query query={deptList}>
          {({ data, loading, error }) => {
            return (
              <GridContainer>
                {!loading
                  ? data.departments.map(department => {
                      return (
                        <React.Fragment key={department._id}>
                          <GridItem xs={12} sm={6} md={4}>
                            <Card>
                              <CardBody>
                                <h4 className={classes.cardTitle}>
                                  {department.name}
                                </h4>
                                <p className={classes.cardCategory}>
                                  {department.description}
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
                          </GridItem>
                        </React.Fragment>
                      );
                    })
                  : ""}
              </GridContainer>
            );
          }}
        </Query>
      </div>
    );
  }
}

DeptManage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(DeptManage);
