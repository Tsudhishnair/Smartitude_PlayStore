import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import TextField from "@material-ui/core/TextField";
const styles = themes => ({
  root: {
    dispaly: "felx",
    flexGrow:1,
  }
});
class FormAddCategory extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <GridContainer>
          <GridItem xs={6} md={6}>
            <TextField
              autoFocus
              margin="normal"
              id="name"
              label="Department Name"
              type="name"
              // value={this.state.form.name}
              // onChange={this.handleName}
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
              id="name"
              label="Description"
              type="name"
              // value={this.state.form.description}
              // onChange={this.handleDescription}
              multiline
              fullWidth
              required
            />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
export default withStyles(styles)(FormAddCategory);
