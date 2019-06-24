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
  Slide
} from "@material-ui/core";
import formControlStyle from "../../assets/jss/form-control";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class MessageDialog extends React.Component {
  state = {
    open: true
  };

  handleDialogOpen = () => {
    this.setState(() => ({ open: true }));
  };

  handleDialogClose = () => {
    this.setState(() => ({ open: false }));
    this.props.onClose();
  };

  render() {
    const {
      classes,
      title,
      content,
      positiveAction,
      negativeAction,
      action
    } = this.props;
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleDialogClose}
          aria-labelledby="alert-dialog-title"
          TransitionComponent={Transition}
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose} color="primary">
              {negativeAction ? negativeAction : "CANCEL"}
            </Button>
            <Button
              onClick={() => {
                action();
                this.handleDialogClose();
              }}
              color="primary"
              autoFocus
            >
              {positiveAction ? positiveAction : "OK"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

MessageDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  positiveAction: PropTypes.string,
  negativeAction: PropTypes.string,
  action: PropTypes.func.isRequired,
  onClose: PropTypes.func
};

export default withStyles(formControlStyle)(MessageDialog);
