import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import TextField from "@material-ui/core/TextField";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import {
  ExpansionPanelActions,
  Button,
  CircularProgress,
  Snackbar
} from "@material-ui/core";
import { Mutation } from "../../../../node_modules/react-apollo";

import CustomSnackbar from "../../../components/Snackbar/CustomSnackbar";

import gql from "graphql-tag";

const styles = theme => ({
  formControl: {
    margin: 0,
    padding: theme.spacing.unit * 10,
    fullWidth: true,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    backgroundColor: "#9ee",
    wrap: "nowrap"
  },
  elementPadding: {
    padding: "15px",
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 10
  },
  container: {
    display: "flex",

    flexGrow: 1
  },
  root: {
    flexGrow: 1,
    marginLeft: 10
  },
  button: {
    margin: theme.spacing.unit * 4
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: "relative"
  }
});

const DEPARTMENT_LIST = gql`
  mutation addDepartment($name: String!, $description: String!) {
    addDepartment(name: $name, description: $description) {
      _id
    }
  }
`;
class FormAddDepartment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        name: "",
        description: ""
      },
      loading: false,
      snackbar: {
        open: false,
        message: ""
      }
    };
  }

  openSnackbar = () => {
    this.setState({
      snackbar: {
        ...this.state.snackbar,
        open: true
      }
    });
  };

  closeSnackbar = () => {
    this.setState({
      snackbar: {
        ...this.state.snackbar,
        open: false
      }
    });
  };

  handleClick = (addDepartment, e) => {
    if (!this.state.form.name) {
      this.setState(
        {
          snackbar: {
            ...this.state.snackbar,
            message: "Name field empty!"
          }
        },
        () => this.openSnackbar()
      );
    } else if (!this.state.form.description) {
      this.setState(
        {
          snackbar: {
            ...this.state.snackbar,
            message: "Description field empty!"
          }
        },
        () => this.openSnackbar()
      );
    } else {
      this.setState({
        loading: true
      });
      addDepartment({
        variables: {
          name: this.state.form.name,
          description: this.state.form.description
        }
      })
        .then(response => {
          this.setState({
            loading: false
          });
        })
        .catch(err => {
          this.setState({
            loading: false
          });
        });
    }
  };

  handleName = event => {
    this.setState({
      form: {
        ...this.state.form,
        name: event.target.value
      }
    });
  };

  handleDescription = event => {
    this.setState({
      form: {
        ...this.state.form,
        description: event.target.value
      }
    });
  };

  render() {
    const { classes } = this.props;
    const { loading, snackbar } = this.state;

    return (
      <Mutation mutation={DEPARTMENT_LIST}>
        {(addDepartment, data) => (
          <div className={classes.root}>
            <GridContainer>
              <GridItem xs={6} md={6}>
                <TextField
                  autoFocus
                  margin="normal"
                  id="name"
                  label="Department Name"
                  type="name"
                  value={this.state.form.name}
                  onChange={this.handleName}
                  fullWidth
                  required
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Description"
                  type="name"
                  value={this.state.form.description}
                  onChange={this.handleDescription}
                  multiline
                  fullWidth
                  required
                />
              </GridItem>
            </GridContainer>
            <ExpansionPanelActions>
              <Button
                size="small"
                onClick={e => {
                  e.preventDefault();
                }}
              >
                Clear
              </Button>
              <div className={classes.wrapper}>
                <Button
                  size="small"
                  color="primary"
                  variant="outlined"
                  disabled={loading}
                  onClick={e => this.handleClick(addDepartment, e)}
                >
                  Assign
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </ExpansionPanelActions>
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
                variant="error"
                message={snackbar.message}
              />
            </Snackbar>
          </div>
        )}
      </Mutation>
    );
  }
}

FormAddDepartment.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FormAddDepartment);
