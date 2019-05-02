import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/HomeHeader/HomeHeader.jsx";
import HeaderLinks from "../../components/HomeHeader/HeaderLinks.jsx";
import Spacing from "../../components/Spacing/Spacing";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Parallax from "../../components/Parallax/Parallax";
import ProductSection from "./ContentSection";

import componentsStyle from "../../assets/jss/material-dashboard-react/views/landingPage.jsx";
import { Typography } from "@material-ui/core";

const styles = theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
      // background: "linear-gradient(80deg,#ffa726,#fb8c00)"
    }
  },
  appBar: {
    position: "relative",
    background: "linear-gradient(80deg,#ffa726,#fb8c00)"
  },
  toolbarTitle: {
    flex: 1
  },
  layout: {
    width: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  heroContent: {
    maxWidth: 600,
    margin: "auto auto",
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  footer: {
    marginTop: theme.spacing.unit * 15,
    // borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit * 6}px 0`
  }
});

function Landing(props) {
  const { classes, ...rest } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <Header
        brand="Smartitude"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 500,
          color: "primary"
        }}
        {...rest}
      />
      <Parallax
        image={require("assets/img/bg5.jpg")}
      >
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Your Training Starts With Us.</h1>
              <h4 className={classes.subtitle}>
                The Smartitude System assess a person’s core capability of
                common skills, such as numerical, verbal and diagrammatic
                reasoning. It offers a very effective mechanism for training
                candidates to become increasingly involved in the recruitment
                process.
              </h4>
              <br />
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
        </div>
      </div>
      <Spacing />

      {/* End footer */}
      <Footer />
    </React.Fragment>
  );
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(componentsStyle)(Landing);
