import React, { Component, Fragment } from "react";
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

import { Button, ExpansionPanelActions } from "@material-ui/core";

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
  }
});
class CreateNewFacultyForm extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
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
      clearInchargeSubcategoryChips: false
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
      return <Fragment/>;
    }
  };

  render() {
    const { classes } = this.props;
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
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={6} md={6} className={classes.formControl}>
                  <FormControl fullWidth>
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
                <GridItem xs={12} sm={6} md={6} className={classes.formControl}>
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
              </GridContainer>
              <Spacing/>
              <GridContainer>
                <GridItem xs={12} sm={4} md={4} className={classes.formControl}>
                  <FormControl fullWidth>
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
                  sm={8}
                  md={8}
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
                <GridItem
                  xs={12}
                  sm={8}
                  md={8}
                  className={classes.elementPadding}
                >
                  <ReactChipInput
                    style={{ zIndex: 0 }}
                    label="In-charge Sub-Categories"
                    hintText="Select in-charge sub-categories"
                    data={this.state.subcategoryList}
                    getSelectedObjects={this.getSelectedInchargeSubcategories}
                    clearChips={this.state.clearInchargeSubcategoryChips}
                    onChipsCleared={this.chipsCleared}
                  />
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
                <Button
                  size="small"
                  color="primary"
                  onClick={e => {
                    e.preventDefault();
                    if (this.state.isInCharge) {
                      addFaculty({
                        variables: {
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
                            inChargeSubcategories: this.state
                              .inChargeSubcategories
                          }
                        }
                      });
                    } else {
                      addFaculty({
                        variables: {
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
                        }
                      });
                    }
                  }}
                >
                  Assign
                </Button>
              </ExpansionPanelActions>
            </div>
          );
        }}
      </Mutation>
    );
  }
}
export default withStyles(styles)(CreateNewFacultyForm);
