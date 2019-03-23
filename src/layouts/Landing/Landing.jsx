import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
// import Button from "@material-ui/core/Button";
import Button from "components/CustomButtons/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import StarIcon from "@material-ui/icons/StarBorder";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import lock from "assets/img/drawable/smart_logo.png";

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
  cardHeader: {
    backgroundColor: theme.palette.grey[200]
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing.unit * 2
  },
  cardActions: {
    [theme.breakpoints.up("sm")]: {
      paddingBottom: theme.spacing.unit * 2
    }
  },
  footer: {
    marginTop: theme.spacing.unit * 8,
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit * 6}px 0`
  }
});

const tiers = [
  {
    title: "Free",
    price: "0",
    description: [
      "10 users included",
      "2 GB of storage",
      "Help center access",
      "Email support"
    ],
    buttonText: "Sign up for free",
    buttonVariant: "outlined"
  },
  {
    title: "Pro",
    subheader: "Most popular",
    price: "15",
    description: [
      "20 users included",
      "10 GB of storage",
      "Help center access",
      "Priority email support"
    ],
    buttonText: "Get started",
    buttonVariant: "contained"
  },
  {
    title: "Enterprise",
    price: "30",
    description: [
      "50 users included",
      "30 GB of storage",
      "Help center access",
      "Phone & email support"
    ],
    buttonText: "Contact us",
    buttonVariant: "outlined"
  }
];
const footers = [
  {
    title: "Smartitude",
    description: ["Team", "Contact us", "Locations"]
  },
  {
    title: "Features",
    description: ["Cool stuff", "Team feature", "Developer stuff"]
  },
  {
    title: "Login",
    description: ["Admin", "Faculty"]
  },
  {
    title: "Legal",
    description: ["Privacy policy", "Terms of use"]
  }
];

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
          <Link to="admin/login">
            <Button color="warning">Admin Login</Button>
          </Link>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          {/*<Typography*/}
          {/*component="h1"*/}
          {/*variant="h2"*/}
          {/*align="center"*/}
          {/*color="textPrimary"*/}
          {/*gutterBottom*/}
          {/*/>*/}
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
        {/* End hero unit */}
      </main>
      {/* Footer */}
      <footer className={classNames(classes.footer, classes.layout)}>
        <Grid container spacing={32} justify="space-evenly">
          {footers.map(footer => (
            <Grid item xs key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              {footer.description.map(item => (
                <Typography
                  key={item}
                  variant="subtitle1"
                  color="textSecondary"
                >
                  {item}
                </Typography>
              ))}
            </Grid>
          ))}
        </Grid>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Landing);
