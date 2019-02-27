import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import { orange } from "@material-ui/core/colors";
import { ExpansionPanelActions, Button, Divider } from "@material-ui/core";

const styles = theme => ({
  formControl: {
    margin: 0,
    padding: theme.spacing.unit * 10,
    fullWidth: true,
    marginTop: theme.spacing.unit * 2,
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
class FormAddDepartment extends React.Component {
  constructor(props) {
    super(props);
  }

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
              fullWidth
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
              multiline
              fullWidth
            />
          </GridItem>
        </GridContainer>
        <ExpansionPanelActions>
            <Button
              size="small"
              onClick={e => {
                e.preventDefault();
              }}
            >
              Clear
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={e => {
                e.preventDefault();
              }}
            >
              Assign
            </Button>
          </ExpansionPanelActions>
      </div>
    );
  }
}
export default withStyles(styles)(FormAddDepartment);
