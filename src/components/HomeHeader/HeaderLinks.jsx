/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Person, CloudDownload, Home } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-dashboard-react/views/headerLinksStyle.jsx";

function HeaderLinks({ ...props }) {
  const { classes } = props;
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Login"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Person}
          dropdownList={[
            <Link to="/student/login" className={classes.dropdownLink}>
              Student
            </Link>,
            <Link to="/faculty/login" className={classes.dropdownLink}>
              Faculty
            </Link>,
            <Link to="/admin/login" className={classes.dropdownLink}>
              Admin
            </Link>,
          ]}
        />
      </ListItem>
      {/*<ListItem className={classes.listItem}>*/}
      {/*  <Button*/}
      {/*    href="https://www.creative-tim.com/product/material-kit-react"*/}
      {/*    color="transparent"*/}
      {/*    target="_blank"*/}
      {/*    className={classes.navLink}*/}
      {/*  >*/}
      {/*    <CloudDownload className={classes.icons} /> Download*/}
      {/*  </Button>*/}
      {/*</ListItem>*/}
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-twitter"
          title="Visit RSET Homepage"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://www.rajagiritech.ac.in"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <Home className={classes.socialIcons}/>
            {/*<i className={classes.socialIcons + " fab fa-facebook"} />*/}
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
