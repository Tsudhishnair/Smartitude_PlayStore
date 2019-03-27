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

class DialogCategory extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      open: true,
      categoryName: this.props.object.name,
      categoryDesc: this.props.object.description,
      subCategoryName: "",
      subCategoryDesc: ""
    };
  }

  handleDialogOpen = () => {
    this.setState({ open: true });
  };

  handleDialogClose = () => {
    this.setState({ open: false });
    this.props.onClose();
  };

  handleNameChange = event => {
    this.setState({
      categoryName: event.target.value
    });
  };

  handleDescChange = event => {
    this.setState({
      categoryDesc: event.target.value
    });
  };

  handleCategoryEdit = editCategory => {
    editCategory({
      variables: {
        _id: this.props.object._id,
        categoryInput: {
          name: this.state.categoryName,
          description: this.state.categoryDesc
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
          <DialogTitle id="form-dialog-title">Category</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <GridContainer>
                <GridItem xs={12} md={12}>
                  <TextField
                    id="categoryName"
                    name="categoryName"
                    label="Category Name"
                    type="text"
                    fullWidth
                    required
                    value={this.state.categoryName}
                    onChange={this.handleNameChange}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} md={12} lg={12}>
                  <TextField
                    id="categoryDesc"
                    name="categoryDesc"
                    label="Category Description"
                    type="text"
                    fullWidth
                    required
                    value={this.state.categoryDesc}
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
