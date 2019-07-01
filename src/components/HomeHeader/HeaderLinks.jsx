/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import { Person, CloudDownload, Home } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
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
        </List>
    );
}

export default withStyles(headerLinksStyle)(HeaderLinks);