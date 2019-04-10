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

const UPDATE_DEPARTMENT = gql`
  mutation editDepartment($_id: ID!, $departmentInput: DepartmentInput!) {
    editDepartment(_id: $_id, departmentInput: $departmentInput) {
      _id
    }
  }
`;

export default class DeptDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true,
      _id: this.props.department._id,
      department: {
        name: this.props.department.name,
        description: this.props.department.description
      }
    };
  }

  handleClose = () => {
    this.setState({
      department: {
        name: "",
        description: ""
      },
      open: false
    });
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

  updateAndClose = editDepartment => {
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
        if (this.props.reloadDepartmentsList !== null) {
          this.props.reloadDepartmentsList();
        }
        this.props.onClose("success");
      })
      .catch(err => {
        if (this.props.reloadDepartmentsList !== null) {
          this.props.reloadDepartmentsList();
        }
        this.props.onClose("error", err);
      })
      .finally(() => {
        this.setState({ open: false });
      });
  };

  render() {
    const { department } = this.props;

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
                      this.updateAndClose(editDepartment);
                    }}
                    color="primary"
                  >
                    Update
                  </Button>
                </DialogActions>
              </Dialog>
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
