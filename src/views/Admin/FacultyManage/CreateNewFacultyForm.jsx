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

import ReactChipInput from "../../../components/AutoChip/ReactChipSelect";
import Spacing from "../../../components/Spacing/Spacing";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import { ExpansionPanelActions, Button, Divider } from "@material-ui/core";

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
      deptdrop: {
        deptid: "",
        department: "",
        open: false
      },
      role: {
        isincharge: ""
      },
      assignval: {
        username: "",
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        department: "",
        category: "",
        subcategory: [],
        isincharge: false,
        inChargeSubcategory: []
      }
    };
  }
  handleRole = event => {
    this.setState({ role: { isincharge: event.target.value } });
    if (event.target.value === "Incharge") {
      this.setState({
        assignval: { ...this.state.assignval, isincharge: true }
      });
    } else {
      this.setState({
        assignval: { ...this.state.assignval, isincharge: false }
      });
    }
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = (value, id) => {
    console.log("Department");
    
    console.log(value);
    
    if (this.state.deptdrop.open) {
      this.setState({ deptdrop: { open: false } });
    }

    this.setState({ deptdrop: { deptid: id, department: value } });
    this.setState({
      assignval: {
        ...this.state.assignval,
        department: this.state.deptdrop.deptid
      }
    });
  };
  handleValueChange = event => {
    this.setState({
      assignval: {
        ...this.state.assignval,
        [event.target.name]: event.target.value
      }
    });
  };
  handleCategorySelect = categoryDetail => {
    console.log(categoryDetail);
    console.log("Clickeddd");
    
    let subcategories = categoryDetail.subcategory.map(subcategory => {
      return { label: subcategory.name };
    });
    this.setState({
      ...this.state,
      subcategories,
      assignval: {
        ...this.state.assignval,
        category: categoryDetail.category
      }
    });
  };
  handleReset = e => {
    this.setState({
      subcategories: [],
      deptdrop: {
        deptid: "",
        department: ""
      },
      role: {
        isincharge: ""
      },
      assignval: {
        username: "",
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        department: "",
        subcategory: [],
        isincharge: "",
        inChargeSubcategory: []
      }
    });
  };
  render() {
    const { classes } = this.props;
    const FETCH_FORM_FIELDS = gql`
      {
        departments {
          _id
          name
        }
        categoryDetailsList {
          category {
            _id
            name
          }
          subcategory {
            _id
            name
          }
        }
      }
    `;
    const ADD_FACULTY = gql`
      mutation addFaculty($facultyInput: FacultyInput!) {
        addFaculty(facultyInput: $facultyInput) {
          _id
        }
      }
    `;

    return (
      <Mutation mutation={ADD_FACULTY}>
        {addFaculty => {
          return (
            <Query query={FETCH_FORM_FIELDS}>
              {({ data, loading, error }) => {
                return (
                  <Fragment>
                    {!loading ? (
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
                              margin="dense"
                              id="name"
                              label="Name"
                              type="name"
                              name="name"
                              onChange={this.handleValueChange}
                              value={this.state.assignval.name}
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
                              id="email"
                              label="Email Address"
                              type="email"
                              name="email"
                              onChange={this.handleValueChange}
                              value={this.state.assignval.email}
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
                              id="username"
                              label="Username"
                              type="text"
                              name="username"
                              onChange={this.handleValueChange}
                              value={this.state.assignval.username}
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
                              label="Phone Number"
                              type="phone"
                              name="phoneNumber"
                              onChange={this.handleValueChange}
                              value={this.state.assignval.phoneNumber}
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
                              id="pssword"
                              label="Password"
                              type="password"
                              name="password"
                              onChange={this.handleValueChange}
                              value={this.state.assignval.password}
                              fullWidth
                            />
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem
                            xs={12}
                            sm={6}
                            md={6}
                            className={classes.formControl}
                          >
                            <FormControl fullWidth>
                              <InputLabel htmlFor="department">
                                Department
                              </InputLabel>
                              <Select
                                open={this.state.open}
                                onClose={this.handleClose}
                                onOpen={this.handleOpen}
                                onChange={this.handleChange}
                                value={this.state.deptdrop.department}
                                renderValue={value => {
                                  return value;
                                }}
                                inputProps={{
                                  name: "department",
                                  id: "dept"
                                }}
                                fullWidth
                              >
                                {data.departments.map(department => {
                                  return (
                                    <MenuItem
                                      onSelect={() =>
                                        this.handleChange(
                                          department.name,
                                          department._id
                                        )
                                      }
                                      value={department.name}
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
                            className={classes.formControl}
                          >
                            <FormControl fullWidth>
                              <InputLabel htmlFor="role">Role</InputLabel>
                              <Select
                                value={this.state.role.isincharge}
                                onChange={this.handleRole}
                                renderValue={value => {
                                  return value;
                                }}
                                inputProps={{
                                  name: "role",
                                  id: "role"
                                }}
                                fullWidth
                              >
                                <MenuItem
                                  value="Incharge"
                                  onClick={this.handleRole}
                                >
                                  Incharge
                                </MenuItem>
                                <MenuItem
                                  value="Faculty"
                                  onClick={this.handleRole}
                                  s
                                >
                                  Faculty
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </GridItem>
                        </GridContainer>
                        <Spacing />
                        <GridContainer>
                          <GridItem
                            xs={12}
                            sm={4}
                            md={4}
                            className={classes.formControl}
                          >
                            <FormControl fullWidth>
                              <InputLabel htmlFor="category">
                                Category
                              </InputLabel>
                              <Select
                                value={this.state.assignval.category}
                                renderValue={value => {
                                  return value;
                                }}
                                inputProps={{
                                  name: "category",
                                  id: "category"
                                }}
                                fullWidth
                              >
                                {data.categoryDetailsList.map(categoryDetail => {
                                  return (
                                    <MenuItem
                                      onClick={() =>
                                        this.handleCategorySelect(
                                          categoryDetail
                                        )
                                      }
                                      value={categoryDetail.category.name}
                                    >
                                      {categoryDetail.category.name}
                                    </MenuItem>
                                  );
                                })}
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
                              data={this.state.subcategories}
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
                              addFaculty({
                                variables: {
                                  facultyInput: {
                                    username: this.state.assignval.username,
                                    name: this.state.assignval.mname,
                                    email: this.state.assignval.email,
                                    password: this.state.assignval.password,
                                    phoneNumber: this.state.assignval
                                      .phoneNumber,
                                    department: this.state.deptdrop.deptid,
                                    batch: parseInt(
                                      this.state.assignval.batch.substring(0, 4)
                                    )
                                  }
                                }
                              });
                            }}
                          >
                            Assign
                          </Button>
                        </ExpansionPanelActions>
                      </div>
                    ) : (
                      <Fragment />
                    )}
                  </Fragment>
                );
              }}
            </Query>
          );
        }}
      </Mutation>
    );
  }
}
export default withStyles(styles)(CreateNewFacultyForm);
