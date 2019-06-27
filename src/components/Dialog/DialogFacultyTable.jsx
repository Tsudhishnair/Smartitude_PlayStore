import gql from "graphql-tag";
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import formControlStyle from "../../assets/jss/form-control";

import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Switch,
  FormControlLabel,
  Slide,
  Typography,
  Tooltip
} from "@material-ui/core";

import ReactChipInput from "../AutoChip/ReactChipSelect";
import { Mutation } from "react-apollo";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Spacing from "../Spacing/Spacing";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const DELETE_FACULTY = gql`
  mutation deleteFaculty($_id: ID!) {
    deleteFaculty(_id: $_id) {
      _id
    }
  }
`;

class DialogFacultyTable extends React.Component {
  initialSubcategories = [];
  initialInChargeSubcategories = [];
  reloadFacultiesList = null;

  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      loading: false,
      open: false,
      name: "",
      username: "",
      _id: "",
      email: "",
      phoneNumber: "",
      category: "",
      subcategory: [],
      subcategoryList: [],
      isInCharge: false,
      inChargeSubcategories: [],
      department: {
        name: "",
        _id: ""
      }
    };
  }

  getSelectedSubcategories = selectedSubcategories => {
    const subcategory = selectedSubcategories.map(selectedSubcategory => {
      return selectedSubcategory.value;
    });
    this.setState({
      ...this.state,
      subcategory
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

  handleClickOpen = (faculty, reloadFacultiesList) => {
    this.reloadFacultiesList = reloadFacultiesList;
    this.initialSubcategories = faculty.subcategory.map(subcategory => {
      return {
        label: subcategory.name,
        value: subcategory._id
      };
    });
    this.initialInChargeSubcategories = faculty.inChargeSubcategories.map(
      inChargeSubcategory => {
        return {
          label: inChargeSubcategory.name,
          value: inChargeSubcategory._id
        };
      }
    );
    this.setState({ open: true });
    const subcategory = faculty.subcategory.map(subcategory => {
      return subcategory._id;
    });
    const category = faculty.category._id;
    let currentCategoryDetail;
    const categoryListSize = this.props.categoryDetails.length;
    for (let i = 0; i < categoryListSize; i++) {
      const categoryDetail = this.props.categoryDetails[i];
      if (categoryDetail.category._id === category) {
        currentCategoryDetail = categoryDetail;
        break;
      }
    }
    let currentSubcategory = currentCategoryDetail.subcategory.map(
      subcategory => {
        return {
          key: subcategory._id,
          label: subcategory.name
        };
      }
    );
    this.setState({
      ...faculty,
      subcategory,
      subcategoryList: currentSubcategory
    });
    if (faculty.isInCharge) {
      const inChargeSubcategories = faculty.inChargeSubcategories.map(
        inChargeSubcategory => {
          return inChargeSubcategory._id;
        }
      );
      this.setState({
        inChargeSubcategories
      });
    }
  };
  toggleInChargeSwitch = () => {
    this.setState({
      ...this.state,
      isInCharge: !this.state.isInCharge
    });
  };

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  handleValueChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  handleClose = () => {
    this.initialSubcategories = null;
    this.initialInChargeSubcategories = null;
    this.setState({
      open: false,
      name: "",
      username: "",
      _id: "",
      email: "",
      phoneNumber: "",
      category: "",
      subcategory: [],
      subcategoryList: [],
      isInCharge: false,
      inChargeSubcategories: [],
      department: {
        name: "",
        _id: ""
      }
    });
    this.props.onClose();
  };
  // delete faculty
  handleDelete = (e, deleteFaculty) => {
    e.preventDefault();
    deleteFaculty({
      variables: {
        _id: this.state._id
      }
    })
      .then(response => {
        console.log("then called");
        if (this.reloadFacultiesList !== null) {
          this.reloadFacultiesList();
        }
        this.props.onClose("success");
      })
      .catch(err => {
        console.log("catch called");
        console.log(err);
        if (this.reloadFacultiesList !== null) {
          this.reloadFacultiesList();
        }
        this.props.onClose("error", err);
      })
      .finally(() => {
        this.setState({ open: false });
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
      subcategory: [],
      clearSubcategoryChips: true,
      clearInchargeSubcategoryChips: true
    });
  };
  updateAndClose = async (editFaculty, e) => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    let facultyEditInput;
    if (this.state.isInCharge) {
      facultyEditInput = {
        name: this.state.name,
        username: this.state.username,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        department: this.state.department._id,
        isInCharge: this.state.isInCharge,
        category: this.state.category._id,
        subcategory: this.state.subcategory,
        inChargeSubcategories: this.state.inChargeSubcategories
      };
    } else {
      facultyEditInput = {
        name: this.state.name,
        username: this.state.username,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        department: this.state.department._id,
        isInCharge: this.state.isInCharge,
        category: this.state.category._id,
        subcategory: this.state.subcategory
      };
    }
    editFaculty({
      variables: {
        _id: this.state._id,
        facultyEditInput: facultyEditInput
      }
    })
      .then(response => {
        this.setState({
          loading: false
        });
        if (this.reloadFacultiesList !== null) {
          this.reloadFacultiesList();
        }
        this.props.onClose("success");
        this.handleClose();
      })
      .catch(err => {
        this.setState({
          loading: false
        });
        if (this.reloadFacultiesList !== null) {
          this.reloadFacultiesList();
        }
        this.props.onClose("error", err);
      });
  };

  render() {
    const { classes } = this.props;
    const { loading } = this.state;

    const EDIT_FACULTY_QUERY = gql`
      mutation editFaculty($_id: ID!, $facultyEditInput: FacultyEditInput!) {
        editFaculty(_id: $_id, facultyEditInput: $facultyEditInput) {
          _id
        }
      }
    `;
    return (
      <Mutation mutation={EDIT_FACULTY_QUERY}>
        {editFaculty => {
          return (
            <div>
              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                scroll={"body"}
                TransitionComponent={Transition}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">
                  Edit Faculty Details
                </DialogTitle>
                <form onSubmit={e => this.updateAndClose(editFaculty, e)}>
                  <DialogContent>
                    <DialogContentText>
                      <GridContainer>
                        <GridItem
                          xs={6}
                          sm={6}
                          md={6}
                          className={classes.elementPadding}
                        >
                          Edit below to update/modify an individual faculty
                          data.
                        </GridItem>
                        <GridItem
                          xs={2}
                          sm={2}
                          md={2}
                          className={classes.elementPadding}
                        >
                          <Typography>Questions Submitted</Typography>
                          <Typography>
                            <h4>
                              <strong>{0}</strong>
                            </h4>
                          </Typography>
                        </GridItem>
                        <GridItem
                          xs={2}
                          sm={4}
                          md={4}
                          className={classes.elementPadding}
                        >
                          <Mutation
                            mutation={DELETE_FACULTY}
                            onCompleted={this.handleClose}
                          >
                            {deleteFaculty => (
                              <Button
                                onClick={e =>
                                  this.handleDelete(e, deleteFaculty)
                                }
                                fullWidth
                                color="primary"
                                disabled={loading}
                              >
                                Delete Faculty
                              </Button>
                            )}
                          </Mutation>
                        </GridItem>
                      </GridContainer>
                    </DialogContentText>
                    <div className={classes.root}>
                      <Spacing />
                      <Typography>
                        {" "}
                        <strong>Basic Info</strong>
                      </Typography>
                      <GridContainer>
                        <GridItem
                          xs={12}
                          sm={4}
                          md={4}
                          className={classes.elementPadding}
                        >
                          <Tooltip
                            disableFocusListener
                            title="Special characters or numbers are not allowed"
                          >
                            <TextField
                              id="name"
                              label="Name"
                              name="name"
                              type="name"
                              required
                              disabled={loading}
                              InputProps={{
                                inputProps: { pattern: "^[a-zA-Z ]*$" }
                              }}
                              onChange={this.handleValueChange}
                              value={this.state.name}
                              fullWidth
                            />
                          </Tooltip>
                        </GridItem>
                        <GridItem
                          xs={12}
                          sm={4}
                          md={4}
                          className={classes.elementPadding}
                        >
                          <Tooltip
                            disableFocusListener
                            title="Special characters or numbers are not allowed"
                          >
                            <TextField
                              id="username"
                              name="username"
                              required
                              disabled={loading}
                              onChange={this.handleValueChange}
                              label="Username"
                              type="name"
                              InputProps={{
                                inputProps: { pattern: "^[a-zA-Z ]*$" }
                              }}
                              value={this.state.username}
                              fullWidth
                            />
                          </Tooltip>
                        </GridItem>
                        <GridItem
                          xs={12}
                          sm={4}
                          md={4}
                          className={classes.elementPadding}
                        >
                          <TextField
                            id="email"
                            onChange={this.handleValueChange}
                            name="email"
                            required
                            disabled={loading}
                            label="Email Address"
                            type="email"
                            value={this.state.email}
                            fullWidth
                          />
                        </GridItem>
                      </GridContainer>
                      <Spacing />
                      <GridContainer>
                        <GridItem
                          xs={12}
                          sm={6}
                          md={6}
                          className={classes.formControl}
                        >
                          <FormControl fullWidth disabled={loading}>
                            <InputLabel htmlFor="age-simple">
                              Department
                            </InputLabel>
                            <Select
                              onChange={this.handleValueChange}
                              value={this.state.department.name}
                              disabled={loading}
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
                                  <MenuItem
                                    key={department._id}
                                    value={department}
                                  >
                                    {department.name}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </GridItem>
                        <GridItem
                          xs={12}
                          sm={6}
                          md={6}
                          className={classes.elementPadding}
                        >
                          <TextField
                            onChange={this.handleValueChange}
                            id="phoneNumber"
                            label="Phone Number"
                            required
                            disabled={loading}
                            type="number"
                            name="phoneNumber"
                            fullWidth
                            InputProps={{
                              inputProps: { min: 6000000000, max: 9999999999 }
                            }}
                            value={this.state.phoneNumber}
                          />
                        </GridItem>
                      </GridContainer>
                      <Spacing />
                      <Typography>
                        {" "}
                        <strong>In-charge Info</strong>
                      </Typography>
                      <GridContainer>
                        <GridItem
                          xs={12}
                          sm={4}
                          md={4}
                          className={classes.elementPadding}
                        >
                          <FormControlLabel
                            control={
                              <Switch
                                name="isInCharge"
                                checked={this.state.isInCharge}
                                disabled={loading}
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
                          sm={8}
                          md={8}
                          className={classes.formControl}
                        >
                          <FormControl fullWidth>
                            <InputLabel htmlFor="category">Category</InputLabel>
                            <Select
                              onChange={this.handleCategorySelect}
                              value={this.state.category.name}
                              disabled={loading}
                              required
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
                            initialValues={
                              this.initialSubcategories
                                ? this.initialSubcategories
                                : undefined
                            }
                            style={{ zIndex: 0 }}
                            data={this.state.subcategoryList}
                            label="Sub-Categories"
                            required
                            isDisabled={loading}
                            hintText="Select sub-categories"
                            getSelectedObjects={this.getSelectedSubcategories}
                            clearChips={this.state.clearSubcategoryChips}
                            onChipsCleared={this.chipsCleared}
                          />
                        </GridItem>
                      </GridContainer>
                      <Spacing />
                      <GridContainer>
                        {this.state.isInCharge && (
                          <GridItem
                            xs={12}
                            sm={12}
                            md={12}
                            className={classes.elementPadding}
                          >
                            <ReactChipInput
                              initialValues={
                                this.initialInChargeSubcategories
                                  ? this.initialInChargeSubcategories
                                  : undefined
                              }
                              style={{ zIndex: 0 }}
                              label="In-charge Sub-Categories"
                              hintText="Select in-charge sub-categories"
                              isDisabled={!this.state.isInCharge || loading}
                              data={this.state.subcategoryList}
                              getSelectedObjects={
                                this.getSelectedInchargeSubcategories
                              }
                              clearChips={
                                this.state.clearInchargeSubcategoryChips
                              }
                              onChipsCleared={this.chipsCleared}
                            />
                          </GridItem>
                        )}
                      </GridContainer>
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <Button size={"small"} onClick={this.handleClose}>
                      Cancel
                    </Button>
                    <div className={classes.wrapper}>
                      <Button
                        size={"small"}
                        color="primary"
                        variant={"outlined"}
                        type={"submit"}
                        disabled={loading}
                      >
                        Save
                      </Button>
                      {loading && (
                        <CircularProgress
                          size={24}
                          className={classes.buttonProgress}
                        />
                      )}
                    </div>
                  </DialogActions>
                </form>
              </Dialog>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

DialogFacultyTable.propTypes = {
  classes: PropTypes.object.isRequired,
  categoryDetails: PropTypes.array.isRequired,
  departments: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired
};

export default withStyles(formControlStyle)(DialogFacultyTable);
