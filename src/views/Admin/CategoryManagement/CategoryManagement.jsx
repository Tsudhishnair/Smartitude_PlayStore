import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.jsx";
import Expansionpanel from "../../../components/ExpansionPanel/Expansionpanel";

import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Typography,
  IconButton,
  Avatar,
  ListItemAvatar,
  ListItemSecondaryAction
} from "@material-ui/core";

import { ExpandMore, ExpandLess, Edit } from "@material-ui/icons";

import CategoryDialog from "../../../components/Dialog/DialogCategory";

import {
  EXPANSION_CATEGORY_FORM,
  EXPANSION_SUBCATEGORY_FORM
} from "../../../Utils";

// react apollo
import gql from "graphql-tag";
import { Query } from "react-apollo";

const styles = theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content"
  },
  formControl: {
    marginTop: theme.spacing.unit * 2,
    minWidth: 120
  },
  formControlLabel: {
    marginTop: theme.spacing.unit
  },
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});

const FETCH_CATEGORY_DETAILS = gql`
  {
    categoryDetailsList {
      category {
        _id
        name
        description
      }
      subcategory {
        _id
        name
        description
      }
    }
  }
`;

class CategoryManagement extends React.Component {
  constructor(props) {
    super(props);

    // categories maintains a list of state regarding its expansion
    this.state = {
      categories: {},
      editDialog: false,
      selectedItem: {},
      clickedType: ""
    };

    // used to check if its the first render
    this.firstLoad = true;
  }

  // called when a row or the expand buttons are clicked
  handleClick = _id => {
    // iterate through the categories in state
    for (let index in this.state.categories) {
      // if index matches with clicked index
      if (_id in this.state.categories[index]) {
        // change state of row to opposite of what it was before: expanded or collapsed
        this.setState(prevState => {
          return {
            categories: {
              ...this.state.categories,
              [index]: {
                [_id]: !prevState.categories[index][_id]
              }
            }
          };
        });
        // stop execution of for loop when the index is found
        return;
      }
    }
  };

  // toggle the visibility of the dialog
  toggleEditDialogVisibility = () => {
    this.setState(prevState => ({
      editDialog: !prevState.editDialog
    }));
  };

  // render edit dialog depending on the item that was selected. this relies on the re-render that is initiated whenever the selectedItem is changed. Mutations are called inside the dialog component
  renderEditDialog = isVisible => {
    if (isVisible) {
      return (
        <CategoryDialog
          type={this.state.clickedType}
          object={this.state.selectedItem}
          positiveAction="Confirm"
          negativeAction="Cancel"
          onClose={this.toggleEditDialogVisibility}
        />
      );
    }
  };

  // opens edit dialog by toggling visibility state and setting state to the item that was selected
  openEditDialog = selectedItem => {
    this.toggleEditDialogVisibility();

    this.setState({
      selectedItem: {
        ...selectedItem
      },
      clickedType: "category"
    });
  };

  // used to manage dialog for subcategory
  openSubcategoryEditDialog = selectedItem => {
    this.toggleEditDialogVisibility();

    this.setState({
      selectedItem: {
        ...selectedItem
      },
      clickedType: "subcategory"
    });
  };

  // initialise the states of category list. this is only called in the first load
  initCollapseStates = categoriesList => {
    let states = [];
    let i = 0;

    // get the category list and store it in a temp array 'states'
    while (i < categoriesList.length) {
      states.push({
        [categoriesList[i]._id]: false
      });
      i++;
    }

    // spread state array among category state
    this.setState(
      {
        categories: {
          ...states
        }
      },
      () => {
        // after setState is completed, change firstLoad to false
        this.firstLoad = false;
      }
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <Query query={FETCH_CATEGORY_DETAILS}>
        {({ data, loading, error }) => {
          if (loading) {
            return <Typography>Loading</Typography>;
          } else if (error) {
            return <Typography>Error occured while fetching data.</Typography>;
          } else {
            const categoriesList = data.categoryDetailsList.map(
              categoryDetail => {
                return categoryDetail.category;
              }
            );

            if (this.firstLoad) {
              // only initialise on first load
              this.initCollapseStates(categoriesList);
              return <div />;
            } else {
              return (
                <React.Fragment>
                  {this.renderEditDialog(this.state.editDialog)}
                  <Expansionpanel
                    headers="Category"
                    header="Add new category"
                    directingValue={EXPANSION_CATEGORY_FORM}
                  />
                  <Expansionpanel
                    categories={categoriesList}
                    headers="Sub-Category"
                    header="Add new subcategory"
                    directingValue={EXPANSION_SUBCATEGORY_FORM}
                  />
                  <Card>
                    <List component="nav">
                      {data.categoryDetailsList.map((categoryDetail, index) => {
                        return (
                          <React.Fragment key={categoryDetail.category._id}>
                            <ListItem
                              button
                              onClick={e =>
                                this.handleClick(categoryDetail.category._id)
                              }
                            >
                              <ListItemAvatar>
                                <Avatar
                                  alt="Category Icon"
                                  src="assets/img/faces/marc.jpg"
                                />
                              </ListItemAvatar>
                              <ListItemText
                                primary={categoryDetail.category.name}
                                secondary={categoryDetail.category.description}
                              />
                              <ListItemSecondaryAction>
                                <IconButton
                                  aria-label="Edit"
                                  onClick={e =>
                                    this.openEditDialog(categoryDetail.category)
                                  }
                                >
                                  <Edit />
                                </IconButton>
                                <IconButton
                                  aria-label="Expand"
                                  onClick={e =>
                                    this.handleClick(
                                      categoryDetail.category._id
                                    )
                                  }
                                >
                                  {this.state.categories[index][
                                    categoryDetail.category._id
                                  ] ? (
                                    <ExpandLess />
                                  ) : (
                                    <ExpandMore />
                                  )}
                                </IconButton>
                              </ListItemSecondaryAction>
                            </ListItem>
                            <Collapse
                              in={
                                this.state.categories[index][
                                  categoryDetail.category._id
                                ]
                              }
                              timeout="auto"
                              unmountOnExit
                            >
                              {categoryDetail.subcategory.map(subcategory => (
                                <List
                                  component="div"
                                  disablePadding
                                  key={subcategory._id}
                                >
                                  <ListItem
                                    key={subcategory._id}
                                    button
                                    className={classes.nested}
                                    onClick={this.handleCategoryDialogOpen}
                                  >
                                    <ListItemText
                                      primary={subcategory.name}
                                      secondary={subcategory.description}
                                    />
                                    <IconButton
                                      aria-label="Edit"
                                      onClick={e =>
                                        this.openSubcategoryEditDialog(
                                          subcategory
                                        )
                                      }
                                    >
                                      <Edit />
                                    </IconButton>
                                  </ListItem>
                                </List>
                              ))}
                            </Collapse>
                          </React.Fragment>
                        );
                      })}
                    </List>
                  </Card>
                </React.Fragment>
              );
            }
          }
        }}
      </Query>
    );
  }
}

CategoryManagement.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CategoryManagement);
