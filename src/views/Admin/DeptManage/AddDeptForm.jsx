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
import Avatar from 'react-avatar-edit'


import ChipInput from 'material-ui-chip-input';
import { orange } from '@material-ui/core/colors';

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
class AddDeptForm extends React.Component {
  constructor(props) {
    super(props)
    const src = './example/einshtein.jpg'
    this.state = {
      preview: null,
      src
    }
    this.onCrop = this.onCrop.bind(this)
    this.onClose = this.onClose.bind(this)
  }

  onClose() {
    this.setState({ preview: null })
  }

  onCrop(preview) {
    this.setState({ preview })
  }

  render() {

    return (
      <div>
        <Typography> <strong>Basic Info</strong></Typography>
        <GridContainer>
          <GridItem xs={12} sm={5} md={5} >
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Department Name"
              type="name"
              fullWidth
            />
          </GridItem>
          <GridItem xs={12} sm={5} md={5}>
            <Avatar
              width={200}
              height={200}
              imageWidth={300}
              imageHeight={300}
              onCrop={this.onCrop}
              onClose={this.onClose}
              src={this.state.src}
              closeIconColor={orange}
            />
          </GridItem>
          <GridItem xs={12} sm={2} md={2}>
            <img src={this.state.preview} alt="Preview" />
          </GridItem>
        </GridContainer>
      </div >
    )
  }
}
export default withStyles(styles)(AddDeptForm);