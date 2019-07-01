/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Button from "@material-ui/core/Button";
// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import headerLinksStyle from "assets/jss/material-dashboard-react/views/headerLinksStyle.jsx";
import { Icon } from "@material-ui/core";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    color: "white",
    borderRadius: 3
  },
  input: {
    color: "white"
  }
});
function HeaderLinks({ ...props }) {
  const { classes } = props;

  return (
    <div>
      <Link to="/student/login" className={classes.input}>
        <Button className={classes.button}>Login</Button>
      </Link>
      <Link to="/SignUp" className={classes.input}>
        <Button className={classes.button}>SignUp</Button>
      </Link>
    </div>
  );
}
export default withStyles(styles)(HeaderLinks);
