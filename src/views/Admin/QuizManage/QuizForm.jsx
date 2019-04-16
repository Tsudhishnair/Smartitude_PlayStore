import React, { Fragment } from "react";

import { DateTimePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Link from "react-router-dom/es/Link";
import ReactChipInput from "../../../components/AutoChip/ReactChipSelect";
import {
  Button,
  Divider,
  ExpansionPanelActions,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Switch,
  TextField,
  Tooltip,
  Typography,
  withStyles
} from "@material-ui/core";

import { Delete } from "@material-ui/icons";

import moment from "moment";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";

import CustomSnackbar from "../../../components/Snackbar/CustomSnackbar";
import Spacing from "../../../components/Spacing/Spacing";
import PropTypes from "prop-types";

const styles = theme => ({
  formroot: {
    display: "flex",
    flexWrap: "wrap"
  },
  container: {
    display: "flex",
    flexGrow: 1
  },
  root: {
    display: "flex",
    flexWrap: "nowrap",
    autoWidth: true
  },
  date_root: {
    marginTop: theme.spacing.unit * 2,
    display: "flex",
    flexWrap: "nowrap",
    autoWidth: true
  },
  formControl: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    minWidth: 120,
    display: "flex",
    flexGrow: 1
  },
  button: {
    margin: theme.spacing.unit * 4
  }
});

//Query to access Batch Category and SubCategory details
const ALL_QUERY = gql`
  {
    batches
    categoryDetailsList {
      subcategory {
        _id
        name
      }
      category {
        _id
        name
      }
    }
  }
`;

//mutation to create a quiz
const ADD_QUIZ = gql`
  mutation createAdminQuiz($adminQuizRequest: AdminQuizRequest!) {
    createAdminQuiz(adminQuizRequest: $adminQuizRequest) {
      _id
    }
  }
`;
const CREATE_CUSTOM_QUIZ_QUERY = gql`
  query generateCustomQuiz($customQuizRequest: CustomQuizRequest!) {
    generateCustomQuiz(customQuizRequest: $customQuizRequest) {
      sections {
        category {
          _id
          name
        }
        subcategories {
          _id
          category {
            _id
            name
          }
          name
        }
        timeLimit
        questions {
          _id
          question
          createdBy {
            _id
            username
            name
            email
            phoneNumber
            department {
              _id
              name
              description
            }
            subcategory {
              _id
              category {
                _id
                name
              }
              name
            }
            isInCharge
          }
          category {
            _id
            name
          }
          subcategory {
            _id
            category {
              _id
              name
            }
            name
          }
          approvalStatus
          difficulty
          timesAttempted
          timesSolved
          options
          correctOption
          solution
        }
      }
      markPerQuestion
      negativeMarkPerQuestion
    }
  }
`;

//constants to handle from & to dates
const DATE_FROM = 1;
const DATE_TO = 2;
let requestedSections = [];
class QuizForm extends React.Component {
  //selectedDate --> state to store date
  constructor(props) {
    super(props);

    this.props = props;

    //maintain list of categories
    this.categories = [];

    //maintain list of batches
    this.batches = [];

    //total number of sections in the quiz
    this.numberOfSections = 0;

    //sets the current date for the from & to fields to the current date
    this.currentDate = new Date();

    //used to monitor errors in the system
    this.flag = true;

    this.state = {
      //maintain fields which are common to all sections
      quizCommon: {
        quizName: "",
        batch: "",
        activeFrom: new Date(),
        activeTo: new Date(),
        active: false,
        instructions: "",
        description: ""
      },
      //keeps separate data for separate sections
      quizSectionWise: [
        {
          //selected category
          category: {
            name: ""
          },
          //subcategories selected
          subcategories: [],
          //list of possible subcategories for the category selected
          subcategoryList: [],
          //if true, this clears the chips for subcategory
          clearSubcategoryChips: false,
          //number of questions in the section
          numberOfQuestions: 0,
          //time limit in mins
          timeLimit: 0,
          marksPerQn: 0,
          negativeMarksPerQn: 0
        }
      ],
      //maintain error states
      error: {
        //set to true if there is an error in the dates selected
        dates: {
          status: false,
          message: ""
        }
      },
      //snackbar controls
      snackbar: {
        open: false,
        variant: "error",
        message: "",
        duration: 4000
      }
    };
  }

