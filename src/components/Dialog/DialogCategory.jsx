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

import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";

import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import formControlStyle from "../../assets/jss/form-control";

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
    })
      .then(res => {
        // TODO: handle errors
        if (this.props.reloadList !== null) {
          this.props.reloadList();
        }
        this.handleDialogClose();
      })
      .catch(err => {
        console.log("Error occured while editing category");
        console.log(err);
        if (this.props.reloadList !== null) {
          this.props.reloadList();
        }
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
    })
      .then(res => {
        // TODO: handle errors
        if (this.props.reloadList !== null) {
          this.props.reloadList();
        }
        this.handleDialogClose();
      })
      .catch(err => {
        console.log("Error occured while editing subcategory");
        console.log(err);
        if (this.props.reloadList !== null) {
          this.props.reloadList();
        }
      });
  };

  render() {
    const { positiveAction, negativeAction } = this.props;

    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
          maxWidth={"xs"}
        >
          {/* assign labels depending on type */}
          <DialogTitle id="form-dialog-title">Category</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
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
                    margin="normal"
                    type="text"
                    fullWidth
                    required
                    value={this.state.nameField}
                    onChange={this.handleNameChange}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
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
                    multiline={true}
                    rows={2}
                    margin="normal"
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
  onClose: PropTypes.func,
  reloadList: PropTypes.func.isRequired
};

export default withStyles(formControlStyle)(DialogCategory);
