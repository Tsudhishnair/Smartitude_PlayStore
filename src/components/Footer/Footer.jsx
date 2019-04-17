import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import footerStyle from "assets/jss/material-dashboard-react/components/footerStyle.jsx";
import Link from "react-router-dom/es/Link";
import classNames from "classnames";

function Footer({ ...props }) {
  const { classes, whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <Link to={"/"}>
                <div className={classes.block}>
                  Home
                </div>
              </Link>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="www.rajagiritech.ac.in"
                className={classes.block}
                target="blank"
              >
                RSET
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://github.com/Kuttipishaash/smartitude-app-main"
                className={classes.block}
                target="_blank"
              >
                Privacy Policy & Licences
              </a>
            </ListItem>
          </List>
        </div>
        <div className={classes.right}>
          &copy; {1900 + new Date().getYear()}{" "}
          Smartitude
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  whiteFont: PropTypes.bool
};

export default withStyles(footerStyle)(Footer);