  //set error flag to false
  makeFlagFalse = () => {
    this.flag = false;
  };

  //set error flag to true
  makeFlagTrue = () => {
    this.flag = true;
  };

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

  //close the snackbar
  closeSnackbar = () => {
    this.setState({
      snackbar: {
        ...this.state.snackbar,
        open: false
      }
    });
  };

  //handle date fields, both from & to, depending on the type passed
  handleDateChange = (date, type) => {
    if (type === DATE_FROM) {
      this.setState(
        prevState => ({
          quizCommon: {
            ...prevState.quizCommon,
            activeFrom: date
          }
        }),
        this.validateDates
      );
    } else if (type === DATE_TO) {
      this.setState(
        prevState => ({
          quizCommon: {
            ...prevState.quizCommon,
            activeTo: date
          }
        }),
        this.validateDates
      );
    }
  };

  //handle the boolean active field
  handleActiveField = event => {
    this.setState(prevState => ({
      quizCommon: {
        ...prevState.quizCommon,
        active: !prevState.quizCommon.active
      }
    }));
  };

  //handle All the function state addition
  handleCommonFieldChanges = event => {
    event.persist();

    this.setState(state => ({
      quizCommon: {
        ...state.quizCommon,
        [event.target.name]: event.target.value
      }
    }));
  };

  //Function is for obtaining subcategory corresponding to selected category
  handleCategorySelect = (event, index) => {
    const categoryDetail = event.target.value;
    let availableSubcategories = categoryDetail.subcategory.map(subcategory => {
      return {
        key: subcategory._id,
        label: subcategory.name
      };
    });
    this.setState({
      quizSectionWise: {
        ...this.state.quizSectionWise,
        [index]: {
          ...this.state.quizSectionWise[index],
          category: categoryDetail.category,
          subcategoryList: availableSubcategories,
          subcategories: [],
          clearSubcategoryChips: true
        }
      }
    });
  };

  handleSectionWiseFields = (event, index) => {
    this.setState({
      quizSectionWise: {
        ...this.state.quizSectionWise,
        [index]: {
          ...this.state.quizSectionWise[index],
          [event.target.name]: event.target.value
        }
      }
    });
  };

  //handleClick function is to add more options into the quiz
  handleClick = () => {
    this.numberOfSections++;

    //create new section in the quizSectionWise object of objects and initialize a view for this
    this.setState(prevState => ({
      quizSectionWise: {
        ...prevState.quizSectionWise,
        [this.numberOfSections]: {
          category: {
            name: ""
          },
          subcategories: [],
          subcategoryList: [],
          clearSubcategoryChips: false,
          numberOfQuestions: 0,
          timeLimit: 0,
          marksPerQn: 0,
          negativeMarksPerQn: 0
        }
      }
    }));
  };

  //handle delete icon click for each section
  handleDeleteClick = index => {
    let tempObj = this.state.quizSectionWise;

    //handle conditions where only one section is presnt
    if (Object.keys(tempObj).length < 2) {

    } else {
      //if more than one section is present, delete the section where the button was clicked and render new state
      delete tempObj[index];

      this.setState({
        quizSectionWise: {
          ...tempObj
        }
      });
    }
  };

