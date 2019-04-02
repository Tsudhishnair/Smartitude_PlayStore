import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import footerStyle from "assets/jss/material-dashboard-react/components/footerStyle.jsx";
import Link from "react-router-dom/es/Link";
import Toolbar from "../../layouts/Landing/Landing";

function Footer({ ...props }) {
  const { classes } = props;
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <Link to="/">
              <ListItem className={classes.inlineBlock}>
                <a className={classes.block}>Home</a>
              </ListItem>
            </Link>
            <Link to="www.rajagiritech.ac.in">
              <ListItem className={classes.inlineBlock}>
                <a className={classes.block}>RSET</a>
              </ListItem>
            </Link>
          </List>
        </div>
        <div className={classes.right}>
          <List className={classes.list}>
            <Link to="/student/login">
              <ListItem className={classes.inlineBlock}>
                <a className={classes.block}>Student Login</a>
              </ListItem>
            </Link>
            <Link to="/faculty/login">
              <ListItem className={classes.inlineBlock}>
                <a className={classes.block}>Faculty Login</a>
              </ListItem>
            </Link>
            <ListItem className={classes.inlineBlock}>
              <a className={classes.block}>
                &copy; {1900 + new Date().getYear()} Smartitude
              </a>
            </ListItem>
          </List>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(footerStyle)(Footer);
