import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Login from '../../views/Login/Login';

import lock from "assets/img/drawable/smart_logo.png";


const styles = theme => ({
  root: {
    background:"linear-gradient(80deg,#ffa726,#fb8c00)",
    height:"100vh",
    margin: 0,
  },
 
});

class LoginApp extends React.Component {
  render(){
    const { classes, ...rest } = this.props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12} md={6}>
        <img width="550dp" src={lock} alt="..." />
        </Grid>
        <Grid item xs={12} md={6}>
          <Login/>
        </Grid>
      </Grid>
    </div>
  );
}
};

export default withStyles(styles)(LoginApp);