import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import Exp from "../../../components/ExpansionPanel/Expansionpanel";
import EnhancedTable from "../../Components/Management/Management";
class Dashboard extends React.Component {
  render() {
    const { classes } = this.props;
    const header1 = 'Student';
    const header2 = 'Add a new student';


    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Exp headers={header1} header={header2} Footer1={"Cancel"} Footer2={"Assign"} directingValue={"4"} />
            <Exp headers={"Multiple Student"} header={"Add groups of students"} Footer1={"Cancel"} Footer2={"Assign"} directingValue={"3"} />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>

            <EnhancedTable test={"Q"} />
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
