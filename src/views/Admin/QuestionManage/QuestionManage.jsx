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
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Button from "components/CustomButtons/Button.jsx";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";


import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import Management from "../../Components/Management";
import Expansionpanel from "../../../components/ExpansionPanel/Expansionpanel";

class Dashboard extends React.Component {
  render() {
    const { classes } = this.props;
    const header1='Quiz';
    const header2='Create & Assign Quiz';
 
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Expansionpanel headers={header1} header={header2} Footer1={"Cancel"} Footer2={"Assign"} directingValue={"1"}/>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Management />
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
