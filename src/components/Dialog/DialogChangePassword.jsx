import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from "@material-ui/core";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import formControlStyle from "../../assets/jss/form-control";

class DialogChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      open: false
    };
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  // manage state for opening dialog
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  // close dialog
  handleClose = () => {
    this.setState({ open: false });
    // this.props.onClose();
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
          <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
          <form>
            <DialogContent>
              <DialogContentText>
                {
                  "Please make sure you remember the password once you have changed them."
                }
              </DialogContentText>
              <GridContainer>
                <GridItem
                  xs={12}
                  sm={12}
                  md={12}
                  className={classes.elementPadding}
                >
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Old Password"
                    type="password"
                    name="Old Password"
                    required
                    onChange={this.handleValueChange}
                    fullWidth
                  />
                </GridItem>
                <GridItem
                  xs={12}
                  sm={12}
                  md={12}
                  className={classes.elementPadding}
                >
                  <TextField
                    margin="dense"
                    id="username"
                    label="New Password"
                    type="password"
                    required
                    onChange={this.handleValueChange}
                    fullWidth
                  />
                </GridItem>
                <GridItem
                  xs={12}
                  sm={12}
                  md={12}
                  className={classes.elementPadding}
                >
                  <TextField
                    margin="dense"
                    label="Repeat New Password"
                    type="password"
                    required
                    onChange={this.handleValueChange}
                    fullWidth
                  />
                </GridItem>
              </GridContainer>
            </DialogContent>
            <DialogActions>
              <Button size={"small"} onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button size="small" color="primary" type={"submit"}>
                Confirm Change
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

DialogChangePassword.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  onRef: PropTypes.object
};

export default withStyles(formControlStyle)(DialogChangePassword);
