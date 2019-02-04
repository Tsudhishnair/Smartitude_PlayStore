import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = theme =>
  ({
    container: {
      display: 'flex',
      flexwrap: 'wrap'
    },
    textField: {

      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 250,
    },

  });
function QuizForm(props) {
  const { classes } = props;
  return (
    <div className={classes.container}>
      
    </div>
  )

}
export default withStyles(styles)(QuizForm);