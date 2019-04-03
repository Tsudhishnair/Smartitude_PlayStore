import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import { Snackbar } from "@material-ui/core";
import CustomSnackbar from "../../../components/Snackbar/CustomSnackbar";

export default class DeptDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true,
      _id: "",
      department: {
        name: this.props.department.name,
        description: this.props.department.description
      },
      snackbar: {
        open: true,
        variant: "error",
        message: "",
        duration: 4000
      }
    };
  }

  // open snackbar with timer
  openSnackbar = () => {
    this.setState({
      snackbar: {
        ...this.state.snackbar,
        open: true
      }
    });
    setTimeout(() => {
      this.setState({
        snackbar: {
          ...this.state.snackbar,
          open: false
        }
      });
    }, this.state.snackbar.duration);
  };

  closeSnackbar = () => {
    this.setState({
      snackbar: {
        ...this.state.snackbar,
        open: false
      }
    });
  };

  handleClose = () => {
    this.setState({
      department: {
        name: "",
        description: ""
      }
    });
    this.setState({ open: false });
    this.props.onClose();
  };
  handleChange = event => {
    this.setState({
      department: {
        ...this.state.department,
        [event.target.name]: event.target.value
      }
    });
  };
  UpdateAndClose = async editDepartment => {
    await this.setState({ _id: this.props.department._id });

    editDepartment({
      variables: {
        _id: this.state._id,
        departmentInput: {
          name: this.state.department.name,
          description: this.state.department.description
        }
      }
    })
      .then(response => {
        this.setState(
          {
            snackbar: {
              ...this.state.snackbar,
              variant: "success",
              message: " Modified successfully!"
            }
          },
          () => this.openSnackbar()
        );
        if (this.props.reloadDepartmentsList !== null) {
          this.props.reloadDepartmentsList();
        }
      })
      .catch(err => {
        if (this.props.reloadDepartmentsList !== null) {
          this.props.reloadDepartmentsList();
        }
      });
    this.setState({ open: false });
    this.props.onClose();
  };
  render() {
    const { department } = this.props;
    const { snackbar } = this.state;
    const UPDATE_DEPARTMENT = gql`
      mutation editDepartment($_id: ID!, $departmentInput: DepartmentInput!) {
        editDepartment(_id: $_id, departmentInput: $departmentInput) {
          _id
        }
      }
    `;

    return (
      <Mutation mutation={UPDATE_DEPARTMENT}>
        {editDepartment => {
          return (
            <div>
              <Dialog
                open={this.state.open}
                onRendered={() => {
                  this.setState({ department });
                }}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
              >
                {/* {console.log(this.state.department)
                } */}
                <DialogTitle id="form-dialog-title">
                  department Management
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Update department details
                  </DialogContentText>
                  <TextField
                    margin="dense"
                    id="name"
                    label="Department Name"
                    type="text"
                    name="name"
                    onChange={this.handleChange}
                    value={this.state.department.name}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="desc"
                    label="Department description"
                    type="text"
                    name="description"
                    onChange={this.handleChange}
                    value={this.state.department.description}
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button
                    onClick={e => {
                      e.preventDefault();
                      this.UpdateAndClose(editDepartment);
                    }}
                    color="primary"
                  >
                    Update
                  </Button>
                </DialogActions>
              </Dialog>
              <Snackbar
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={snackbar.open}
                autoHideDuration={6000}
              >
                <CustomSnackbar
                  onClose={this.closeSnackbar}
                  variant={snackbar.variant}
                  message={snackbar.message}
                />
              </Snackbar>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

DeptDialog.propTypes = {
  department: PropTypes.object.isRequired,
  reloadDepartmentsList: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};
