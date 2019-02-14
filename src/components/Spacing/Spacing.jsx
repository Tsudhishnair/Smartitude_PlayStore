import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme =>
  ({
    root: {
      marginTop: theme.spacing.unit * 4,
      marginBottom: theme.spacing.unit * 4,
    },
    

  });
function Spacing(props) {
  if(props.size=="s")
  {
    null
  }
  const { classes } = props;
  return (
    <div className={classes.root}>
    </div>
  )

}
export default withStyles(styles)(Spacing);