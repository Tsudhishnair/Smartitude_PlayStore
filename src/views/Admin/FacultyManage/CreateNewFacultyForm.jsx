import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import ReactSelect from 'react-select'

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import FormControl from '@material-ui/core/FormControl';

import ReactChipInput from '../../../components/AutoChip/ReactChipSelect';
import Spacing from '../../../components/Spacing/Spacing'




const styles = theme =>
  ({
    formControl: {
      margin: 0,
      padding: theme.spacing.unit * 10,
      fullWidth: true,
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit * 2,
      backgroundColor: '#9ee',
      wrap: 'nowrap'
    },
    elementPadding: {
      padding: '15px',
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit * 2,
      marginTop: theme.spacing.unit * 10,
    },
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
      margin: theme.spacing.unit * 4,
    },
  });
function CreateNewFacultyForm(props) {
  const { classes } = props;
  const options = [
    { label: 'Afghanistan' },
    { label: 'Aland Islands' },
    { label: 'Albania' },
    { label: 'Algeria' },
    { label: 'American Samoa' },
    { label: 'Andorra' },
    { label: 'Angola' },
    { label: 'Anguilla' },
    { label: 'Antarctica' },
    { label: 'Antigua and Barbuda' },
    { label: 'Argentina' },
    { label: 'Armenia' },
    { label: 'Aruba' },
    { label: 'Australia' },
    { label: 'Austria' },
    { label: 'Azerbaijan' },
    { label: 'Bahamas' },
    { label: 'Bahrain' },
    { label: 'Bangladesh' },
    { label: 'Barbados' },
    { label: 'Belarus' },
    { label: 'Belgium' },
    { label: 'Belize' },
    { label: 'Benin' },
    { label: 'Bermuda' },
    { label: 'Bhutan' },
    { label: 'Bolivia, Plurinational State of' },
    { label: 'Bonaire, Sint Eustatius and Saba' },
    { label: 'Bosnia and Herzegovina' },
    { label: 'Botswana' },
    { label: 'Bouvet Island' },
    { label: 'Brazil' },
    { label: 'British Indian Ocean Territory' },
    { label: 'Brunei Darussalam' },
  ]
  
  return (
    <div className={classes.root}>
      <Typography> <strong>Basic Info</strong></Typography>
      <GridContainer>
        <GridItem xs={12} sm={4} md={4} className={classes.elementPadding}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="name"
            fullWidth
          />
        </GridItem>
        <GridItem xs={12} sm={4} md={4} className={classes.elementPadding}>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
          />
        </GridItem>
        <GridItem xs={12} sm={4} md={4} className={classes.elementPadding}>
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Phone Number"
            type="phone"
            fullWidth
          />
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={6} md={6} className={classes.formControl}>
          <FormControl fullWidth>
            <InputLabel htmlFor="age-simple">Department</InputLabel>
            <Select
              inputProps={{
                name: 'dept',
                id: 'dept',
              }}
              fullWidth
            >
              <MenuItem value="xs">Information Technology</MenuItem>
              <MenuItem value="sm">Computer Science</MenuItem>
              <MenuItem value="md">Mechanical</MenuItem>
              <MenuItem value="lg">Civil</MenuItem>
              <MenuItem value="xl">Electrical</MenuItem>
            </Select>
          </FormControl>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} className={classes.formControl}>
          <FormControl fullWidth>
            <InputLabel htmlFor="age-simple">Role</InputLabel>
            <Select
              inputProps={{
                name: 'dept',
                id: 'dept',
              }}
              fullWidth
            >
              <MenuItem value="xs">Incharge</MenuItem>
              <MenuItem value="sm">Faculty</MenuItem>
            </Select>
          </FormControl>
        </GridItem>
      </GridContainer>
      <Spacing />
      <GridContainer>
        <GridItem xs={12} sm={4} md={4} className={classes.formControl}>
          <FormControl fullWidth>
            <InputLabel htmlFor="age-simple">Category</InputLabel>
            <Select
              inputProps={{
                name: 'dept',
                id: 'dept',
              }}
              fullWidth
            >
              <MenuItem value="xs">Verbal</MenuItem>
              <MenuItem value="sm">Ling</MenuItem>
            </Select>
          </FormControl>
        </GridItem>
        <GridItem xs={12} sm={8} md={8} className={classes.elementPadding}>
          {/* <ReactSelect
            defaultValue={[options[2], options[3]]}
            isMulti
            name="colors"
            fullWidth
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
          /> */}
          <ReactChipInput data={options}/>
        </GridItem>
      </GridContainer>
    </div>
  )

}
export default withStyles(styles)(CreateNewFacultyForm);