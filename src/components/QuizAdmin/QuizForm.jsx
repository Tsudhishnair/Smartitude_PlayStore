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
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

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
    formControl: {
      margin: theme.spacing.unit * 2,
      minWidth: 120,
    },
    button: {
      margin: theme.spacing.unit*4,
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
          <TextField
            id="standard-number"
            label="Expiry Date"
            type="number"
            margin="normal"
          />
        </Grid>
        <Grid item xs>
          <form className={classes.root}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-simple">Batch</InputLabel>
              <Select
                inputProps={{
                  name: 'age',
                  id: 'age-simple',
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>4th</MenuItem>
                <MenuItem value={20}>3rd</MenuItem>
                <MenuItem value={30}>2nd</MenuItem>
              </Select>
            </FormControl>
          </form>
        </Grid>
      </Grid>
      <Typography> <strong>Other Info</strong></Typography>
      <Grid container spacing={40}>
        <Grid item xs>

          <form className={classes.root}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-simple" >Category</InputLabel>
              <Select
                inputProps={{
                  name: 'age',
                  id: 'age-simple',
                }}
              >
                <MenuItem value="">
                  <em>All Category</em>
                </MenuItem>
                <MenuItem value={10}>Category 1</MenuItem>
                <MenuItem value={20}>Category 2</MenuItem>
                <MenuItem value={30}>Category 3</MenuItem>
              </Select>
            </FormControl>
          </form>

        </Grid>
        <Grid item xs>

          <form className={classes.root}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-simple" >Sub Category</InputLabel>
              <Select
                inputProps={{
                  name: 'age',
                  id: 'age-simple',
                }}
              >
                <MenuItem value="">
                  <em>All Category</em>
                </MenuItem>
                <MenuItem value={10}>Category 1</MenuItem>
                <MenuItem value={20}>Category 2</MenuItem>
                <MenuItem value={30}>Category 3</MenuItem>
              </Select>
            </FormControl>
          </form>

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
          <TextField
            id="standard-number"
            label="Time Limit (min)"
            type="number"
            margin="normal"
          />
        </Grid>
        <Grid item xs>
          <Button color="primary" className={classes.button}>
            Add More
          </Button>
        </Grid>
      </Grid>
    </div>
  )

}
export default withStyles(styles)(QuizForm);