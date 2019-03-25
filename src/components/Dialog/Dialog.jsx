import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


function AlertDialog(props) {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    return (
        <div>
            
            <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                Open alert dialog
        </Button>
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                       Do you want to delete the Department? Sometimes Deleting the department may cause you harm .
            </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Disagree
            </Button>
                    <Button onClick={this.handleClose} color="primary" autoFocus>
                        Agree
            </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AlertDialog;