import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import { ExpansionPanelActions, Button } from "@material-ui/core";
import { Mutation } from "../../../../node_modules/react-apollo";

import gql from "graphql-tag";

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

const DEPARTMENT_LIST = gql`
  mutation addDepartment($name: String!, $description: String!) {
    addDepartment(name: $name, description: $description) {
      _id
    }
  }
`;
class FormAddDepartment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        name: "",
        description: ""
      }
    };
  }

  handleClick = (addDepartment, e) => {
    addDepartment({
      variables: {
        name: this.state.form.name,
        description: this.state.form.description
      }
    })
      .then(response => console.log(response))
      .catch(err => console.log(err));
  };

  handleName = event => {
    this.setState({
      form: {
        ...this.state.form,
        name: event.target.value
      }
    });
  };

  handleDescription = event => {
    this.setState({
      form: {
        ...this.state.form,
        description: event.target.value
      }
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Mutation mutation={DEPARTMENT_LIST}>
        {(addDepartment, data) => (
          <div className={classes.root}>
            <GridContainer>
              <GridItem xs={6} md={6}>
                <TextField
                  autoFocus
                  margin="normal"
                  id="name"
                  label="Department Name"
                  type="name"
                  value={this.state.form.name}
                  onChange={this.handleName}
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
                  value={this.state.form.description}
                  onChange={this.handleDescription}
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
                onClick={e => this.handleClick(addDepartment, e)}
              >
                Assign
              </Button>
            </ExpansionPanelActions>
          </div>
        )}
      </Mutation>
    );
  }
}

FormAddDepartment.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FormAddDepartment);
