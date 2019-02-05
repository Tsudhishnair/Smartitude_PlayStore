import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import DatePicker from '../DatePicker/DatePicker';
const styles = theme =>
  ({
    container: {
      display: 'flex',
      flexGrow: 1,
    },
    root:
      {
        flexGrow: 1,
        marginLeft: 10
      },
  });
function QuizForm(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography> <strong>Basic Info</strong></Typography>
      <Grid container spacing={40}>
        <Grid item xs className={classes.container}>
          <TextField
            id="standard-search"
            label="Quiz Name"
            type="input"
            margin="normal"
          />
        </Grid>
        <Grid item xs>
          <TextField
            id="standard-number"
            label="Number Of Questions"
            type="number"
            margin="normal"
          />
        </Grid>
        <Grid item xs>
          <DatePicker/>
        </Grid>
      </Grid>
    </div>
  )

}
export default withStyles(styles)(QuizForm);