  //called on submit button click
  handleSubmit = mutation => {
    //get data from the states and assign it to new objects to prevent disbehaviour
    const quizCommon = this.state.quizCommon;
    const dateError = this.state.error.dates.status;
    const quizSectionWise = this.state.quizSectionWise;

    //set flag value to true to reset it
    this.makeFlagTrue();

    //validate both common and sectionwise fields in the form
    this.validateCommonFields(quizCommon, dateError);
    this.validateSectionFields(quizSectionWise);

    //if no errors were found
    if (this.flag) {
      //transform quizSectionWise into an array for the mutation
      const sectionRequest = this.transformSections(quizSectionWise);

      //call mutation & set variables
      mutation({
        variables: {
          adminQuizRequest: {
            name: this.state.quizCommon.quizName,
            description: this.state.quizCommon.description,
            target: this.state.quizCommon.batch,
            active: this.state.quizCommon.active,
            activeFrom: this.state.quizCommon.activeFrom,
            activeTo: this.state.quizCommon.activeTo,
            instructions: this.state.quizCommon.instructions,
            requestedSections: sectionRequest
          }
        }
      })
        .then(res => {
          // on successful completion of the mutation
          this.setState(prevState => ({
            snackbar: {
              ...prevState.snackbar,
              open: true,
              variant: "success",
              message: "Quiz added successfully!"
            }
          }));
        })
        .catch(err => {
          //if error was returned
          this.setState(prevState => ({
            snackbar: {
              ...prevState.snackbar,
              open: true,
              variant: "error",
              duration: 10000,
              message: "Error: " + err
              // ? err.graphQLErrors[0].message
              // : err.networkError[0].message
            }
          }));
        });
    } else {
      //if there are errors in the form
      this.setState(prevState => ({
        snackbar: {
          ...prevState.snackbar,
          open: true,
          variant: "error",
          message: "Invalid field values entered"
        }
      }));
    }
  };

  //quizCommon fields check
  validateCommonFields = (quizCommon, dateError) => {
    //null checks
    if (
      !quizCommon.quizName ||
      !quizCommon.description ||
      !quizCommon.instructions ||
      !quizCommon.batch ||
      dateError
    ) {
      this.makeFlagFalse();
    }
  };

  //quizSectionWise fields validation
  validateSectionFields = quizSectionWise => {
    //iterate through the sections
    for (let index in quizSectionWise) {
      //take single item of quizSection and assign it to 'item'
      let item = quizSectionWise[index];

      //null check
      if (
        !item.category.name ||
        !item.timeLimit ||
        item.subcategories.length === 0
      ) {
        this.makeFlagFalse();
      }
      //numberOfQuestions field validator
      else if (!item.numberOfQuestions || item.numberOfQuestions < 1) {
        this.makeFlagFalse();
      }
      //timeLimit field validator
      else if (!item.timeLimit || item.timeLimit < 1) {
        this.makeFlagFalse();
      }
      //marksPerQn field value check
      else if (!item.marksPerQn || item.marksPerQn < 1) {
        this.makeFlagFalse();
      }
      //negativeMarksPerQn field value check
      else if (!item.negativeMarksPerQn || item.negativeMarksPerQn < 0) {
        this.makeFlagFalse();
      }
    }
  };

  //used to transform the quizSectionWise object to array
  transformSections = quizSectionWise => {
    //create temporary object
    let sectionRequest = [];

    for (const index in quizSectionWise) {
      //remove unnecessary fields for mutation
      delete quizSectionWise[index].subcategoryList;
      delete quizSectionWise[index].clearSubcategoryChips;

      //transform fields as required according to mutation specs
      quizSectionWise[index].category = quizSectionWise[index].category._id;
      quizSectionWise[index].timeLimit = Number(
        quizSectionWise[index].timeLimit
      );
      quizSectionWise[index].numberOfQuestions = Number(
        quizSectionWise[index].numberOfQuestions
      );
      quizSectionWise[index].markPerQuestion = Number(
        quizSectionWise[index].marksPerQn
      );
      quizSectionWise[index].negativeMarkPerQuestion = Number(
        quizSectionWise[index].negativeMarksPerQn
      );

      delete quizSectionWise[index].marksPerQn;
      delete quizSectionWise[index].negativeMarksPerQn;
      //add to sectionRequest after transformation
      sectionRequest.push(quizSectionWise[index]);
    }
    return sectionRequest;
  };

  //used to validate dates
  validateDates = () => {
    if (this.state.quizCommon.activeTo < this.state.quizCommon.activeFrom) {
      this.setState(() => ({
        error: {
          dates: {
            message: "From date is larger than To date",
            status: true
          }
        }
      }));
    } else {
      this.setState(() => ({
        error: {
          dates: {
            status: false,
            message: ""
          }
        }
      }));
    }
  };

