import React, { Fragment } from "react";

import { MuiPickersUtilsProvider } from "material-ui-pickers";
import { DatePicker } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import ReactChipInput from "../../../components/AutoChip/ReactChipSelect";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Typography,
  TextField,
  withStyles,
  IconButton,
  FormControlLabel,
  Switch
} from "@material-ui/core";

import { Delete } from "@material-ui/icons";

import moment from "moment";
import gql from "graphql-tag";
import { Query } from "react-apollo";

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

const DATE_FROM = 1;
const DATE_TO = 2;

class QuizForm extends React.Component {
  //selectedDate --> state to store date
  constructor(props) {
    super(props);

    this.props = props;

    this.categories = [];

    this.batches = [];

    this.numberOfSections = 0;

    this.state = {
      quizCommon: {
        quizName: "",
        numberOfQns: 0,
        batch: "",
        marksPerQn: 0,
        negativeMarksPerQn: 0,
        activeFrom: new Date(),
        activeTo: new Date(),
        active: false
      },
      quizSectionWise: [
        {
          category: {
            name: ""
          },
          subcategories: [],
          subcategoryList: [],
          clearSubcategoryChips: false,
          numberOfQns: 0,
          timeLimit: 0
        }
      ]
    };
  }

  //Set the date in the state of Qiz Expiry from Quiz Form
  handleDateChange = (date, type) => {
    if (type === DATE_FROM) {
      this.setState({
        quizCommon: {
          ...this.state.quizCommon,
          activeFrom: date
        }
      });
    } else if (type === DATE_TO) {
      this.setState({
        quizCommon: {
          ...this.state.quizCommon,
          activeTo: date
        }
      });
    }
  };

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

    if (event.target.value < 0) {
      event.target.value = 0;
    }

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

  handleTimeLimitField = (event, index) => {
    this.setState({
      quizSectionWise: {
        ...this.state.quizSectionWise,
        [index]: {
          ...this.state.quizSectionWise[index],
          timeLimit: event.target.value
        }
      }
    });
  };

  handleNumberOfQnsField = (event, index) => {
    this.setState({
      quizSectionWise: {
        ...this.state.quizSectionWise,
        [index]: {
          ...this.state.quizSectionWise[index],
          numberOfQns: event.target.value
        }
      }
    });
  };

  //handleClick function is to add more options into the quiz
  handleClick = () => {
    this.numberOfSections++;

    this.setState({
      quizSectionWise: {
        ...this.state.quizSectionWise,
        [this.numberOfSections]: {
          category: {
            name: ""
          },
          subcategories: [],
          subcategoryList: [],
          clearSubcategoryChips: false,
          numberOfQns: 0,
          timeLimit: 0
        }
      }
    });
  };

  handleDeleteClick = index => {
    let tempObj = this.state.quizSectionWise;
    delete tempObj[index];

    this.setState({
      quizSectionWise: {
        ...tempObj
      }
    });
  };

  // Category dropdown funciton
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

  createSectionPiece = (counter, classes) => {
    let singlePiece;
    let index = counter;

    if (this.state.quizSectionWise[index]) {
      singlePiece = (
        <Fragment>
          <GridItem xs={12} sm={12} md={12} className={classes.formControl}>
            <IconButton onClick={() => this.handleDeleteClick(index)}>
              <Delete />
            </IconButton>
          </GridItem>
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
          <GridItem xs={12} sm={2} md={6}>
            <TextField
              id="standard-number"
              label="No. Of Quest."
              type="number"
              fullWidth
              margin="normal"
              value={this.state.quizSectionWise[index].numberOfQns}
              onChange={e => this.handleNumberOfQnsField(e, index)}
            />
          </GridItem>
          <GridItem xs={12} sm={2} md={6}>
            <TextField
              id="standard-number"
              label="Time Limit (min)"
              type="number"
              fullWidth
              margin="normal"
              value={this.state.quizSectionWise[index].timeLimit}
              onChange={e => this.handleTimeLimitField(e, index)}
            />
          </GridItem>
          <br />
        </Fragment>
      );
    } else {
      singlePiece = <Fragment />;
    }

    return singlePiece;
  };

