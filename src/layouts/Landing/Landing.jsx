import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
// import Button from "@material-ui/core/Button";
import Button from "components/CustomButtons/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/HomeHeader/HomeHeader.jsx";
import HeaderLinks from "../../components/HomeHeader/HeaderLinks.jsx";

import lock from "../../assets/img/smart_white.png";
import Spacing from "../../components/Spacing/Spacing";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Parallax from "../../components/Parallax/Parallax";
import ProductSection from "../Landing/ProductSection";

import componentsStyle from "../../assets/jss/material-dashboard-react/views/landingPage.jsx";

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
          height: 400,
          color: "primary"
        }}
        {...rest}
      />
      {/*<Parallax image={require("assets/img/bg5.jpg")}>*/}
      {/*  <div className={classes.container}>*/}
      {/*    <GridContainer>*/}
      {/*      <GridItem>*/}
      {/*        <div className={classes.brand}>*/}
      {/*          <h1 className={classes.title}>*/}
      {/*            <img width="500dp" align="" src={lock} alt="..." />*/}
      {/*          </h1>*/}
      {/*          <h3 className={classes.subtitle}>*/}
      {/*            A Badass Aptitude Trainer.*/}
      {/*          </h3>*/}
      {/*        </div>*/}
      {/*      </GridItem>*/}
      {/*    </GridContainer>*/}
      {/*  </div>*/}
      {/*</Parallax>*/}
      <Parallax image={require("assets/img/bg5.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Your Training Starts With Us.</h1>
              <h4>
                The Smartitude System assess a person’s core capability of
                common skills, such as numerical, verbal and diagrammatic
                reasoning. It offers a very effective mechanism for training
                candidates to become increasingly involved in the recruitment
                process.
              </h4>
              <br />
              {/*<Link to={"/student/login"}>*/}
              {/*  <Button color="warning" size="lg">*/}
              {/*    /!*<i className="fas fa-play" />*!/*/}
              {/*    Student Login*/}
              {/*  </Button>*/}
              {/*</Link>*/}
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      {/*<AppBar position="static" color="default" className={classes.appBar}>*/}
      {/*  <Toolbar>*/}
      {/*    <Typography*/}
      {/*      variant="h8"*/}
      {/*      color="inherit"*/}
      {/*      noWrap*/}
      {/*      className={classes.toolbarTitle}*/}
      {/*    >*/}
      {/*      Smartitude*/}
      {/*    </Typography>*/}
      {/*    <Link to="faculty/login">*/}
      {/*      <Button color="warning">Faculty Login</Button>*/}
      {/*    </Link>*/}
      {/*    <Link to="admin/login">*/}
      {/*      <Button color="warning">Admin Login</Button>*/}
      {/*    </Link>*/}
      {/*  </Toolbar>*/}
      {/*</AppBar>*/}
      <div className={classNames(classes.main, classes.mainRaised)}>
        {/*<main className={classes.layout}>*/}
        {/*  <img width="600dp" align="" src={lock} alt="..." />*/}
        {/*  <Typography*/}
        {/*    variant="h6"*/}
        {/*    align="center"*/}
        {/*    color="textSecondary"*/}
        {/*    component="p"*/}
        {/*  >*/}
        {/*    Aptitude tests assess a person’s core capability of common skills,*/}
        {/*    such as numerical, verbal and diagrammatic reasoning. They offer a*/}
        {/*    very effective mechanism for selecting candidates so have become*/}
        {/*    increasingly involved in the recruitment process.*/}
        {/*  </Typography>*/}
        {/*</main>*/}
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
