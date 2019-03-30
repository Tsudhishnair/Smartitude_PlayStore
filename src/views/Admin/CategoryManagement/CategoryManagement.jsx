import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.jsx";
import Expansionpanel from "../../../components/ExpansionPanel/Expansionpanel";

import {
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Snackbar,
  Typography
} from "@material-ui/core";

import { Delete, Edit, ExpandLess, ExpandMore } from "@material-ui/icons";

import CategoryDialog from "../../../components/Dialog/DialogCategory";
import MessageDialog from "../../../components/Dialog/MessageDialog";
import CustomSnackbar from "../../../components/Snackbar/CustomSnackbar";

import { EXPANSION_CATEGORY_FORM, EXPANSION_SUBCATEGORY_FORM } from "../../../Utils";
// react apollo
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";

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
    paddingLeft: theme.spacing.unit * 6
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

const DELETE_CATEGORY = gql`
  mutation deleteCategory($_id: ID!) {
    deleteCategory(_id: $_id) {
      _id
    }
  }
`;

const DELETE_SUBCATEGORY = gql`
  mutation deleteSubcategory($_id: ID!) {
    deleteSubcategory(_id: $_id) {
      _id
    }
  }
`;

class CategoryManagement extends React.Component {
  reloadList = null;
  reloadCategoryDetailsList = () => {
    if (this.reloadList !== null) {
      this.reloadList();
    }
  };
  constructor(props) {
    super(props);

    // categories maintains a list of state regarding its expansion
    // editDialog maintains boolean state of edit dialog open state
    // selectedItem contains the item that was clicked
    // clickedType specifies whether the item clicked was category or subcategory
    this.state = {
      categories: {},
      editDialog: false,
      deleteDialog: false,
      selectedItem: {},
      clickedType: "",
      snackbar: {
        open: false,
        variant: "error",
        message: ""
      }
    };

    // used to check if its the first render
    this.firstLoad = true;

    this.mutation;
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

  //Handle Snackbar Controls
  openSnackbar = () => {
    this.setState({
      snackbar: {
        ...this.state.snackbar,
        open: true
      }
    });
  };

  closeSnackbar = () => {
    this.setState({
      snackbar: {
        ...this.state.snackbar,
        open: false
      }
    });
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
          reloadList={this.reloadCategoryDetailsList}
          type={this.state.clickedType}
          object={this.state.selectedItem}
          parentCategory={this.state.parentCategory}
          positiveAction="Confirm"
          negativeAction="Cancel"
          onClose={this.toggleEditDialogVisibility}
        />
      );
    }
  };

  toggleDeleteDialogVisibility = () => {
    this.setState(prevState => ({
      deleteDialog: !prevState.deleteDialog
    }));
  };

  renderDeleteDialog = isVisible => {
    if (isVisible) {
      if (this.state.clickedType === "category")
        return (
          <MessageDialog
            title="Delete Category"
            content="Are you sure you want to delete this category?"
            positiveAction="Confirm"
            negativeAction="Cancel"
            action={this.deleteItem}
            onClose={this.toggleDeleteDialogVisibility}
          />
        );
      else if (this.state.clickedType === "subcategory")
        return (
          <MessageDialog
            title="Delete Subcategory"
            content="Are you sure you want to delete this subcategory?"
            positiveAction="Confirm"
            negativeAction="Cancel"
            action={this.deleteItem}
            onClose={this.toggleDeleteDialogVisibility}
          />
        );
      else return <div />;
    }
  };

  handleDeleteCategoryClick = (selectedItem, mutation) => {
    this.toggleDeleteDialogVisibility();

    this.mutation = mutation;

    this.setState({
      selectedItem,
      clickedType: "category"
    });
  };

  handleDeleteSubcategoryClick = (selectedItem, mutation) => {
    this.toggleDeleteDialogVisibility();

    this.mutation = mutation;

    this.setState({
      selectedItem,
      clickedType: "subcategory"
    });
  };

  deleteItem = () => {
    this.mutation({
      variables: {
        _id: this.state.selectedItem._id
      }
    })
      .then(res => {
        console.log(res);
        this.setState(
          {
            loading: false,
            snackbar: {
              ...this.state.snackbar,
              variant: "success",
              message: "Deletion Successfull!"
            }
          },
          () => this.openSnackbar()
        );
        this.reloadCategoryDetailsList();
      })
      .catch(err => {
        this.setState(
          {
            loading: false,
            snackbar: {
              ...this.state.snackbar,
              variant: "error",
              message: "Could not perform delete request!"
            }
          },
          () => this.openSnackbar()
        );
        console.log(err);
        this.reloadCategoryDetailsList();
      })
  };

  // opens edit dialog by toggling visibility state and setting state to the item that was selected
  openEditDialog = selectedItem => {
    this.toggleEditDialogVisibility();

    this.setState({
      selectedItem,
      clickedType: "category"
    });
  };

  // used to manage dialog for subcategory
  openSubcategoryEditDialog = (selectedItem, parentCategory) => {
    this.toggleEditDialogVisibility();

    this.setState({
      selectedItem: {
        ...selectedItem
      },
      clickedType: "subcategory",
      parentCategory: {
        ...parentCategory
      }
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
    const { snackbar } = this.state;

    return (
      <Query query={FETCH_CATEGORY_DETAILS}>
        {({ data, loading, error, refetch }) => {
          this.reloadList = refetch;
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
                  {this.renderDeleteDialog(this.state.deleteDialog)}
                  <Expansionpanel
                    headers="Category"
                    header="Add new category"
                    reloadList={this.reloadCategoryDetailsList}
                    directingValue={EXPANSION_CATEGORY_FORM}
                  />
                  <Expansionpanel
                    reloadList={this.reloadCategoryDetailsList}
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
                              {/*<ListItemAvatar>*/}
                              {/*<Avatar*/}
                              {/*alt="Category Icon"*/}
                              {/*src="assets/img/faces/marc.jpg"*/}
                              {/*/>*/}
                              {/*</ListItemAvatar>*/}
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
                                <Mutation mutation={DELETE_CATEGORY}>
                                  {deleteCategory => (
                                    <IconButton
                                      aria-label="Delete"
                                      onClick={e =>
                                        this.handleDeleteCategoryClick(
                                          categoryDetail.category,
                                          deleteCategory
                                        )
                                      }
                                    >
                                      <Delete />
                                    </IconButton>
                                  )}
                                </Mutation>
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
                                      color={"grey"}
                                      secondary={subcategory.description}
                                    />
                                    <IconButton
                                      aria-label="Edit"
                                      onClick={e =>
                                        this.openSubcategoryEditDialog(
                                          subcategory,
                                          categoryDetail.category
                                        )
                                      }
                                    >
                                      <Edit />
                                    </IconButton>
                                    <Mutation mutation={DELETE_SUBCATEGORY}>
                                      {deleteSubcategory => (
                                        <IconButton
                                          aria-label="Delete"
                                          onClick={e =>
                                            this.handleDeleteSubcategoryClick(
                                              subcategory,
                                              deleteSubcategory
                                            )
                                          }
                                        >
                                          <Delete />
                                        </IconButton>
                                      )}
                                    </Mutation>
                                  </ListItem>
                                </List>
                              ))}
                            </Collapse>
                          </React.Fragment>
                        );
                      })}
                    </List>
                  </Card>
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
