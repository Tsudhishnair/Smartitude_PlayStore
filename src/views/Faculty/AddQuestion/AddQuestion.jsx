import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import {
  Button,
  CircularProgress,
  ExpansionPanelActions,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography
} from "@material-ui/core";
import Spacing from "components/Spacing/Spacing";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import CustomSnackbar from "../../../components/Snackbar/CustomSnackbar";
import green from "@material-ui/core/colors/green";

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
  formControl: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    minWidth: 120,
    display: "flex",
    flexGrow: 1,
    margin: 0,
    fullWidth: true,
    wrap: "nowrap"
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
//----------------------------------------------------------------
// Mutation for AddQuestion
const ADD_QUESTION = gql`
  mutation addQuestion($questionInput: QuestionInput!) {
    addQuestion(questionInput: $questionInput) {
      _id
    }
  }
`;

const EDIT_QUESTION = gql`
  mutation editQuestion($questionEditInput: QuestionEditInput!) {
    editQuestion(questionEditInput: $questionEditInput) {
      _id
    }
  }
`;
//----------------------------------------------------------------
// Faculty Details from local storage
const facultyId = localStorage.getItem("faculty");

//------------------------------------------------------------------
//This array is to store the option in the backend
let optionArray = [];

class AddQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      _id: "",
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      solution: "",
      correctOption: "",
      category: "",
      subcategory: "",
      subcategoryList: [],
      difficulty: "",
      dataLoaded: false,
      // used to handle loading state
      loading: false,
      // maintaining snackbar states
      snackbar: {
        open: false,
        variant: "error",
        message: ""
      }
    };
  }
  //Handle Snackbar Controls
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

  closeSnackbar = () => {
    this.setState({
      snackbar: {
        ...this.state.snackbar,
        open: false
      }
    });
  };

  //----------------------------------------------------------------
  //Handle Mutation Function
  handleClick = (performAction, event) => {
    event.preventDefault();
    if (!this.state.question) {
      this.setState(
        {
          snackbar: {
            ...this.state.snackbar,
            message: "Question field empty!"
          }
        },
        () => this.openSnackbar()
      );
    } else if (
      !this.state.option1 ||
      !this.state.option2 ||
      !this.state.option3 ||
      !this.state.option4
    ) {
      this.setState(
        {
          snackbar: {
            ...this.state.snackbar,
            variant: "error",
            message: "Option fields are not fully filled!"
          }
        },
        () => this.openSnackbar()
      );
    } else if (!this.state.correctOption) {
      this.setState(
        {
          snackbar: {
            ...this.state.snackbar,
            variant: "error",
            message: "Correct Option not selected!"
          }
        },
        () => this.openSnackbar()
      );
    } else if (
      !this.state.difficulty ||
      !this.state.difficulty ||
      !this.state.solution ||
      !this.state.category
    ) {
      this.setState(
        {
          snackbar: {
            ...this.state.snackbar,
            variant: "error",
            message: "Fields and options are empty!"
          }
        },
        () => this.openSnackbar()
      );
    } else {
      // set loading state and start mutation. upon completion, change loading states
      this.setState({
        loading: true
      });
      let variables = {};
      if (!this.props.isEdit) {
        variables = {
          questionInput: {
            question: this.state.question,
            createdBy: facultyId,
            category: this.state.category._id,
            subcategory: this.state.subcategory._id,
            difficulty: parseInt(this.state.difficulty),
            options: this.optionArray,
            correctOption: this.state.correctOption,
            solution: this.state.solution
          }
        };
      } else {
        console.log("Options array:");
        console.log(this.optionArray);
        variables = {
          questionEditInput: {
            _id: this.state._id,
            question: this.state.question,
            category: this.state.category._id,
            subcategory: this.state.subcategory._id,
            difficulty: parseInt(this.state.difficulty),
            options: this.optionArray,
            correctOption: this.state.correctOption,
            solution: this.state.solution
          }
        };
      }
      performAction({
        variables: variables
      })
        .then(response => {
          this.handleReset();
          this.setState(
            {
              loading: false,
              snackbar: {
                ...this.state.snackbar,
                variant: "success",
                message: this.props.isEdit
                  ? "Question Edited Successfully!"
                  : "Question Added Successfully!"
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

  //-----------------------------------------------------------------
  // handle Category List
  handleCategorySelect = event => {
    const categoryDetail = event.target.value;

    let availableSubcategories = categoryDetail.subcategory;
    this.setState({
      ...this.state,
      [event.target.name]: categoryDetail.category,
      subcategoryList: availableSubcategories,
      subcategory: ""
    });
  };
  //-------------------------------------------------------------

  //--------------------------------------------------------------
  //Common State Management Function
  handleChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };
  //-------------------------------------------------------------
  // Setting Option into Options Array and correct option
  handleOption = event => {
    this.optionArray = [
      this.state.option1,
      this.state.option2,
      this.state.option3,
      this.state.option4
    ];
    this.setState({
      ...this.state,
      correctOption: event.target.value
    });
  };
  //-------------------------------------------------------------

  //-------------------------------------------------------------
  //Handling State reset

  handleReset = e => {
    this.setState({
      question: "",

      option1: "",
      option2: "",
      option3: "",
      option4: "",
      solution: "",
      correctOption: "",
      category: "",
      subcategory: "",
      subcategoryList: [],
      difficulty: ""
    });
  };

  setQuestions(question) {
    const questionDetail = {
      _id: question._id,
      question: question.question,
      solution: question.solution,
      correctOption: question.correctOption,
      category: question.category,
      subcategory: question.subcategory,
      difficulty: question.difficulty,
      option1: question.options[0],
      option2: question.options[1],
      option3: question.options[2],
      option4: question.options[3]
    };
    this.optionArray = this.props.isEdit ? question.options : [];
    this.setState({
      ...this.state,
      ...questionDetail,
      dataLoaded: true
    });
  }
  //-------------------------------------------------------------
  render() {
    const { classes, question, isEdit } = this.props;
    const { loading, snackbar } = this.state;
    if (question && !this.state.dataLoaded) {
      this.setQuestions(question);
    }
    //-----------------------------------------------------------
    //Query To Fetch Category and its Coresponsding Sub-Categories
    const FETCH_FORM_FIELDS = gql`
      {
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
    //------------------------------------------------------------
    console.log(this.state);
    return (
      <Mutation
        mutation={isEdit ? EDIT_QUESTION : ADD_QUESTION}
        onCompleted={this.handleReset}
      >
        {performAction => {
          return (
            <div className={classes.root}>
              <form autoComplete="off" autoWidth={true}>
                <Typography>
                  <strong>Enter Question Below:</strong>
                </Typography>
                <GridContainer>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={12}
                    className={classes.container}
                  >
                    <TextField
                      onChange={this.handleChange}
                      value={this.state.question}
                      placeholder="Type in your question here"
                      multiline={true}
                      rows={2}
                      label="Question"
                      name="question"
                      rowsMax={10}
                      type="input"
                      margin="normal"
                      fullWidth
                    />
                  </GridItem>
                </GridContainer>
                <Typography>
                  <strong>Options: </strong>
                </Typography>
                <GridContainer>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={12}
                    className={classes.container}
                  >
                    <TextField
                      onChange={this.handleChange}
                      value={this.state.option1}
                      id="option1"
                      name="option1"
                      label="Option 1"
                      multiline={true}
                      type="number"
                      placeholder="Type in your option 1 here"
                      margin="normal"
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
                      onChange={this.handleChange}
                      value={this.state.option2}
                      name="option2"
                      id="option2"
                      label="Option 2"
                      multiline={true}
                      type="number"
                      placeholder="Type in your option 2 here"
                      margin="normal"
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
                      onChange={this.handleChange}
                      value={this.state.option3}
                      id="option3"
                      name="option3"
                      label="Option 3"
                      multiline={true}
                      type="number"
                      placeholder="Type in your option 3 here"
                      margin="normal"
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
                      onChange={this.handleChange}
                      value={this.state.option4}
                      id="option4"
                      name="option4"
                      label="Option 4"
                      multiline={true}
                      type="number"
                      placeholder="Type in your option 4 here"
                      margin="normal"
                      fullWidth
                    />
                  </GridItem>
                  <Typography>
                    <strong>Detailed Answer</strong>
                  </Typography>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={12}
                    className={classes.container}
                  >
                    <TextField
                      onChange={this.handleChange}
                      value={this.state.solution}
                      name="solution"
                      placeholder="Type in your detailed answer"
                      multiline={true}
                      rows={2}
                      label="AnswerDetailed"
                      rowsMax={10}
                      type="input"
                      margin="normal"
                      fullWidth
                    />
                  </GridItem>
                </GridContainer>

                <Spacing />

                <Typography>
                  <strong>Other Info</strong>
                </Typography>
                <GridContainer>
                  <GridItem xs={12} sm={3} md={3}>
                    <InputLabel fullWidth>Correct Option</InputLabel>
                    <Select
                      onChange={this.handleOption}
                      value={this.state.correctOption}
                      renderValue={value => {
                        return value;
                      }}
                      inputProps={{
                        name: "correctOption",
                        id: "correctOption"
                      }}
                      fullWidth
                    >
                      <MenuItem value={1}>Option 1</MenuItem>
                      <MenuItem value={2}>Option 2</MenuItem>
                      <MenuItem value={3}>Option 3</MenuItem>
                      <MenuItem value={4}>Option 4</MenuItem>
                      ); })}
                    </Select>
                  </GridItem>

                  {/* Category and SubCategory
            ------------------------------------------------------------------------------- */}
                  <Query query={FETCH_FORM_FIELDS}>
                    {({ data, loading, error }) => {
                      if (loading) {
                        return <Typography>Loading...</Typography>;
                      } else if (error) {
                        return <Typography>Error occured!!!</Typography>;
                      } else {
                        return (
                          <GridContainer>
                            <GridItem xs={12} sm={6} md={6}>
                              <InputLabel htmlFor="category" fullWidth>
                                Category
                              </InputLabel>
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
                                {data.categoryDetailsList.map(
                                  categoryDetail => {
                                    return (
                                      <MenuItem value={categoryDetail}>
                                        {categoryDetail.category.name}
                                      </MenuItem>
                                    );
                                  }
                                )}
                              </Select>
                            </GridItem>
                            <GridItem xs={12} sm={6} md={6}>
                              <InputLabel htmlFor="subcategory" fullWidth>
                                Sub Category
                              </InputLabel>
                              <Select
                                onChange={this.handleChange}
                                value={this.state.subcategory.name}
                                renderValue={value => {
                                  return value;
                                }}
                                inputProps={{
                                  name: "subcategory",
                                  id: "subcategory"
                                }}
                                fullWidth
                              >
                                {this.state.subcategoryList.map(subcategory => {
                                  return (
                                    <MenuItem value={subcategory}>
                                      {subcategory.name}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                            </GridItem>
                          </GridContainer>
                        );
                      }
                    }}
                  </Query>
                  {/* ------------------------------------------------------------------------------- */}

                  <GridItem xs={12} sm={3} md={3}>
                    <InputLabel htmlFor="age-simple" fullWidth>
                      Difficulty
                      <TextField
                        id="standard-number"
                        type="number"
                        name="difficulty"
                        fullWidth
                        onChange={this.handleChange}
                        value={this.state.difficulty}
                      />
                    </InputLabel>
                  </GridItem>
                </GridContainer>
                <Spacing />
                <ExpansionPanelActions>
                  <Button
                    type="reset"
                    variant={"outlined"}
                    onClick={this.handleReset}
                  >
                    Clear
                  </Button>
                  <div className={classes.wrapper}>
                    <Button
                      color={"primary"}
                      variant={"outlined"}
                      type="submit"
                      disabled={loading}
                      onClick={e => this.handleClick(performAction, e)}
                    >
                      Submit
                    </Button>
                    {loading && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </div>
                </ExpansionPanelActions>
              </form>
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
            </div>
          );
        }}
      </Mutation>
    );
  }
}

AddQuestion.propTypes = {
  classes: PropTypes.object.isRequired,
  question: PropTypes.object,
  isEdit: PropTypes.object.isRequired
};

export default withStyles(styles)(AddQuestion);
