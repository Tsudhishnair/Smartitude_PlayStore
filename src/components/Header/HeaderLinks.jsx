import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
// core components
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "../../assets/jss/material-dashboard-react/components/headerLinksStyle.jsx";

import { Query } from "../../../node_modules/react-apollo";
import gql from "graphql-tag";
import { loginHandler } from "../../Utils";
import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Poppers from "@material-ui/core/Popper";
import DialogChangePassword from "../Dialog/DialogChangePassword";

const adminInfo = gql`
  {
    meAdmin {
      _id
      name
    }
  }
`;

const facultyInfo = gql`
  {
    meFaculty {
      _id
      name
    }
  }
`;

const studentInfo = gql`
  {
    meStudent {
      _id
      name
    }
  }
`;

class HeaderLinks extends React.Component {
  state = {
    openMenu: false
  };
  handleToggleMenu = () => {
    this.setState(state => ({ openMenu: !state.openMenu }));
  };

  handleCloseMenu = event => {
    if (this.anchorMenu.contains(event.target)) {
      return;
    }

    this.setState({ openMenu: false });
  };

  render() {
    const { classes } = this.props;
    const { openMenu } = this.state;

    console.log(loginHandler.userType);
    return (
      <div>
        <DialogChangePassword onRef={ref => (this.child = ref)} />
        <div className={classes.manager}>
          <Button
            color={window.innerWidth > 959 ? "transparent" : "white"}
            aria-label="Person"
            buttonRef={node => {
              this.anchorMenu = node;
            }}
            className={classes.buttonLink}
            onClick={this.handleToggleMenu}
            aria-haspopup="true"
            aria-owns={openMenu ? "notification-menu-list-grow" : null}
          >
            <Person className={classes.icons} />
            <p onClick={this.handleToggleMenu} className={classes.linkText}>
              {loginHandler.userType === "admin" ? (
                <Query query={adminInfo} fetchPolicy="network-only">
                  {({ data, loading, error }) => {
                    if (loading) {
                      return <Typography>Loading...</Typography>;
                    } else if (error) {
                      return <Typography>Error Occurred!</Typography>;
                    } else {
                      localStorage.setItem("admin", data.meAdmin._id);
                      return !loading ? `${data.meAdmin.name}` : "";
                    }
                  }}
                </Query>
              ) : (
                ""
              )}
              {loginHandler.userType === "faculty" ? (
                <Query query={facultyInfo} fetchPolicy="network-only">
                  {({ data, loading, error }) => {
                    if (loading) {
                      return <Typography>Loading...</Typography>;
                    } else if (error) {
                      return <Typography>Error Occurred!</Typography>;
                    } else {
                      localStorage.setItem("faculty", data.meFaculty._id);
                      return !loading ? `${data.meFaculty.name}` : "";
                    }
                  }}
                </Query>
              ) : (
                ""
              )}
              {loginHandler.userType === "student" ? (
                <Query query={studentInfo} fetchPolicy="network-only">
                  {({ data, loading, error }) => {
                    if (loading) {
                      return <Typography>Loading...</Typography>;
                    } else if (error) {
                      return <Typography>Error Occurred!</Typography>;
                    } else {
                      localStorage.setItem("student", data.meStudent._id);
                      return !loading ? `${data.meStudent.name}` : "";
                    }
                  }}
                </Query>
              ) : (
                ""
              )}
            </p>
          </Button>
          <Poppers
            open={openMenu}
            transition
            disablePortal
            anchorEl={this.anchorMenu}
            className={
              classNames({ [classes.popperClose]: !openMenu }) +
              " " +
              classes.pooperNav
            }
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom"
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleCloseMenu}>
                    <MenuList role="menu">
                      <MenuItem
                        onClick={this.child.handleClickOpen()}
                        className={classes.dropdownItem}
                      >
                        Change Password
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleCloseMenu}
                        className={classes.dropdownItem}
                      >
                        Help & Support
                      </MenuItem>
                      {/*<MenuItem*/}
                      {/*  onClick={this.handleClose}*/}
                      {/*  className={classes.dropdownItem}*/}
                      {/*>*/}
                      {/*  Log Out*/}
                      {/*</MenuItem>*/}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Poppers>
        </div>
      </div>
    );
  }
}

HeaderLinks.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(headerLinksStyle)(HeaderLinks);
