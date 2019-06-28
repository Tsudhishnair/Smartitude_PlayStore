import React, { Fragment } from "react";
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
import Card from "../../../components/Card/Card";
import CardBody from "../../../components/Card/CardBody";

import CSVReader from "react-csv-reader";

const styles = theme => ({
  formRoot: {
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

// Mutation for AddQuestion
const ADD_QUESTION = gql`
  mutation addQuestion($questionInput: QuestionInput!) {
    addQuestion(questionInput: $questionInput) {
      _id
    }
  }
`;

//mutation for batch question upload
const ADD_BATCH_QUESTIONS = gql`
  mutation addQuestions($questionInputs: [QuestionInput!]) {
    addQuestions(questionInputs: $questionInputs) {
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

//Query To Fetch Category and its Coresponsding Sub-Categories
const FETCH_FORM_FIELDS = gql`
  {
    myCategoriesAndSubcategories {
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

// Faculty Details from local storage
const facultyId = localStorage.getItem("faculty");

//This array is to store the option in the backend
let optionArray = [];

const INDEX_QUESTION = 0;
const INDEX_OPTION_1 = 1;
const INDEX_OPTION_2 = 2;
const INDEX_OPTION_3 = 3;
const INDEX_OPTION_4 = 4;
const INDEX_DESCRIPTION = 5;
const INDEX_CORRECT_OPTION = 6;
const INDEX_CATEGORY = 7;
const INDEX_SUBCATEGORY = 8;
const INDEX_DIFFICULTY = 9;

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
      batchLoading: false,
      // maintaining snackbar states
      snackbar: {
        open: false,
        variant: "error",
        message: ""
      }
    };

    this.firstRender = true;
    this.categoryAndSubCategoryList = [];

    this.questionList = [];

    this.categoryIndex;
    this.subcategoryIndex;
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
      !this.state.subcategory ||
      !this.state.solution ||
      !this.state.category
    ) {
      this.setState(
        {
          snackbar: {
            ...this.state.snackbar,
            variant: "error",
            message: "Some of the Fields are empty!"
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
          if (this.props.action) {
            console.log("Action called booo");
            this.props.action();
          }
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

  //used to validate csv file uploaded for batch questions
  isCategoryAndSubcategoryValid = (category, subcategory) => {
    //loop through the array of all categories & subcategories fetched using query
    let i = 0;
    while (i < this.categoryAndSubCategoryList.length) {
      let row = this.categoryAndSubCategoryList[i];

      //check for category matching
      if (
        category.toLowerCase().trim() === row.category.name.toLowerCase().trim()
      ) {
        //if category matches, now check for subcategory match
        let j = 0;
        while (j < row.subcategory.length) {
          //subcategoryObject represents a subcategory object from the array
          let subcategoryObject = row.subcategory[j];

          //check subcategory match
          if (
            subcategory.toLowerCase().trim() ===
            subcategoryObject.name.toLowerCase().trim()
          ) {
            //save index values for mutation call
            this.categoryIndex = i;
            this.subcategoryIndex = j;
            //return true if both subcategory an category are matching
            return true;
          }
          j++;
        }
      }
      i++;
    }
    //if no matches can be made, return false
    return false;
  };

  //handles qn batch uploads
  handleBatchUpload = (result, uploadMutation) => {
    let i = 0;

    this.questionList = [];

    //iterate through all qns
    while (i < result.length - 1) {
      let question;
      //row stores each qn in the csv file
      let row = result[i];
      //check if correct option field is an integer
      if (isNaN(row[INDEX_CORRECT_OPTION])) {
        this.setState(
          prevState => ({
            snackbar: {
              ...prevState.snackbar,
              message: `Invalid 'correct option' given at row ${i + 1}`
            }
          }),
          () => this.openSnackbar()
        );
        break;
      }
      //check if difficulty field is a valid integer and is in the range of 0 & 5
      else if (
        isNaN(row[INDEX_DIFFICULTY]) ||
        row[INDEX_DIFFICULTY] < 0 ||
        row[INDEX_DIFFICULTY] > 5
      ) {
        this.setState(
          prevState => ({
            snackbar: {
              ...prevState.snackbar,
              message: `Invalid 'difficulty' given at row ${i + 1}`
            }
          }),
          () => this.openSnackbar()
        );
        break;
      }
      //validate the category and subcategory provided
      else if (
        !this.isCategoryAndSubcategoryValid(
          row[INDEX_CATEGORY],
          row[INDEX_SUBCATEGORY]
        )
      ) {
        this.setState(
          prevState => ({
            snackbar: {
              ...prevState.snackbar,
              message: `Invalid category/subcategory given at row ${i + 1}`
            }
          }),
          () => this.openSnackbar()
        );
        break;
      }
      //run mutation
      else {
        question = {
          question: row[INDEX_QUESTION],
          difficulty: Number(row[INDEX_DIFFICULTY]),
          category: this.categoryAndSubCategoryList[this.categoryIndex].category
            ._id,
          subcategory: this.categoryAndSubCategoryList[this.categoryIndex]
            .subcategory[this.subcategoryIndex]._id,
          correctOption: Number(row[INDEX_CORRECT_OPTION]),
          solution: row[INDEX_DESCRIPTION],
          options: [
            row[INDEX_OPTION_1],
            row[INDEX_OPTION_2],
            row[INDEX_OPTION_3],
            row[INDEX_OPTION_4]
          ]
        };
        this.questionList.push(question);
      }
      i++;
    }
    console.log(...this.questionList);

    uploadMutation({
      variables: {
        questionInputs: this.questionList
      }
    })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

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

  //Common State Management Function
  handleChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

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

  render() {
    const { classes, question, isEdit } = this.props;
    const { loading, snackbar } = this.state;
    if (question && !this.state.dataLoaded) {
      this.setQuestions(question);
    }

    return (
      <React.Fragment>
        <GridContainer className={classes.root}>
          <GridItem xs={12} md={4} direction={"row-reverse"}>
            <Mutation mutation={ADD_BATCH_QUESTIONS}>
              {uploadMutation => (
                <CSVReader
                  label="Batch Upload by CSV"
                  onFileLoaded={result =>
                    this.handleBatchUpload(result, uploadMutation)
                  }
                  inputId="csvUpload"
                  inputStyle={{ color: "red" }}
                />
              )}
            </Mutation>
          </GridItem>
          <GridItem xs={12}>
            <Card>
              <CardBody>
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
                  </GridContainer>
                  <Typography>
                    <strong>Detailed Answer</strong>
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
                        );
                      </Select>
                    </GridItem>
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
                                  {this.renderCategoryMenu(
                                    data.myCategoriesAndSubcategories
                                  )}

                                  {(this.firstRender = false)}
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
                                  {this.state.subcategoryList.map(
                                    subcategory => {
                                      return (
                                        <MenuItem value={subcategory}>
                                          {subcategory.name}
                                        </MenuItem>
                                      );
                                    }
                                  )}
                                </Select>
                              </GridItem>
                            </GridContainer>
                          );
                        }
                      }}
                    </Query>
                    <GridItem xs={12} sm={3} md={3}>
                      <InputLabel htmlFor="age-simple" fullWidth>
                        Difficulty
                        <TextField
                          id="standard-number"
                          type="number"
                          name="difficulty"
                          fullWidth
                          InputProps={{ inputProps: { min: 0, max: 10 } }}
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
                    <Mutation
                      mutation={isEdit ? EDIT_QUESTION : ADD_QUESTION}
                      onCompleted={this.handleReset}
                    >
                      {performAction => (
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
                      )}
                    </Mutation>
                  </ExpansionPanelActions>
                </form>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <CustomSnackbar
          onClose={this.closeSnackbar}
          variant={snackbar.variant}
          open={snackbar.open}
          message={snackbar.message}
        />
      </React.Fragment>
    );
  }

  renderCategoryMenu(categoryDetail) {
    if (this.firstRender) {
      this.categoryAndSubCategoryList.push(categoryDetail);
    }
    return (
      <MenuItem value={categoryDetail}>{categoryDetail.category.name}</MenuItem>
    );
  }
}

AddQuestion.propTypes = {
  classes: PropTypes.object.isRequired,
  question: PropTypes.object,
  isEdit: PropTypes.object.isRequired,
  action: PropTypes.func
};

export default withStyles(styles)(AddQuestion);
