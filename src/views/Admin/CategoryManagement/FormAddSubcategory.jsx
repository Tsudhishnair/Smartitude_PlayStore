import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import TextField from "@material-ui/core/TextField";
import {
  Button,
  CircularProgress,
  ExpansionPanelActions,
  Snackbar
} from "@material-ui/core";
import { Mutation } from "react-apollo";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import green from "@material-ui/core/colors/green";

import CustomSnackbar from "../../../components/Snackbar/CustomSnackbar";

const styles = theme => ({
  root: {
    // display: "flex",
    flexGrow: 1
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

// mutation command
const ADD_SUBCATEGORY = gql`
  mutation addSubcategory($subcategoryInput: SubcategoryInput!) {
    addSubcategory(subcategoryInput: $subcategoryInput) {
      _id
    }
  }
`;

class FormAddSubcategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      name: "",
      description: "",
      category: {
        name: "",
        _id: ""
      },
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
      description: "",
      category: {
        name: "",
        _id: ""
      }
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
  handleClick = (addSubcategory, e) => {
    e.preventDefault();
    // check if name or desc fields are empty, if so, throw up snackbar and set msg accordingly
    if (!this.state.name || !this.state.description) {
      this.setState(
        {
          snackbar: {
            ...this.state.snackbar,
            variant: "error",
            message: "Subcategory name/description field empty!"
          }
        },
        () => this.openSnackbar()
      );
    } else if (!this.state.category.name) {
      this.setState(
        {
          snackbar: {
            ...this.state.snackbar,
            variant: "error",
            message: "Please choose a category!"
          }
        },
        () => this.openSnackbar()
      );
    } else {
      // set loading state and start mutation. upon completion, change loading states
      this.setState({
        loading: true
      });
      addSubcategory({
        variables: {
          subcategoryInput: {
            category: this.state.category._id,
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
                message: "Subcategory Added!"
              }
            },
            () => this.openSnackbar()
          );
          if (this.props.reloadList !== null) {
            this.props.reloadList();
          }
        })
        .catch(err => {
          this.setState({
            loading: false
          });
          this.closeSnackbar();
          if (this.props.reloadList !== null) {
            this.props.reloadList();
          }
        });
    }
  };

  render() {
    const { classes, categories } = this.props;
    const { loading, snackbar } = this.state;

    return (
      <Mutation mutation={ADD_SUBCATEGORY} onCompleted={this.clearForm}>
        {addSubcategory => {
          return (
            <div className={classes.root}>
              <form>
                <GridContainer>
                  <GridItem
                    xs={12}
                    sm={4}
                    md={4}
                    // className={classes.formControl}
                  >
                    <InputLabel htmlFor="category">
                      Choose the Category
                    </InputLabel>
                    <Select
                      required
                      onChange={this.handleChange}
                      value={this.state.category}
                      renderValue={value => {
                        return value.name;
                      }}
                      inputProps={{
                        name: "category",
                        id: "category"
                      }}
                      fullWidth
                    >
                      {categories.map(categoryItem => {
                        const category = {
                          _id: categoryItem._id,
                          name: categoryItem.name,
                          description: categoryItem.description
                        };
                        return (
                          <MenuItem key={category._id} value={category}>
                            {category.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </GridItem>
                  <GridItem
                    xs={12}
                    md={12}
                    sm={12}
                    className={classes.formControl}
                  >
                    <TextField
                      autoFocus
                      margin="normal"
                      id="name"
                      name="name"
                      label="Subcategory Name"
                      placeholder={"Enter the Subcategory name here"}
                      type="name"
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
                      label="Subcategory Description"
                      placeholder={"Enter a description for the subcategory"}
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
                  <Button size="small" onClick={this.clearForm}>
                    Clear
                  </Button>
                  <div className={classes.wrapper}>
                    <Button
                      size="small"
                      color="primary"
                      variant="outlined"
                      type={"submit"}
                      onClick={e => this.handleClick(addSubcategory, e)}
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

FormAddSubcategory.propTypes = {
  classes: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  reloadList: PropTypes.func.isRequired
};
export default withStyles(styles)(FormAddSubcategory);
