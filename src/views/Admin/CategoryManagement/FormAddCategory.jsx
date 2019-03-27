import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import TextField from "@material-ui/core/TextField";
import { Button, CircularProgress, ExpansionPanelActions, Snackbar } from "@material-ui/core";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import CustomSnackbar from "../../../components/Snackbar/CustomSnackbar";
import green from "@material-ui/core/colors/green";

const styles = theme => ({
  root: {
    dispaly: "felx",
    flexGrow: 1
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
class FormAddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      redirecter: false,
      snackbar: {
        open: false,
        variant: "error",
        message: ""
      }
    };
  }
  // handle changes in form fields
  handleChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  clearForm = () => {
    this.setState({
      name: "",
      description: ""
    });
  };
  // open snackbar
  openSnackbar = () => {
    this.setState({
      snackbar: {
        ...this.state.snackbar,
        open: true
      }
    });
  };

  // close snackbar by changing open state
  closeSnackbar = () => {
    this.setState({
      snackbar: {
        ...this.state.snackbar,
        open: false
      }
    });
  };
  handleClick = (addCategory, e) => {
    e.preventDefault();
    // check if name or desc fields are empty, if so, throw up snackbar and set msg accordingly
    if (!this.state.name) {
      this.setState(
        {
          snackbar: {
            ...this.state.snackbar,
            variant: "error",
            message: "Category name field empty!"
          }
        },
        () => this.openSnackbar()
      );
    } else if (!this.state.description) {
      this.setState(
        {
          snackbar: {
            ...this.state.snackbar,
            variant: "error",
            message: "Category description field empty!"
          }
        },
        () => this.openSnackbar()
      );
    } else {
      // set loading state and start mutation. upon completion, change loading states
      this.setState({
        loading: true
      });
      addCategory({
        variables: {
          categoryInput: {
            name: this.state.name,
            description: this.state.description
          }
        }
      })
        .then(response => {
          this.setState(
            {
              loading: false,
              snackbar: {
                ...this.state.snackbar,
                variant: "success",
                message: "New Category Added!"
              }
            },
            () => this.openSnackbar()
          );
        })
        .catch(err => {
          this.setState({
            loading: false
          });
          this.closeSnackbar();
        });
    }
  };


  render() {
    const ADD_CATEGORY = gql`
      mutation addCategory($categoryInput: CategoryInput!) {
        addCategory(categoryInput: $categoryInput) {
          _id
        }
      }
    `;
    const { classes } = this.props;
    const { loading, snackbar } = this.state;
    return (
      <Mutation mutation={ADD_CATEGORY} onCompleted={this.clearForm}>
        {addCategory => {
          return (
            <div className={classes.root}>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  addCategory({
                    variables: {
                      categoryInput: {
                        name: this.state.name,
                        description: this.state.description
                      }
                    }
                  });
                }}
              >
                <GridContainer>
                  <GridItem xs={6} md={6}>
                    <TextField
                      autoFocus
                      margin="normal"
                      id="name"
                      name="name"
                      label="Category Name"
                      placeholder={"Enter the category name here"}
                      type="text"
                      value={this.state.name}
                      onChange={this.handleChange}
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
                      id="description"
                      name="description"
                      placeholder={"Enter a description for the category here"}
                      label="Category Description"
                      type="text"
                      value={this.state.description}
                      onChange={this.handleChange}
                      multiline
                      fullWidth
                      required
                    />
                  </GridItem>
                </GridContainer>
                <ExpansionPanelActions>
                  <div className={classes.wrapper}>
                    <Button
                      size="small"
                      color="primary"
                      variant="outlined"
                      type={"submit"}
                      onClick={e => this.handleClick(addCategory, e)}
                      disabled={loading}
                    >
                      Create
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
                    variant={snackbar.variant}
                    message={snackbar.message}
                  />
                </Snackbar>
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}
export default withStyles(styles)(FormAddCategory);
