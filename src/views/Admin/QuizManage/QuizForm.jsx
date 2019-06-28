import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { DateTimePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Link from "react-router-dom/es/Link";
import ReactChipInput from "../../../components/AutoChip/ReactChipSelect";

import {
  Button,
  CircularProgress,
  Divider,
  ExpansionPanelActions,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Tooltip,
  Typography
} from "@material-ui/core";

import { Delete, Add } from "@material-ui/icons";
import { Redirect } from "react-router-dom";
import moment from "moment";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import CustomSnackbar from "../../../components/Snackbar/CustomSnackbar";
import Spacing from "../../../components/Spacing/Spacing";
import PropTypes from "prop-types";
import { CUSTOM_QUIZ_CONSTANT } from "../../../Utils";
import formControlStyle from "../../../assets/jss/form-control";

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
  mutation generateCustomQuiz($customQuizRequest: CustomQuizRequest!) {
    generateCustomQuiz(customQuizRequest: $customQuizRequest) {
      _id
      createdBy {
        _id
        name
      }
      sections {
        category {
          _id
          name
        }
        questions {
          _id
          question
          options
          correctOption
          solution
        }
        markPerQuestion
        negativeMarkPerQuestion
        timeLimit
      }
    }
  }
`;

//constants to handle from & to dates
const DATE_FROM = 1;
const DATE_TO = 2;

let requestedSectionsArray = [];

const quizConstant = {
  quizType: CUSTOM_QUIZ_CONSTANT
};

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
      AdminLoading: false,
      //maintain fields which are common to all sections
      loadingProgress: false,
      quizCommon: {
        quizName: "",
        batch: "",
        activeFrom: new Date(),
        activeTo: new Date(),
        active: false,
        instructions: "",
        description: ""
      },
      //used to store the Custom quiz data
      customQuizData: [],
      //to hanlde redirect on Custom Quiz Create
      redirecter: false,
      //need negative marks or not for custom quiz
      needNegative: false,
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
  //handle needNegative toggle Field
  handleNeedNegative = () => {
    this.setState(prevState => ({
      ...prevState,
      needNegative: !prevState.needNegative
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
    this.setState(prevState => ({
      quizSectionWise: {
        ...prevState.quizSectionWise,
        [index]: {
          ...prevState.quizSectionWise[index],
          category: categoryDetail.category,
          subcategoryList: availableSubcategories,
          subcategories: [],
          clearSubcategoryChips: true
        }
      }
    }));
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
      null;
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
    this.setState({
      AdminLoading: true
    });

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
            AdminLoading: false,
            snackbar: {
              ...prevState.snackbar,
              open: true,
              variant: "success",
              message: "Quiz added successfully!"
            }
          }));
          if (this.props.reloadList !== null) {
            this.props.reloadList();
          }
        })
        .catch(err => {
          //if error was returned
          this.setState(prevState => ({
            AdminLoading: false,
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
        AdminLoading: false,
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

    let tempVariable = JSON.parse(JSON.stringify(quizSectionWise));
    for (const index in quizSectionWise) {
      //remove unnecessary fields for mutation
      delete tempVariable[index].subcategoryList;
      delete tempVariable[index].clearSubcategoryChips;

      //transform fields as required according to mutation specs
      tempVariable[index].category = tempVariable[index].category._id;
      tempVariable[index].timeLimit = Number(tempVariable[index].timeLimit);
      tempVariable[index].numberOfQuestions = Number(
        tempVariable[index].numberOfQuestions
      );
      tempVariable[index].markPerQuestion = Number(
        tempVariable[index].marksPerQn
      );
      tempVariable[index].negativeMarkPerQuestion = Number(
        tempVariable[index].negativeMarksPerQn
      );

      delete tempVariable[index].marksPerQn;
      delete tempVariable[index].negativeMarksPerQn;
      //add to sectionRequest after transformation
      sectionRequest.push(tempVariable[index]);
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
  createSectionPiece = (counter, classes, quizType) => {
    let singlePiece;
    let index = counter;

    if (this.state.quizSectionWise[index]) {
      singlePiece = (
        <Fragment>
          <Spacing />
          <GridContainer>
            <GridItem xs={12} sm={4} md={4}>
              <FormControl required fullWidth>
                <InputLabel htmlFor="category">Category</InputLabel>
                <Select
                  onChange={e => this.handleCategorySelect(e, index)}
                  value={this.state.quizSectionWise[index].category.name}
                  hintText="Select Categories"
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
            <GridItem xs={12} sm={8} md={8}>
              <FormControl required fullWidth>
                <ReactChipInput
                  style={{ zIndex: 0 }}
                  data={this.state.quizSectionWise[index].subcategoryList}
                  label="Sub-Categories"
                  margin={"normal"}
                  hintText="Select sub-categories"
                  getSelectedObjects={selectedSubcategories =>
                    this.getSelectedSubcategories(selectedSubcategories, index)
                  }
                  clearChips={
                    this.state.quizSectionWise[index].clearSubcategoryChips
                  }
                  onChipsCleared={() => this.chipsCleared(index)}
                />
              </FormControl>
            </GridItem>
          </GridContainer>
          <GridContainer>
            {quizType ? (
              ""
            ) : (
              <Fragment>
                <GridItem xs={12} sm={2} md={2} className={classes.container}>
                  <TextField
                    id="standard-marks"
                    label="+ Marks per Quest."
                    margin="normal"
                    type="number"
                    required
                    name="marksPerQn"
                    value={this.state.quizSectionWise[index].marksPerQn}
                    onChange={e => this.handleSectionWiseFields(e, index)}
                    fullWidth
                  />
                </GridItem>
                <GridItem xs={12} sm={2} md={2} className={classes.container}>
                  <TextField
                    id="standard-negative-marks"
                    label="- Marks per Quest."
                    margin="normal"
                    type="number"
                    required
                    name="negativeMarksPerQn"
                    value={this.state.quizSectionWise[index].negativeMarksPerQn}
                    onChange={e => this.handleSectionWiseFields(e, index)}
                    fullWidth
                  />
                </GridItem>
              </Fragment>
            )}
            <GridItem xs={12} sm={2} md={3}>
              <TextField
                id="standard-number"
                label="No. Of Quest."
                type="number"
                required
                fullWidth
                margin="normal"
                name="numberOfQuestions"
                value={this.state.quizSectionWise[index].numberOfQuestions}
                onChange={e => this.handleSectionWiseFields(e, index)}
              />
            </GridItem>
            <GridItem xs={10} sm={2} md={3}>
              <TextField
                id="standard-number"
                label="Time Limit (min)"
                type="number"
                margin="normal"
                required
                name="timeLimit"
                value={this.state.quizSectionWise[index].timeLimit}
                onChange={e => this.handleSectionWiseFields(e, index)}
              />
            </GridItem>
            <GridItem xs={2} sm={1} md={1}>
              <div className={classes.delete}>
                <Tooltip title={"Delete Category Section"}>
                  <Button
                    variant={"outlined"}
                    fullWidth
                    onClick={() => this.handleDeleteClick(index)}
                  >
                    <Delete />
                  </Button>
                </Tooltip>
              </div>
            </GridItem>
            <Spacing />
          </GridContainer>
        </Fragment>
      );
    } else {
      singlePiece = <Fragment />;
    }

    return singlePiece;
  };

  //render code for a section
  renderSectionDetails = (classes, quizType) => {
    let counter = 0;

    let sectionContainer = [];

    //create section pieces
    while (counter <= this.numberOfSections) {
      let singlePiece = this.createSectionPiece(counter, classes, quizType);

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

  //Function to create the required type of array for passing as argument for creating custom quiz and for invoking mutation
  CustomQuizRequestedSectionVariable = (mutation, e) => {
    e.preventDefault();
    // console.log("data initiation begins in 3,2,1............");
    requestedSectionsArray = this.transformSections(this.state.quizSectionWise);
    for (let index in requestedSectionsArray) {
      delete requestedSectionsArray[index].marksPerQn;
      delete requestedSectionsArray[index].negativeMarksPerQn;
    }
    console.log(requestedSectionsArray);
    // set loading state and start mutation. upon completion, change loading states
    this.setState({
      loadingProgress: true
    });
    mutation({
      variables: {
        customQuizRequest: {
          requestedSections: requestedSectionsArray,
          negativeMarks: this.state.needNegative
        }
      }
    })
      .then(res => {
        // on successful completion of the mutation
        this.setState(prevState => ({
          loadingProgress: false,
          snackbar: {
            ...prevState.snackbar,
            open: true,
            variant: "success",
            message: "Custom Quiz Created!"
          }
        }));
      })
      .catch(err => {
        //if error was returned
        console.log(err);
        this.setState(prevState => ({
          loadingProgress: false,
          snackbar: {
            ...prevState.snackbar,
            open: true,
            variant: "error",
            duration: 10000,
            message: "Invalid Inputs"
            // ? err.graphQLErrors[0].message
            // : err.networkError[0].message
          }
        }));
      });
  };
  //Function to handle redirect after Create Cutom Quiz Mutaion is invoked
  handleMutationComplete = data => {
    this.setState({
      ...this.state,
      customQuizData: data,
      redirecter: true
    });
  };

  render() {
    // quizType is a boolean value which decides which quiz form do render ie. For custom quiz by student --OR-- admin quiz form in admin login
    const { classes, quizType } = this.props;
    const { snackbar } = this.state;
    //to redirect after mutaion on custom quiz is called which is being manged using state
    if (this.state.redirecter === true) {
      console.log(this.state.customQuizData);
      return (
        <Redirect
          push
          to={{
            pathname: "/student/quiz",
            state: {
              ...quizConstant,
              ...this.state.customQuizData
            }
          }}
        />
      );
    }
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
              // quizType whether to render custom quiz form or assigned. IF true renders custom quiz in student pannel
              if (quizType) {
                return (
                  <Mutation
                    mutation={CREATE_CUSTOM_QUIZ_QUERY}
                    onCompleted={({ generateCustomQuiz }) => {
                      this.handleMutationComplete(generateCustomQuiz);
                    }}
                  >
                    {(generateCustomQuiz, { data }) => {
                      return (
                        <Fragment>
                          <form autoComplete="off" fullwidth>
                            <GridContainer className={classes.container}>
                              <GridItem xs={12} sm={12} md={12}>
                                <FormControlLabel
                                  label="Do you want to enable negative marking?"
                                  labelPlacement={"start"}
                                  control={
                                    <Switch
                                      name="needNegative"
                                      checked={this.state.needNegative}
                                      onChange={this.handleNeedNegative}
                                    />
                                  }
                                />
                              </GridItem>
                            </GridContainer>
                            {this.renderSectionDetails(classes, quizType)}
                            <Button
                              color="secondary"
                              fullWidth
                              variant={"outlined"}
                              size={"small"}
                              onClick={this.handleClick}
                            >
                              <Add /> Add More
                            </Button>
                            <Divider />
                            <ExpansionPanelActions>
                              <Link to="/student/start_quiz">
                                <div className={classes.wrapper}>
                                  <Button
                                    color="primary"
                                    variant={"outlined"}
                                    className={classes.button}
                                    disabled={this.state.loadingProgress}
                                    onClick={e =>
                                      this.CustomQuizRequestedSectionVariable(
                                        generateCustomQuiz,
                                        e
                                      )
                                    }
                                  >
                                    Create Custom Quiz
                                  </Button>
                                  {this.state.loadingProgress && (
                                    <CircularProgress
                                      size={24}
                                      className={classes.buttonProgress}
                                    />
                                  )}
                                </div>
                              </Link>
                            </ExpansionPanelActions>
                          </form>
                        </Fragment>
                      );
                    }}
                  </Mutation>
                );
              }
              // Else part holds the form for Admin Quiz available on admin pannel
              else {
                return (
                  <div className={classes.root}>
                    <form autoComplete="off" autoWidth={true}>
                      <Typography>
                        <strong>Quiz Info</strong>
                      </Typography>
                      <GridContainer>
                        <GridItem xs={12} sm={3} md={3}>
                          <TextField
                            id="standard-search"
                            label="Quiz Name"
                            type="text"
                            name="quizName"
                            required
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
                        <GridItem xs={12} sm={3} md={3}>
                          <FormControl required fullWidth>
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
                      </GridContainer>
                      <Spacing />
                      <GridContainer>
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
                        <GridItem xs={12} sm={12} md={12}>
                          <FormControl required fullWidth>
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
                          </FormControl>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <FormControl required fullWidth>
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
                          </FormControl>
                        </GridItem>
                      </GridContainer>
                      <Spacing />
                      <Typography>
                        <strong>Category Info</strong>
                      </Typography>
                      {this.renderSectionDetails(classes)}
                      <Button
                        color="secondary"
                        fullWidth
                        variant={"outlined"}
                        size={"small"}
                        onClick={this.handleClick}
                      >
                        <Add /> Add More
                      </Button>
                      <Divider />
                      <ExpansionPanelActions>
                        <Mutation mutation={ADD_QUIZ}>
                          {addQuiz => (
                            <div className={classes.wrapper}>
                              <Button
                                color="primary"
                                variant={"outlined"}
                                disabled={this.state.AdminLoading}
                                className={classes.button}
                                onClick={() => this.handleSubmit(addQuiz)}
                              >
                                Create Admin Quiz
                              </Button>
                              {this.state.AdminLoading && (
                                <CircularProgress
                                  size={24}
                                  className={classes.buttonProgress}
                                />
                              )}
                            </div>
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
        <CustomSnackbar
            onClose={this.closeSnackbar}
            variant={snackbar.variant}
          open={snackbar.open}
            autoHideDuration={snackbar.duration}
            message={snackbar.message}
        />
      </Fragment>
    );
  }
}

QuizForm.propTypes = {
  classes: PropTypes.object.isRequired,
  quizType: PropTypes.object,
  reloadList: PropTypes.func.isRequired
};

export default withStyles(formControlStyle)(QuizForm);
