import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import ReactChipInput from "../../../components/AutoChip/ReactChipSelect";
import Spacing from "../../../components/Spacing/Spacing";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import CustomSnackbar from "../../../components/Snackbar/CustomSnackbar";
import {
  Button,
  CircularProgress,
  ExpansionPanelActions,
  Snackbar,
  Tooltip
} from "@material-ui/core";
import formControlStyle from "../../../assets/jss/form-control";

class CreateNewFacultyForm extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      toolOpen: false,
      setOpen: false,
      subcategories: [],
      department: {
        name: ""
      },
      category: {
        name: ""
      },
      username: "",
      password: "",
      name: "",
      email: "",
      phoneNumber: "",
      isInCharge: false,
      isInChargeText: "",
      inChargeSubcategories: [],
      subcategoryList: [],
      clearSubcategoryChips: false,
      clearInchargeSubcategoryChips: false,
      redirecter: false,
      snackbar: {
        open: false,
        variant: "error",
        message: ""
      }
    };
  }

  getSelectedSubcategories = selectedSubcategories => {
    const subcategories = selectedSubcategories.map(selectedSubcategory => {
      return selectedSubcategory.value;
    });
    this.setState({
      ...this.state,
      subcategories
    });
  };
  getSelectedInchargeSubcategories = selectedInchargeSubcategories => {
    const inChargeSubcategories = selectedInchargeSubcategories.map(
      selectedInchargeSubcategory => {
        return selectedInchargeSubcategory.value;
      }
    );
    this.setState({
      ...this.state,
      inChargeSubcategories
    });
  };
  chipsCleared = () => {
    this.setState({
      ...this.state,
      clearInchargeSubcategoryChips: false,
      clearSubcategoryChips: false
    });
  };
  toggleInChargeSwitch = () => {
    this.setState({
      ...this.state,
      isInCharge: !this.state.isInCharge
    });
  };
  handleValueChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };
  handleCategorySelect = event => {
    const categoryDetail = event.target.value;
    let availableSubcategories = categoryDetail.subcategory.map(subcategory => {
      return {
        key: subcategory._id,
        label: subcategory.name
      };
    });
    this.setState({
      ...this.state,
      [event.target.name]: categoryDetail.category,
      subcategoryList: availableSubcategories,
      subcategories: [],
      clearSubcategoryChips: true,
      clearInchargeSubcategoryChips: true
    });
  };
  handleReset = e => {
    this.setState({
      subcategories: [],
      department: {
        name: ""
      },
      category: {
        name: ""
      },
      username: "",
      password: "",
      name: "",
      email: "",
      phoneNumber: "",
      isInCharge: false,
      isInChargeText: "",
      inChargeSubcategories: [],
      subcategoryList: [],
      clearSubcategoryChips: true,
      clearInchargeSubcategoryChips: true
    });
  };
  renderCategoryDropdown = () => {
    if (this.props.categoryDetails) {
      return this.props.categoryDetails.map(categoryDetail => {
        return (
          <MenuItem value={categoryDetail} key={categoryDetail.category._id}>
            {categoryDetail.category.name}
          </MenuItem>
        );
      });
    } else {
      return <Fragment />;
    }
  };
  // open snackbar
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
    }, 4000);
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

  handleClick = (addFaculty, e) => {
    e.preventDefault();
    // check if name or desc fields are empty, if so, throw up snackbar and set msg accordingly
    if (
      !this.state.name ||
      !this.state.username ||
      !this.state.email ||
      !this.state.password
    ) {
      this.setState(
        {
          snackbar: {
            ...this.state.snackbar,
            variant: "error",
            message: "Fields are left empty!"
          }
        },
        () => this.openSnackbar()
      );
    } else if (!this.state.department.name) {
      this.setState(
        {
          snackbar: {
            ...this.state.snackbar,
            variant: "error",
            message: "Department is not selected!"
          }
        },
        () => this.openSnackbar()
      );
    } else {
      // set loading state and start mutation. upon completion, change loading states
      this.setState({
        loading: true
      });

      let variables;
      if (this.state.isInCharge) {
        variables = {
          facultyInput: {
            username: this.state.username,
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            phoneNumber: this.state.phoneNumber,
            department: this.state.department._id,
            category: this.state.category._id,
            subcategory: this.state.subcategories,
            isInCharge: this.state.isInCharge,
            inChargeSubcategories: this.state.inChargeSubcategories
          }
        };
      } else {
        variables = {
          facultyInput: {
            username: this.state.username,
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            phoneNumber: this.state.phoneNumber,
            department: this.state.department._id,
            category: this.state.category._id,
            subcategory: this.state.subcategories,
            isInCharge: this.state.isInCharge
          }
        };
      }
      addFaculty({
        variables: variables
      })
        .then(response => {
          console.log("then called");
          this.setState(
            {
              loading: false,
              snackbar: {
                ...this.state.snackbar,
                variant: "success",
                message: "New Faculty Added!"
              }
            },
            () => this.openSnackbar()
          );
          if (this.props.reloadFacultiesList !== null) {
            this.props.reloadFacultiesList();
          }
        })
        .catch(err => {
          this.setState({
            loading: false
          });
          this.closeSnackbar();
          console.log("catch called");
          console.log(err);
          if (this.props.reloadFacultiesList !== null) {
            this.props.reloadFacultiesList();
          }
          this.setState(
            {
              snackbar: {
                ...this.state.snackbar,
                variant: "warning",
                message: "Error" + err.message
              }
            },
            () => this.openSnackbar()
          );
        });
    }
  };

  handleTooltipClose = () => {
    this.setState({
      toolOpen: true
    });
  };

  handleTooltipOpen = () => {
    this.setState({
      toolOpen: false
    });
  };

  render() {
    const { classes } = this.props;
    const { loading, snackbar, toolOpen } = this.state;
    const ADD_FACULTY = gql`
      mutation addFaculty($facultyInput: FacultyInput!) {
        addFaculty(facultyInput: $facultyInput) {
          _id
        }
      }
    `;

    return (
      <Mutation mutation={ADD_FACULTY} onCompleted={this.handleReset}>
        {addFaculty => {
          return (
            <div className={classes.root}>
              <Typography>
                <strong>Basic Info</strong>
              </Typography>
              <form onSubmit={e => this.handleClick(addFaculty, e)}>
                <GridContainer>
                  <GridItem
                    xs={12}
                    sm={4}
                    md={4}
                    className={classes.elementPadding}
                  >
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="name"
                      label="Name"
                      type="name"
                      name="name"
                      onChange={this.handleValueChange}
                      value={this.state.name}
                      fullWidth
                    />
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={4}
                    md={4}
                    className={classes.elementPadding}
                  >
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="email"
                      label="Email Address"
                      type="email"
                      name="email"
                      onChange={this.handleValueChange}
                      value={this.state.email}
                      fullWidth
                    />
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={4}
                    md={4}
                    className={classes.elementPadding}
                  >
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="username"
                      label="Username"
                      type="text"
                      name="username"
                      onChange={this.handleValueChange}
                      value={this.state.username}
                      fullWidth
                    />
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={4}
                    md={4}
                    className={classes.elementPadding}
                  >
                    <TextField
                      autoFocus
                      margin="dense"
                      id="phone"
                      required
                      label="Phone Number"
                      type="phone"
                      name="phoneNumber"
                      onChange={this.handleValueChange}
                      value={this.state.phoneNumber}
                      fullWidth
                    />
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={4}
                    md={4}
                    className={classes.elementPadding}
                  >
                    <Tooltip
                      disableFocusListener
                      title="At least 8 characters & a mixture of letters and numbers recommended"
                    >
                      <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        name="password"
                        onChange={this.handleValueChange}
                        value={this.state.password}
                        fullWidth
                      />
                    </Tooltip>
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={4}
                    md={4}
                    className={classes.formControl}
                  >
                    <FormControl required fullWidth>
                      <InputLabel htmlFor="department">Department</InputLabel>
                      <Select
                        required
                        onChange={this.handleValueChange}
                        value={this.state.department.name}
                        renderValue={department => {
                          return department;
                        }}
                        inputProps={{
                          name: "department",
                          id: "department"
                        }}
                        fullWidth
                      >
                        {this.props.departments.map(department => {
                          return (
                            <MenuItem key={department._id} value={department}>
                              {department.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <Spacing />
                <Typography>
                  <strong>In-charge Info</strong>
                </Typography>
                <GridContainer>
                  <GridItem
                    xs={12}
                    sm={2}
                    md={2}
                    className={classes.formControl}
                  >
                    <FormControlLabel
                      control={
                        <Switch
                          name="isInCharge"
                          checked={this.state.isInCharge}
                          onChange={this.toggleInChargeSwitch}
                          value={this.state.isInCharge}
                          color="primary"
                        />
                      }
                      label="In-charge"
                    />
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={9}
                    md={9}
                    className={classes.formControl}
                  >
                    <FormControl required fullWidth>
                      <InputLabel htmlFor="category">Category</InputLabel>
                      <Select
                        onChange={this.handleCategorySelect}
                        value={this.state.category.name}
                        renderValue={value => {
                          return value;
                        }}
                        inputProps={{
                          name: "category",
                          id: "category"
                        }}
                        fullWidth
                      >
                        {this.renderCategoryDropdown()}
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={12}
                    className={classes.elementPadding}
                  >
                    <ReactChipInput
                      style={{ zIndex: 0 }}
                      data={this.state.subcategoryList}
                      label="Sub-Categories"
                      hintText="Select sub-categories"
                      getSelectedObjects={this.getSelectedSubcategories}
                      clearChips={this.state.clearSubcategoryChips}
                      onChipsCleared={this.chipsCleared}
                    />
                  </GridItem>
                  <Spacing />
                  <GridItem
                    xs={12}
                    sm={12}
                    md={12}
                    className={classes.elementPadding}
                  >
                    {this.state.isInCharge ? (
                      <ReactChipInput
                        style={{ zIndex: 0 }}
                        label="In-charge Sub-Categories"
                        hintText="Select in-charge sub-categories"
                        data={this.state.subcategoryList}
                        getSelectedObjects={
                          this.getSelectedInchargeSubcategories
                        }
                        clearChips={this.state.clearInchargeSubcategoryChips}
                        isDisabled={!this.state.isInCharge}
                        onChipsCleared={this.chipsCleared}
                      />
                    ) : null}
                  </GridItem>
                </GridContainer>
                <ExpansionPanelActions>
                  <Button
                    size="small"
                    onClick={e => {
                      e.preventDefault();
                      this.handleReset();
                    }}
                  >
                    Clear
                  </Button>
                  <div className={classes.wrapper}>
                    <Button
                      size="small"
                      color="primary"
                      variant="outlined"
                      type={"submit"}
                      disabled={loading}
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

CreateNewFacultyForm.propTypes = {
  classes: PropTypes.object.isRequired,
  categoryDetails: PropTypes.object.isRequired,
  departments: PropTypes.object.isRequired,
  reloadFacultiesList: PropTypes.func.isRequired
};
export default withStyles(formControlStyle)(CreateNewFacultyForm);
