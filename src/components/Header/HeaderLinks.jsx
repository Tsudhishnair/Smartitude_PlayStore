import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
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

class HeaderLinks extends React.Component {
  state = {
    open: false
  };
  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

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
    return (
      <div>
        {/*<div className={classes.searchWrapper}>*/}
        {/*  <CustomInput*/}
        {/*    formControlProps={{*/}
        {/*      className: classes.margin + " " + classes.search*/}
        {/*    }}*/}
        {/*    inputProps={{*/}
        {/*      placeholder: "Search",*/}
        {/*      inputProps: {*/}
        {/*        "aria-label": "Search"*/}
        {/*      }*/}
        {/*    }}*/}
        {/*  />*/}
        {/*  <Button color="white" aria-label="edit" justIcon round>*/}
        {/*    <Search />*/}
        {/*  </Button>*/}
        {/*</div>*/}
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          aria-label="Person"
          disabled
          className={classes.buttonLink}
        >
          <Person className={classes.icons} />
          <p className={classes.linkText}>
            {loginHandler.userType === "admin" ? (
              <Query query={adminInfo}>
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
              <Query query={facultyInfo}>
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
              <Query query={studentInfo}>
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
      </div>
    );
  }
}

HeaderLinks.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(headerLinksStyle)(HeaderLinks);
