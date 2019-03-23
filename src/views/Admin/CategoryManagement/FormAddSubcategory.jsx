import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import TextField from "@material-ui/core/TextField";
import { ExpansionPanelActions, Button } from "@material-ui/core";
import { Mutation } from "react-apollo";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import gql from "graphql-tag";


const styles = themes => ({
  root: {
    dispaly: "felx",
    flexGrow: 1
  }
});
class FormAddSubcategory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      category: {
        name: "",
        _id: ""
      }
    };
  }
  // handle changes in form fields
  handleChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  };

  clearForm = () => {
    this.setState({
      name: "",
      description: "",
      category: {
        name: "",
        _id: ""
      }
    });
  }


  render() {
    const ADD_SUBCATEGORY = gql`
    mutation addSubcategory($subcategoryInput: SubcategoryInput!) {
      addSubcategory(subcategoryInput: $subcategoryInput) {
          _id
        }
      }
  `;
    const { classes, categories } = this.props;
    console.log(categories);

    return (
      <Mutation
        mutation={ADD_SUBCATEGORY}
        onCompleted={this.clearForm}>
        {addSubcategory => {
          return (
            <div className={classes.root}>
              <GridContainer>
                <GridItem xs={6} md={6}>
                  <TextField
                    autoFocus
                    margin="normal"
                    id="name"
                    name="name"
                    label="Subcategory Name"
                    type="name"
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
                    label="Subcategory Description"
                    type="text"
                    value={this.state.description}
                    onChange={this.handleChange}
                    multiline
                    fullWidth
                    required
                  />
                </GridItem>
                <GridItem xs={12} sm={4} md={4} className={classes.formControl}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="category">Category</InputLabel>
                    <Select
                      required
                      onChange={this.handleChange}
                      value={this.state.category}
                      renderValue={value => {
                        return value.name;
                      }}
                      inputProps={{
                        name: "category",
                        id: "category"
                      }}
                      fullWidth
                    >
                      {
                        categories.map(categoryItem => {
                          const category = {
                            _id: categoryItem._id,
                            name: categoryItem.name,
                            description: categoryItem.description
                          }
                          return (
                            <MenuItem
                            key={category._id}
                            value={category}>
                            {category.name}
                          </MenuItem>
                          )
                        })
                      }
                    </Select>
                  </FormControl>
                </GridItem>
              </GridContainer>

              <ExpansionPanelActions>
                <Button
                  size="small"
                  onClick={this.clearForm}
                >Clear</Button>
                <Button
                  size="small"
                  color="primary"
                  variant="outlined"
                  onClick={e => {
                    e.preventDefault();
                    addSubcategory({
                      variables: {
                        subcategoryInput: {
                          category: this.state.category._id,
                          name: this.state.name,
                          description: this.state.description
                        }
                      }
                    });
                  }}
                >
                  Create
          </Button>
              </ExpansionPanelActions>
            </div>
          );
        }}
      </Mutation>
    );
  }
}
export default withStyles(styles)(FormAddSubcategory);