  renderSectionDetails = classes => {
    let counter = 0;

    let sectionContainer = [];
    console.log("section rendered");

    while (counter <= this.numberOfSections) {
      let singlePiece = this.createSectionPiece(counter, classes);

      console.log(`counter:${counter}, sectoinNum:${this.numberOfSections}`);

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

  render() {
    const { classes } = this.props;

    return (
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

            return (
              <div className={classes.root}>
                <form autoComplete="off" autoWidth={true}>
                  <Typography>
                    <strong>Basic Info</strong>
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
                        onChange={this.handleCommonFieldChanges}
                        fullWidth
                      />
                    </GridItem>
                    <GridItem
                      xs={12}
                      sm={3}
                      md={3}
                      className={classes.container}
                    >
                      <TextField
                        id="standard-marks"
                        label="+ Marks Per Question"
                        margin="normal"
                        type="number"
                        name="marksPerQn"
                        value={this.state.quizCommon.marksPerQn}
                        onChange={this.handleCommonFieldChanges}
                        fullWidth
                      />
                    </GridItem>
                    <GridItem
                      xs={12}
                      sm={3}
                      md={3}
                      className={classes.container}
                    >
                      <TextField
                        id="standard-negative-marks"
                        label="- Marks per Question"
                        margin="normal"
                        type="number"
                        name="negativeMarksPerQn"
                        value={this.state.quizCommon.negativeMarksPerQn}
                        onChange={this.handleCommonFieldChanges}
                        fullWidth
                      />
                    </GridItem>
                    <GridItem
                      xs={12}
                      sm={3}
                      md={3}
                      className={classes.container}
                    >
                      <TextField
                        id="standard-number"
                        label="Number Of Questions"
                        margin="normal"
                        type="number"
                        name="numberOfQns"
                        value={this.state.quizCommon.numberOfQns}
                        onChange={this.handleCommonFieldChanges}
                        fullWidth
                      />
                    </GridItem>
                    <GridItem xs={12} sm={3} md={3}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                          className={classes.date_root}
                          minDate={this.state.quizCommon.activeFrom}
                          label="Active From"
                          clearable
                          formatDate={date => moment(date).format("YYYY-MM-DD")}
                          value={this.state.quizCommon.activeFrom}
                          format="dd/MMM/yyyy"
                          onChange={date =>
                            this.handleDateChange(date, DATE_FROM)
                          }
                        />
                      </MuiPickersUtilsProvider>
                    </GridItem>
                    <GridItem xs={12} sm={3} md={3}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                          className={classes.date_root}
                          minDate={this.state.quizCommon.activeTo}
                          label="Active To"
                          clearable
                          formatDate={date => moment(date).format("YYYY-MM-DD")}
                          value={this.state.quizCommon.activeTo}
                          format="dd/MMM/yyyy"
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
                          onChange={this.handleCommonFieldChanges}
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
                        id="description"
                        label="Quiz Description"
                        margin="normal"
                        type="text"
                        name="description"
                        value={this.state.quizCommon.description}
                        onChange={this.handleCommonFieldChanges}
                        fullWidth
                      />
                    </GridItem>
                  </GridContainer>
                  <Typography>
                    <strong>Other Info</strong>
                  </Typography>
                  <GridContainer>
                    {this.renderSectionDetails(classes)}
                  </GridContainer>
                  <GridItem xs={12} sm={2} md={2}>
                    <Button
                      fullWidth
                      color="primary"
                      className={classes.button}
                      onClick={this.handleClick}
                    >
                      Add More
                    </Button>
                  </GridItem>
                </form>
              </div>
            );
          }
        }}
      </Query>
    );
  }
}

// QuizForm.propTypes =

export default withStyles(styles)(QuizForm);
