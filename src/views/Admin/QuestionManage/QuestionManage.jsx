import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import Expansionpanel from "../../../components/ExpansionPanel/Expansionpanel";

class Dashboard extends React.Component {
  render() {
    const { classes } = this.props;
    const header1 = 'Quiz';
    const header2 = 'Create & Assign Quiz';


    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Expansionpanel headers={header1} header={header2} Footer1={"Cancel"} Footer2={"Assign"} directingValue={"1"} />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
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
