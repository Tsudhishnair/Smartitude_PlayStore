import React, { Fragment } from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Button,
  Select,
  ExpansionPanelActions,
  TextField,
  Typography
} from "@material-ui/core";
import Spacing from "components/Spacing/Spacing";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

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
  }
});
//----------------------------------------------------------------
// Mutation for AddQuestion
const ADD_QUESTION = gql`
      mutation addQuestion($questionInput:QuestionInput!){
        addQuestion(questionInput:$questionInput){
          _id
        }
        
      }
    `;
//----------------------------------------------------------------
// Faculty Details from local storage
const facultyId = localStorage.getItem('faculty');

//------------------------------------------------------------------
//This array is to store the option in the backend
let optionArray = [];

class AddQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      solution: "",
      correctOption: "",
      category: "",
      subCategory: "",
      subcategoryList: [],
      difficulty: ""
    };
  }

  //----------------------------------------------------------------
  //Handle Mutation Function
  handleClick = (addQuestion, event) => {
    event.preventDefault();
    addQuestion({
      variables: {
        questionInput: {
          question: this.state.question,
          createdBy: facultyId,
          category: this.state.category._id,
          subcategory: this.state.subCategory._id,
          difficulty: parseInt(this.state.difficulty),
          options: optionArray,
          correctOption: this.state.correctOption,
          solution: this.state.solution
        }
      }
    })
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
      subCategory: ""
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
  handleOption = (event) => {
    this.optionArray = [this.state.option1, this.state.option2, this.state.option3, this.state.option4]
    console.log(this.optionArray);
    this.setState({
      ...this.state,
      correctOption: event.target.value,
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
      subCategory: "",
      subcategoryList: [],
      difficulty: ""
    });
  }

  //-------------------------------------------------------------
  render() {
    const { classes } = this.props;
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

    return (
      <Mutation mutation={ADD_QUESTION} onCompleted={this.clearForm}>
        {addQuestion => {
          return (
            <div className={classes.root}>
              <form autoComplete="off" autoWidth={true}>
                <Typography>
                  <strong>Enter Question Below:</strong>
                </Typography>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12} className={classes.container}>
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
                  <GridItem xs={12} sm={12} md={12} className={classes.container}>
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
                  <GridItem xs={12} sm={12} md={12} className={classes.container}>
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
                  <GridItem xs={12} sm={12} md={12} className={classes.container}>
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
                  <GridItem xs={12} sm={12} md={12} className={classes.container}>
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
                  <GridItem xs={12} sm={12} md={12} className={classes.container}>
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
                      autoWidth={true}
                    >
                      <MenuItem value={1}>Option 1</MenuItem>
                      <MenuItem value={2}>Option 2</MenuItem>
                      <MenuItem value={3}>Option 3</MenuItem>
                      <MenuItem value={4}>Option 4</MenuItem>
                      );
                    })}
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
                            <GridItem xs={12} sm={3} md={3}>
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
                                {data.categoryDetailsList.map(categoryDetail => {
                                  return (
                                    <MenuItem value={categoryDetail}>
                                      {categoryDetail.category.name}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                            </GridItem>
                            <GridItem xs={12} sm={3} md={3}>
                              <InputLabel htmlFor="subCategory" fullWidth>
                                Sub Category
                        </InputLabel>
                              <Select
                                onChange={this.handleChange}
                                value={this.state.subCategory.name}
                                renderValue={value => {
                                  return value;
                                }}
                                inputProps={{
                                  name: "subCategory",
                                  id: "subCategory"
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
                <TextField id="standard-number" type="number" name="difficulty" fullWidth onChange={this.handleChange}
                        value={this.state.difficulty} />
                    </InputLabel>
                  </GridItem>
                </GridContainer>
                <Spacing />
                <ExpansionPanelActions>
                  <Button type="reset" onClick={this.handleReset}>Clear</Button>
                  <Button color={"primary"}
                    variant={"outlined"}
                    type="submit"
                    onClick={e => this.handleClick(addQuestion, e)}
                  >
                    Submit
            </Button>
                </ExpansionPanelActions>
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

AddQuestion.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(AddQuestion);
