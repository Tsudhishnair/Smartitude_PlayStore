import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import TextField from "@material-ui/core/TextField";
import { ExpansionPanelActions, Button } from "@material-ui/core";
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
      form: {
        Name: "",
        Desc: ""
      }
    };
  }
  // handle name fields
  handleName = event => {
    this.setState({
      form: {
        ...this.state.form,
        Name: event.target.value
      }
    });
  };

  // handle description fields
  handleDescription = event => {
    this.setState({
      form: {
        ...this.state.form,
        Desc: event.target.value
      }
    });
  };


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
              value={this.state.form.Name}
              onChange={this.handleName}
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
              value={this.state.form.Desc}
              onChange={this.handleDescription}
              multiline
              fullWidth
              required
            />
          </GridItem>
        </GridContainer>
        <ExpansionPanelActions>
          <Button size="small">Clear</Button>
          <Button 
           size="small" 
           color="primary"
           variant="outlined"
          //  onClick={e=>this.handleClick}
           >
            Create
          </Button>
        </ExpansionPanelActions>
      </div>
    );
  }
}
export default withStyles(styles)(FormAddCategory);