  // populate the dropdown used for category
  renderCategoryDropdown = () => {
    if (this.categories) {
      return this.categories.map(categoryDetail => {
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

  //populate the dropdown used for batches
  renderBatchDropdown = () => {
    if (this.batches) {
      return this.batches.map(batch => {
        return (
          <MenuItem value={batch} key={batch}>
            {batch}
          </MenuItem>
        );
      });
    } else {
      return <Fragment />;
    }
  };

  //create jsx code for one section
  createSectionPiece = (counter, classes) => {
    let singlePiece;
    let index = counter;

    if (this.state.quizSectionWise[index]) {
      singlePiece = (
        <Fragment>
          <GridItem xs={12} sm={4} md={4} className={classes.formControl}>
            <FormControl fullWidth>
              <InputLabel htmlFor="category">Category</InputLabel>
              <Select
                onChange={e => this.handleCategorySelect(e, index)}
                value={this.state.quizSectionWise[index].category.name}
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
          <GridItem xs={12} sm={8} md={8} className={classes.elementPadding}>
            <ReactChipInput
              style={{ zIndex: 0 }}
              data={this.state.quizSectionWise[index].subcategoryList}
              label="Sub-Categories"
              hintText="Select sub-categories"
              getSelectedObjects={selectedSubcategories =>
                this.getSelectedSubcategories(selectedSubcategories, index)
              }
              clearChips={
                this.state.quizSectionWise[index].clearSubcategoryChips
              }
              onChipsCleared={() => this.chipsCleared(index)}
            />
          </GridItem>
          <GridItem xs={12} sm={3} md={3} className={classes.container}>
            <TextField
              id="standard-marks"
              label="+ Marks Per Question"
              margin="normal"
              type="number"
              name="marksPerQn"
              value={this.state.quizSectionWise[index].marksPerQn}
              onChange={e => this.handleSectionWiseFields(e, index)}
              fullWidth
            />
          </GridItem>
          <GridItem xs={12} sm={3} md={3} className={classes.container}>
            <TextField
              id="standard-negative-marks"
              label="- Marks per Question"
              margin="normal"
              type="number"
              name="negativeMarksPerQn"
              value={this.state.quizSectionWise[index].negativeMarksPerQn}
              onChange={e => this.handleSectionWiseFields(e, index)}
              fullWidth
            />
          </GridItem>
          <GridItem xs={12} sm={2} md={6}>
            <TextField
              id="standard-number"
              label="No. Of Quest."
              type="number"
              fullWidth
              margin="normal"
              name="numberOfQuestions"
              value={this.state.quizSectionWise[index].numberOfQuestions}
              onChange={e => this.handleSectionWiseFields(e, index)}
            />
          </GridItem>
          <GridItem xs={12} sm={2} md={6}>
            <TextField
              id="standard-number"
              label="Time Limit (min)"
              type="number"
              margin="normal"
              name="timeLimit"
              value={this.state.quizSectionWise[index].timeLimit}
              onChange={e => this.handleSectionWiseFields(e, index)}
            />
            <Tooltip title={"Delete Category Section"}>
              <IconButton onClick={() => this.handleDeleteClick(index)}>
                <Delete />
              </IconButton>
              {/*<IconButton onClick={() => this.handleDeleteClick(index)}>*/}
              {/*  {this.numberOfSections ? <Delete /> : <br />}*/}
              {/*</IconButton>*/}
            </Tooltip>
          </GridItem>
          <Spacing />
        </Fragment>
      );
    } else {
      singlePiece = <Fragment />;
    }

    return singlePiece;
  };

  //render code for a section
  renderSectionDetails = classes => {
    let counter = 0;

    let sectionContainer = [];

    //create section pieces
    while (counter <= this.numberOfSections) {
      let singlePiece = this.createSectionPiece(counter, classes);

      sectionContainer.push(singlePiece);
      counter++;
    }

    return sectionContainer;
  };

  //For Displaying the selected subcategories
  getSelectedSubcategories = (selectedSubcategories, index) => {
    const subcategories = selectedSubcategories.map(selectedSubcategory => {
      return selectedSubcategory.value;
    });

    this.setState({
      quizSectionWise: {
        ...this.state.quizSectionWise,
        [index]: {
          ...this.state.quizSectionWise[index],
          subcategories
        }
      }
    });
  };

  //Function is for clearing the chips
  chipsCleared = index => {
    this.setState({
      quizSectionWise: {
        ...this.state.quizSectionWise,
        [index]: {
          ...this.state.quizSectionWise[index],
          clearSubcategoryChips: false
        }
      }
    });
  };
  //Function called on Custom Quiz requested section variabe value
  CustomQuizRequestedSectionVariable() {
    requestedSections = this.transformSections(this.state.quizSectionWise);
    console.log("testing:--------");
    console.log(requestedSections);
    return requestedSections;
  }

  render() {
    // quizType is a boolean value which decides which quiz form do render ie. For custom quiz by student --OR-- admin quiz form in admin login
    const { classes, quizType } = this.props;

    return (
      <Fragment>
        <Query query={ALL_QUERY}>
          {({ data, loading, error }) => {
            if (loading) {
              return <Typography>Loading...</Typography>;
            } else if (error) {
              return <Typography>Error occured!!!</Typography>;
            } else {
              // assign value of common values to lists
              this.categories = data.categoryDetailsList;
              this.batches = data.batches;
              if (quizType) {
                return (
                  <Query
                    query={CREATE_CUSTOM_QUIZ_QUERY}
                    variables={{
                      customQuizRequest: {
                        requestedSections: this
                          .CustomQuizRequestedSectionVariable,
                        negativeMarks: true
                      }
                    }}
                  >
                    {({ data, loading, error }) => {
                      if (loading) {
                        return <Typography>Loading data...</Typography>;
                      } else if (error) {
                        return (
                          <Typography>
                            Error occured in custom quiz request
                          </Typography>
                        );
                      } else {
                        return (
                          <div className={classes.root}>
                            {console.log(this.requestedSections)}
                            {console.log(data)}
                            <form autoComplete="off" autoWidth={true}>
                              <Spacing />
                              <Typography>
                                <strong>Custom Quiz Info</strong>
                              </Typography>
                              <GridContainer className={classes.container}>
                                {this.renderSectionDetails(classes)}
                                <GridItem
                                  xs={12}
                                  sm={6}
                                  md={6}
                                  className={classes.container}
                                >
                                  <FormControlLabel
                                    control={
                                      <Switch
                                        name="Need Negative marks or not"
                                        checked={this.state.quizCommon.active}
                                        onChange={e =>
                                          this.handleActiveField(e)
                                        }
                                      />
                                    }
                                    label="Need Negative marks or not"
                                  />
                                </GridItem>
                              </GridContainer>
                              <ExpansionPanelActions>
                                <Button
                                  color="primary"
                                  fullWidth
                                  variant={"outlined"}
                                  size={"small"}
                                  className={classes.button}
                                  onClick={this.handleClick}
                                >
                                  Add More
                                </Button>
                              </ExpansionPanelActions>
                              <Divider />
                              <ExpansionPanelActions>
                                <Link to="/student/start_quiz">
                                  <Button
                                    color="primary"
                                    variant={"outlined"}
                                    className={classes.button}
                                    onClick={
                                      this.CustomQuizRequestedSectionVariable
                                    }
                                  >
                                    Create Custom Quiz
                                  </Button>
                                </Link>
                              </ExpansionPanelActions>
                            </form>
                          </div>
                        );
                      }
                    }}
                  </Query>
                );
              } else {
                return (
                  <div className={classes.root}>
                    <form autoComplete="off" autoWidth={true}>
                      <Typography>
                        <strong>Quiz Info</strong>
                      </Typography>
                      <GridContainer>
                        <GridItem
                          xs={12}
                          sm={3}
                          md={3}
                          className={classes.container}
                        >
                          <TextField
                            id="standard-search"
                            label="Quiz Name"
                            type="input"
                            margin="normal"
                            name="quizName"
                            value={this.state.quizCommon.quizName}
                            onChange={e => this.handleCommonFieldChanges(e)}
                            fullWidth
                          />
                        </GridItem>
                        <GridItem xs={12} sm={3} md={3}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DateTimePicker
                              error={this.state.error.dates.status}
                              helperText={this.state.error.dates.message}
                              className={classes.date_root}
                              label="Active From"
                              clearable
                              formatDate={date =>
                                moment(date).format("YYYY-MM-DD")
                              }
                              value={this.state.quizCommon.activeFrom}
                              // format="dd/MMM/yyyy hr:min"
                              onChange={date =>
                                this.handleDateChange(date, DATE_FROM)
                              }
                              disablePast
                            />
                          </MuiPickersUtilsProvider>
                        </GridItem>
                        <GridItem xs={12} sm={3} md={3}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DateTimePicker
                              className={classes.date_root}
                              minDate={this.currentDate}
                              label="Active Till"
                              clearable
                              formatDate={date =>
                                moment(date).format("YYYY-MM-DD")
                              }
                              value={this.state.quizCommon.activeTo}
                              // format="dd/MMM/yyyy"
                              onChange={date =>
                                this.handleDateChange(date, DATE_TO)
                              }
                            />
                          </MuiPickersUtilsProvider>
                        </GridItem>
                        <GridItem
                          xs={12}
                          sm={3}
                          md={3}
                          className={classes.formroot}
                        >
                          <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="batch">Batch</InputLabel>
                            <Select
                              onChange={e => this.handleCommonFieldChanges(e)}
                              value={this.state.quizCommon.batch}
                              renderValue={value => {
                                return value;
                              }}
                              inputProps={{
                                name: "batch",
                                id: "batch"
                              }}
                              fullWidth
                            >
                              {this.renderBatchDropdown()}
                            </Select>
                          </FormControl>
                        </GridItem>
                        <GridItem
                          xs={12}
                          sm={3}
                          md={3}
                          className={classes.container}
                        >
                          <FormControlLabel
                            control={
                              <Switch
                                name="active"
                                checked={this.state.quizCommon.active}
                                onChange={e => this.handleActiveField(e)}
                              />
                            }
                            label="Active"
                          />
                        </GridItem>
                        <GridItem
                          xs={12}
                          sm={12}
                          md={12}
                          className={classes.container}
                        >
                          <TextField
                            id="standard-instructions"
                            label="Instructions for students"
                            margin="normal"
                            type="text"
                            name="instructions"
                            placeholder="These will be listed on the student's pre-quiz screen. Use ~ to separate your instructions"
                            value={this.state.quizCommon.instructions}
                            onChange={e => this.handleCommonFieldChanges(e)}
                            fullWidth
                          />
                        </GridItem>
                        <GridItem
                          xs={12}
                          sm={12}
                          md={12}
                          className={classes.container}
                        >
                          <TextField
                            id="description"
                            label="Quiz Description"
                            margin="normal"
                            type="text"
                            name="description"
                            value={this.state.quizCommon.description}
                            onChange={e => this.handleCommonFieldChanges(e)}
                            fullWidth
                          />
                        </GridItem>
                      </GridContainer>
                      <Spacing />
                      <Typography>
                        <strong>Category Info</strong>
                      </Typography>
                      <GridContainer className={classes.container}>
                        {this.renderSectionDetails(classes)}
                      </GridContainer>
                      <ExpansionPanelActions>
                        <Button
                          color="primary"
                          fullWidth
                          variant={"outlined"}
                          size={"small"}
                          className={classes.button}
                          onClick={this.handleClick}
                        >
                          Add More
                        </Button>
                      </ExpansionPanelActions>
                      <Divider />
                      <ExpansionPanelActions>
                        <Mutation mutation={ADD_QUIZ}>
                          {addQuiz => (
                            <Button
                              color="primary"
                              variant={"outlined"}
                              className={classes.button}
                              onClick={() => this.handleSubmit(addQuiz)}
                            >
                              Create Admin Quiz
                            </Button>
                          )}
                        </Mutation>
                      </ExpansionPanelActions>
                    </form>
                  </div>
                );
              }
            }
          }}
        </Query>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={this.state.snackbar.open}
          autoHideDuration={6000}
        >
          <CustomSnackbar
            onClose={this.closeSnackbar}
            variant={this.state.snackbar.variant}
            message={this.state.snackbar.message}
          />
        </Snackbar>
      </Fragment>
    );
  }
}

QuizForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QuizForm);
