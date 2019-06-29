import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";
// @material-ui/icons
import { Person, VpnKey, Help, AccountCircle } from "@material-ui/icons";
// core components
import { ListItem, List, Typography } from "@material-ui/core";

import { Query } from "../../../node_modules/react-apollo";
import gql from "graphql-tag";

import { loginHandler } from "../../Utils";
import PropTypes from "prop-types";
import DialogChangePassword from "../Dialog/DialogChangePassword";

import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import headerLinksStyle from "../../assets/jss/material-dashboard-react/views/headerLinksStyle.jsx";

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
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      passwordOpen: false,
      profileOpen: false
    };
  }
  getUserName = () => {
    const { classes } = this.props;
    return (
      <p className={classes.linkText}>
        {loginHandler.userType === "admin" && (
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
        )}
        {loginHandler.userType === "faculty" && (
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
        )}
        {loginHandler.userType === "student" && (
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
        )}
      </p>
    );
  };

  // manage state for opening dialog
  handleProfileClickOpen = () => {
    this.setState({ profileOpen: true });
  };

  handlePasswordClickOpen = () => {
    this.setState({ passwordOpen: true });
  };

  closeProfile = () => {
    this.setState({ profileOpen: false });
  };

  closePassword = () => {
    this.setState({ passwordOpen: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <DialogChangePassword
          open={this.state.passwordOpen}
          onClose={this.closePassword}
        />
        <List className={classes.list}>
          <ListItem className={classes.listItem}>
            <CustomDropdown
              noLiPadding
              buttonText={this.getUserName()}
              buttonProps={{
                className: classes.navLink,
                color: "transparent"
              }}
              buttonIcon={Person}
              dropdownList={[
                <div key={1} className={classes.dropdownLink}>
                  <AccountCircle className={classes.iconButton} /> View Profile
                </div>,
                <div
                  key={2}
                  className={classes.dropdownLink}
                  onClick={this.handlePasswordClickOpen}
                >
                  <VpnKey className={classes.iconButton} /> Change Password
                </div>,
                <div key={3} className={classes.dropdownLink}>
                  <Help className={classes.iconButton} /> Help & Support
                </div>
              ]}
            />
          </ListItem>
        </List>
      </div>
    );
  }
}

HeaderLinks.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(headerLinksStyle)(HeaderLinks);
