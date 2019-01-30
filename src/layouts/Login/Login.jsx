import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Login from '../../views/Login/Login';


const styles = theme => ({
  root: {
    background:"linear-gradient(80deg,#ffa726,#fb8c00)",
    height:"100vh",
  },
 
});

function CenteredGrid(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item md={6}>
          
        </Grid>
        <Grid item xs={12} md={6}>
          <Login/>
        </Grid>
      </Grid>
    </div>
  );
}

CenteredGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CenteredGrid);