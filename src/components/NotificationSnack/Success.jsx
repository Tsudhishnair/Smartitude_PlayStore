import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components

function SuccessSnack({ ...props }) {
  const { classes } = props;
  return (
     null
   );
}

SuccessSnack.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(SuccessSnack);
