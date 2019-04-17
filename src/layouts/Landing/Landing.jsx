import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
// import Button from "@material-ui/core/Button";
import Button from "components/CustomButtons/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Footer from "../../components/Footer/Footer";

import lock from "assets/img/drawable/smart_logo.png";
import Spacing from "../../components/Spacing/Spacing";

const styles = theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
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
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography
            variant="h8"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            Smartitude
          </Typography>
          <Link to="faculty/login">
            <Button color="warning">Faculty Login</Button>
          </Link>
          <Link to="student/login">
            <Button color="warning">Student Login</Button>
          </Link>
          <Link to="admin/login">
            <Button color="warning">Admin Login</Button>
          </Link>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <div className={classes.heroContent}>
          <img width="600dp" align="" src={lock} alt="..." />
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            component="p"
          >
            Aptitude tests assess a person’s core capability of common skills, such as numerical, verbal and diagrammatic reasoning. They offer a very effective mechanism for selecting candidates so have become increasingly involved in the recruitment process.
          </Typography>
        </div>
      </main>
      <Spacing />
      <Footer className={classes.footer} />
      {/* End footer */}
    </React.Fragment>
  );
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Landing);
