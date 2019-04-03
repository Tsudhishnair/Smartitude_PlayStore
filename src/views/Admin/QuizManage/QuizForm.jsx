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
  withStyles
} from "@material-ui/core";

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

class QuizForm extends React.Component {
  //selectedDate --> state to store date
  constructor(props) {
    super(props);

    this.props = props;

    this.categories = [];

    this.batches = [];

    this.numberOfSections = 1;

    this.state = {
      quizCommon: {
        quizName: "",
        numberOfQns: 0,
        batch: "",
        selectedDate: new Date()
      },
      quizSectionWise: [
        {
          category: {
            name: ""
          },
          subcategories: [],
          subcategoryList: [],
          clearSubcategoryChips: false
        }
      ],
      subcategories: [],
      category: {
        name: ""
      },
      subcategoryList: [],
      clearSubcategoryChips: false
    };
  }

  //Set the date in the state of Qiz Expiry from Quiz Form
  handleDateChange = date => {
    this.setState({
      quizCommon: {
        ...this.state.quizCommon,
        selectedDate: date
      }
    });
  };

  //handleClick function is to add more options into the quiz

  handleClick = event => {
    this.numberOfSections++;

    this.setState({
      quizSectionWise: [
        ...this.state.quizSectionWise,
        {
          category: {
            name: ""
          },
          subcategories: [],
          subcategoryList: [],
          clearSubcategoryChips: false
        }
      ]
    });
  };

  //handle All the function state addition
  handleCommonFieldChanges = event => {
    if (event.target.value < 0) {
      event.target.value = 0;
    }
    this.setState({
      quizCommon: {
        ...this.state.quizCommon,
        [event.target.name]: event.target.value
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

  renderSectionDetails = (classes) => {
    let counter = 1;

    let singlePiece = (
      <Fragment>
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
        <GridItem xs={12} sm={8} md={8} className={classes.elementPadding}>
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
        <GridItem xs={12} sm={2} md={6}>
          <TextField
            id="standard-number"
            label="No. Of Quest."
            type="number"
            fullWidth
            margin="normal"
          />
        </GridItem>
        <GridItem xs={12} sm={2} md={6}>
          <TextField
            id="standard-number"
            label="Time Limit (min)"
            type="number"
            fullWidth
            margin="normal"
          />
        </GridItem>
        <br />
      </Fragment>
    );

    let sectionContainer = [];

    while (counter <= this.numberOfSections) {
      sectionContainer.push(singlePiece);
      counter++;
    }

    return sectionContainer;
  };

  //For Displaying the selected subcategories
  getSelectedSubcategories = selectedSubcategories => {
    const subcategories = selectedSubcategories.map(selectedSubcategory => {
      return selectedSubcategory.value;
    });
    this.setState({
      ...this.state,
      subcategories
    });
  };

  //Function is for clearing the chips
  chipsCleared = () => {
    this.setState({
      ...this.state,
      clearSubcategoryChips: false
    });
  };

  //Function is for obtaining subcategory corresponding to selected category
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
      clearSubcategoryChips: true
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
            console.log(data);

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
                          minDate={this.state.quizCommon.selectedDate}
                          label="Quiz Expiry"
                          clearable
                          formatDate={date => moment(date).format("YYYY-MM-DD")}
                          value={this.state.quizCommon.selectedDate}
                          format="dd/MMM/yyyy"
                          onChange={this.handleDateChange}
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
