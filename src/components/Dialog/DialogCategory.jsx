import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide
} from "@material-ui/core";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  formControl: {
    margin: 0,
    padding: theme.spacing.unit * 10,
    fullWidth: true,
    marginTop: theme.spacing.unit * 3,
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
function Transition(props) {
  return <Slide direction="up" {...props} />;
}

// edit category mutation query
const EDIT_CATEGORY = gql`
  mutation editCategory($_id: ID!, $categoryInput: CategoryInput!) {
    editCategory(_id: $_id, categoryInput: $categoryInput) {
      _id
    }
  }
`;

// edit subcategory mutation query
const EDIT_SUBCATEGORY = gql`
  mutation editSubcategory(
    $_id: ID!
    $subcategoryEditInput: SubcategoryEditInput!
  ) {
    editSubcategory(_id: $_id, subcategoryEditInput: $subcategoryEditInput) {
      _id
    }
  }
`;

class DialogCategory extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      open: true,
      type: this.props.type,
      parentCategory: this.props.parentCategory,
      nameField: this.props.object.name,
      descField: this.props.object.description
    };
  }

  // opens dialog box
  handleDialogOpen = () => {
    this.setState({ open: true });
  };

  // close dialogbox, also call close in parent
  handleDialogClose = () => {
    this.setState({ open: false });
    this.props.onClose();
  };

  // handle name field
  handleNameChange = event => {
    this.setState({
      nameField: event.target.value
    });
  };

  // handle desc field
  handleDescChange = event => {
    this.setState({
      descField: event.target.value
    });
  };

  // called on click of category edit confirmation
  handleCategoryEdit = editCategory => {
    editCategory({
      variables: {
        _id: this.props.object._id,
        categoryInput: {
          name: this.state.nameField,
          description: this.state.descField
        }
      }
    }).then(res => {
      // TODO: handle errors
      this.handleDialogClose();
    });
  };

  // called on cick of subcategory edit confirmatin
  handleSubcategoryEdit = editSubcategory => {
    editSubcategory({
      variables: {
        _id: this.props.object._id,
        subcategoryEditInput: {
          name: this.state.nameField,
          description: this.state.descField,
          category: this.state.parentCategory._id
        }
      }
    }).then(res => {
      // TODO: handle errors
      this.handleDialogClose();
    });
  };

  render() {
    const { type, object, positiveAction, negativeAction, action } = this.props;

    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        {/* assign labels depending on type */}
          <DialogTitle id="form-dialog-title">Category</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <GridContainer>
                <GridItem xs={12} md={12}>
                  <TextField
                    id={
                      this.state.type === "category"
                        ? "categoryName"
                        : "subcategoryName"
                    }
                    name={
                      this.state.type === "category"
                        ? "categoryName"
                        : "subcategoryName"
                    }
                    label={
                      this.state.type === "category"
                        ? "Category Name"
                        : "Subcategory Name"
                    }
                    type="text"
                    fullWidth
                    required
                    value={this.state.nameField}
                    onChange={this.handleNameChange}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} md={12} lg={12}>
                  <TextField
                    id={
                      this.state.type === "category"
                        ? "categoryDesc"
                        : "subcategoryDesc"
                    }
                    name={
                      this.state.type === "category"
                        ? "categoryDesc"
                        : "subcategoryDesc"
                    }
                    label={
                      this.state.type === "category"
                        ? "Category Description"
                        : "Subcategory Description"
                    }
                    type="text"
                    fullWidth
                    required
                    value={this.state.descField}
                    onChange={this.handleDescChange}
                  />
                </GridItem>
              </GridContainer>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose} color="primary">
              {negativeAction ? negativeAction : "CANCEL"}
            </Button>
            {this.state.type === "category" ? (
              // render for edit category
              <Mutation mutation={EDIT_CATEGORY}>
                {editCategory => (
                  <Button
                    onClick={e => this.handleCategoryEdit(editCategory)}
                    color="primary"
                    autoFocus
                  >
                    {positiveAction ? positiveAction : "OK"}
                  </Button>
                )}
              </Mutation>
            ) : (
              // render for subcategory
              <Mutation mutation={EDIT_SUBCATEGORY}>
                {editSubcategory => (
                  <Button
                    onClick={e => this.handleSubcategoryEdit(editSubcategory)}
                    color="primary"
                    autoFocus
                  >
                    {positiveAction ? positiveAction : "OK"}
                  </Button>
                )}
              </Mutation>
            )}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DialogCategory.propTypes = {
  positiveAction: PropTypes.string,
  negativeAction: PropTypes.string,
  action: PropTypes.func.isRequired,
  onClose: PropTypes.func
};

export default withStyles(styles)(DialogCategory);
