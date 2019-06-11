import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import GridContainer from "components/Grid/GridContainer.jsx";
import lock from "assets/img/drawable/error404.png";
import Button from "components/CustomButtons/Button.jsx";
import Spacing from "../../components/Spacing/Spacing";
import { Link } from "react-router-dom";
import {Card, Typography} from "@material-ui/core";
import GridItem from "../../components/Grid/GridItem";
import componentsStyle from "../../assets/jss/material-dashboard-react/views/landingPage.jsx";

class ErrorPage extends React.Component {
  state = {
    value: 0
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Spacing />
        <GridContainer justify="center" className={classes.container}>
          <img
            style={{ width: "608px", height: "400px"}}
            src={lock}
            alt="ERROR 404"
          />
          <GridItem xs={12} sm={12} md={12} justify="center">
              <Typography variant={"h5"} align={"center"} className={classes.subtitle}>Page not found!</Typography>
            <br />
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <Link to="/">
            <Button round color="warning">
              Go Home
            </Button>
          </Link>
        </GridContainer>
      </div>
    );
  }
}

ErrorPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(componentsStyle)(ErrorPage);
