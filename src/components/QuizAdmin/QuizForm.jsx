import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const styles = theme =>
  ({
    formroot: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    container: {
      display: 'flex',
      flexGrow: 1,
    },
    root: {
      display: 'flex',
      flexWrap: 'nowrap',
      autoWidth: true,
    },
    formControl: {
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit * 2,
      minWidth: 120,
      display: 'flex',
      flexGrow: 1,
    },
    button: {
      margin: theme.spacing.unit * 4,
    },
  });
function QuizForm(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <form autoComplete="off" autoWidth={true}>
        <Typography> <strong>Basic Info</strong></Typography>
        <GridContainer>
          <GridItem xs={12} sm={3} md={3} className={classes.container}>
            <TextField
              id="standard-search"
              label="Quiz Name"
              type="input"
              margin="normal"
              fullWidth
            />
          </GridItem>
          <GridItem xs={12} sm={3} md={3} className={classes.container}>
            <TextField
              id="standard-number"
              label="Number Of Questions"
              type="number"
              margin="normal"
              fullWidth
            />
          </GridItem>
          <GridItem xs={12} sm={3} md={3} className={classes.elementPadding}>
            <TextField
              id="standard-number"
              label="Expiry Date"
              type="number"
              margin="normal"
              fullWidth
            />
          </GridItem>
          <GridItem xs={12} sm={3} md={3} className={classes.formroot}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-simple">Batch</InputLabel>
              <Select
                inputProps={{
                  name: 'age',
                  id: 'age-simple',
                }}
                fullWidth
                autoWidth={true}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </GridItem>
        </GridContainer>
        <Typography> <strong>Other Info</strong></Typography>
        <GridContainer>
          <GridItem xs={12} sm={3} md={3}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-simple" fullWidth >Category</InputLabel>
              <Select
                inputProps={{
                  name: 'age',
                  id: 'age-simple',
                }}
                fullWidth
              >
                <MenuItem value="">
                  <em>All Category</em>
                </MenuItem>
                <MenuItem value={10}>Category 1</MenuItem>
                <MenuItem value={20}>Category 2</MenuItem>
                <MenuItem value={30}>Category 3</MenuItem>
              </Select>
            </FormControl>
          </GridItem>
          <GridItem xs={12} sm={3} md={3}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-simple" fullWidth >Sub Category</InputLabel>
              <Select
                inputProps={{
                  name: 'age',
                  id: 'age-simple',
                }}
                fullWidth
              >
                <MenuItem value="">
                  <em>All Category</em>
                </MenuItem>
                <MenuItem value={10}>Category 1</MenuItem>
                <MenuItem value={20}>Category 2</MenuItem>
                <MenuItem value={30}>Category 3</MenuItem>
              </Select>
            </FormControl>
          </GridItem>
          <GridItem xs={12} sm={2} md={2}>
            <TextField
              id="standard-number"
              label="No. Of Quest."
              type="number"
              fullWidth
              margin="normal"
            />
          </GridItem>
          <GridItem xs={12} sm={2} md={2}>
            <TextField
              id="standard-number"
              label="Time Limit (min)"
              type="number"
              fullWidth
              margin="normal"
            />
          </GridItem>
          <GridItem xs={12} sm={2} md={2}>
            <Button fullWidth color="primary" className={classes.button}>
              Add More
          </Button>
          </GridItem>
        </GridContainer>
      </form>
    </div >
  )

}
export default withStyles(styles)(QuizForm);