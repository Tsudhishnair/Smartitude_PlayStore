import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import GridContainer from "components/Grid/GridContainer.jsx";
import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import lock from "assets/img/drawable/error404.png";
import Button from "components/CustomButtons/Button.jsx";
import Spacing from "../../components/Spacing/Spacing";

class ErrorPage extends React.Component {
  state = {
    value: 0
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Spacing />
        <GridContainer justify="center">
          <img
            style={{ width: "620px", maxWidth: "85%", height: "400px" }}
            src={lock}
            alt="..."
          />
        </GridContainer>
        <GridContainer justify="center">
          <Button round color="warning">
           Go Home
          </Button>
        </GridContainer>
      </div>
    );
  }
}

ErrorPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(ErrorPage);
