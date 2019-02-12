import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import FormControl from '@material-ui/core/FormControl';

import Spacing from '../Spacing/Spacing'
const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  formControl: {
    margin: 0,
    padding: theme.spacing.unit * 10,
    fullWidth: true,
    marginTop: theme.spacing.unit * 3,
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
    margin: theme.spacing.unit * 3,
    minWidth: 120,
  },
  button: {
    margin: theme.spacing.unit * 4,
  },
}
);
function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Dialog extends React.Component {
  state = {
    open: false,
    rowdata: []
  };
  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }
  handleClickOpen = (data) => {
    this.setState({ open: true });
    this.setState({ rowdata: data })
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{this.state.rowdata[0]}</DialogTitle>
          <DialogContent>
            <DialogContentText>

              <GridContainer>
                <GridItem xs={6} sm={7} md={7} className={classes.elementPadding}>
                  Edit below to update/modify an individual student data.
              </GridItem>
                <GridItem xs={1.5} sm={1} md={1} className={classes.elementPadding}>
                  <Typography>Rank</Typography>
                  <Typography> <h4><strong>{this.state.rowdata[5]}</strong></h4></Typography>
                </GridItem>
                <GridItem xs={1.5} sm={1} md={1} className={classes.elementPadding}>
                  <Typography>Score</Typography>
                  <Typography> <h4><strong>{this.state.rowdata[6]}</strong></h4></Typography>
                </GridItem>
                <GridItem xs={2} sm={3} md={3} className={classes.elementPadding}>
                  <Button onClick={this.handleClose} fullWidth color="primary">Delete Student</Button>
                </GridItem>
              </GridContainer>
            </DialogContentText>
            <div className={classes.root}>
              <Spacing />
              <Typography> <strong>Basic Info</strong></Typography>
              <GridContainer>
                <GridItem xs={12} sm={4} md={4} className={classes.elementPadding}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="name"
                    value={this.state.rowdata[0]}
                    fullWidth
                  />
                </GridItem>
                <GridItem xs={12} sm={4} md={4} className={classes.elementPadding}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="username"
                    label="Username"
                    type="name"
                    value={this.state.rowdata[1]}
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
                    value={this.state.rowdata[2]}
                    fullWidth
                  />
                </GridItem>
              </GridContainer>
              <Spacing />
              <Typography> <strong>College Info</strong></Typography>
              <GridContainer>
                <GridItem xs={12} sm={4} md={4} className={classes.elementPadding}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="phone"
                    label="Phone Number"
                    value={this.state.rowdata[4]}
                    type="phone"
                    fullWidth
                  />
                </GridItem>
                <GridItem xs={12} sm={4} md={4} className={classes.formControl}>
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
                <GridItem xs={12} sm={4} md={4} className={classes.elementPadding}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="batch"
                    label="Batch"
                    value={this.state.rowdata[3]}
                    type="text"
                    fullWidth
                  />
                </GridItem>
              </GridContainer>
              <Spacing />

            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
          </Button>
            <Button onClick={this.handleClose} color="primary">
              Save
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Dialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dialog);