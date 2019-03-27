import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import TextField from "@material-ui/core/TextField";
import { Button, ExpansionPanelActions } from "@material-ui/core";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const styles = themes => ({
  root: {
    dispaly: "felx",
    flexGrow: 1
  }
});
class FormAddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: ""
    };
  }
  // handle changes in form fields
  handleChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  clearForm = () => {
    this.setState({
      name: "",
      description: ""
    });
  };

  render() {
    const ADD_CATEGORY = gql`
      mutation addCategory($categoryInput: CategoryInput!) {
        addCategory(categoryInput: $categoryInput) {
          _id
        }
      }
    `;
    const { classes } = this.props;
    return (
      <Mutation mutation={ADD_CATEGORY} onCompleted={this.clearForm}>
        {addCategory => {
          return (
            <div className={classes.root}>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  addCategory({
                    variables: {
                      categoryInput: {
                        name: this.state.name,
                        description: this.state.description
                      }
                    }
                  });
                }}
              >
                <GridContainer>
                  <GridItem xs={6} md={6}>
                    <TextField
                      autoFocus
                      margin="normal"
                      id="name"
                      name="name"
                      label="Category Name"
                      placeholder={"Enter the category name here"}
                      type="text"
                      value={this.state.name}
                      onChange={this.handleChange}
                      fullWidth
                      required
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="description"
                      name="description"
                      placeholder={"Enter a description for the category here"}
                      label="Category Description"
                      type="text"
                      value={this.state.description}
                      onChange={this.handleChange}
                      multiline
                      fullWidth
                      required
                    />
                  </GridItem>
                </GridContainer>
                <ExpansionPanelActions>
                  <Button size="small" onClick={this.clearForm}>
                    Clear
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    type="submit"
                  >
                    Create
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
export default withStyles(styles)(FormAddCategory);
