import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components

// core components


function ErrorSnack({ ...props }) {
  const { classes } = props;
  return (
   null
  );
}

ErrorSnack.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(ErrorSnack);
