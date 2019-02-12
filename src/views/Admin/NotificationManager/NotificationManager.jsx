import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";


import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class NotifManage extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <div>
      </div>
    );
  }
}

NotifManage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(NotifManage);
