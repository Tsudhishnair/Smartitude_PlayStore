import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import FormControl from '@material-ui/core/FormControl';
import {DropzoneArea} from 'material-ui-dropzone'

import ChipInput from 'material-ui-chip-input';

// npm install --save material-ui-dropzone

const styles = theme =>
  ({
    formControl: {
      margin: 0,
      padding: theme.spacing.unit * 10,
      fullWidth: true,
      backgroundColor: '#9ee',
      wrap: 'nowrap'
    },
    elementPadding: {
      padding: '15px',
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
  return (
    <div className={classes.root}>
      <Typography> <strong>Basic Info</strong></Typography>
      <GridContainer>
        <GridItem xs={12} sm={6} md={6} className={classes.elementPadding}>
        <DropzoneArea autoWidth={true} dropzoneText='Click here or drag and drop the file here to upload file' showFileNamesInPreview='true' filesLimit='1'/>
        </GridItem>
       </GridContainer>
    </div>
  )

}
export default withStyles(styles)(CreateNewFacultyForm);