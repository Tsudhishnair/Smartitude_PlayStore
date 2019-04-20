import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import BrandLogo from "assets/img/sidebar_smart_white.png";
import Background from "assets/img/sidebarback.jpg";
import LogOutIcon from "@material-ui/icons/ExitToApp";

import sidebarStyle from "assets/jss/material-dashboard-react/components/sidebarStyle.jsx";
import Link from "react-router-dom/es/Link";

class Sidebar extends Component {
  // verifies if routeName is the one active (in browser input)
  activeRoute = routeName => {
    return this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
  };

  render() {
    const { classes, color, image, logoText, routes } = this.props;

    const listItems = routes.map((prop, key) => {
      if (prop.redirect) return null;
      var activePro = " ";
      var listItemClasses;
      if (prop.path === "/admin/log-out") {
        activePro = classes.activePro + " ";
        listItemClasses = classNames({
          [" " + classes[color]]: false
        });
      } else {
        listItemClasses = classNames({
          [" " + classes[color]]: this.activeRoute(prop.path)
        });
      }
      const whiteFontClasses = classNames({
        [" " + classes.whiteFont]: this.activeRoute(prop.path)
      });
      return (
        <NavLink
          to={prop.path}
          className={activePro + classes.item}
          activeClassName="active"
          key={key}
        >
          <ListItem button className={classes.itemLink + listItemClasses}>
            <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
              {typeof prop.icon === "string" ? (
                <Icon>{prop.icon}</Icon>
              ) : (
                <prop.icon />
              )}
            </ListItemIcon>
            <ListItemText
              primary={prop.sidebarName}
              className={classes.itemText + whiteFontClasses}
              disableTypography={true}
            />
          </ListItem>
        </NavLink>
      );
    });
    listItems.push(
      <ListItem
        button
        className={classes.itemLink}
        onClick={this.props.logoutDialogToggle}
      >
        <ListItemIcon className={classes.itemIcon}>
          <LogOutIcon />
        </ListItemIcon>
        <ListItemText
          primary={"Log Out"}
          className={classes.itemText}
          disableTypography={true}
        />
      </ListItem>
    );
    var links = <List className={classes.list}>{listItems}</List>;
    var brand = (
      <div className={classes.logo}>
        <Link to={"/"} className={classes.logoLink}>
          <div className={classes.logoImage}>
            <img src={BrandLogo} alt="logo" className={classes.img} />
          </div>
        </Link>
      </div>
    );
    return (
      <div>
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="right"
            open={this.props.open}
            classes={{
              paper: classes.drawerPaper
            }}
            onClose={this.props.handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {brand}
            <div className={classes.sidebarWrapper}>{links}</div>
            {Background !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + Background + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            anchor="left"
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper
            }}
          >
            {brand}
            <div className={classes.sidebarWrapper}>{links}</div>
            {Background !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + Background + ")" }}
              />
            ) : null}
          </Drawer>xx
        </Hidden>
      </div>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  logoutDialogToggle: PropTypes.func.isRequired
};

export default withStyles(sidebarStyle)(Sidebar);
