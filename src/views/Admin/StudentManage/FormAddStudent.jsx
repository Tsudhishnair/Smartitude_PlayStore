import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import FormControl from "@material-ui/core/FormControl";
import Spacing from "../../../components/Spacing/Spacing";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { th } from "date-fns/esm/locale";
const styles = theme => ({
  formControl: {
    margin: 0,
    padding: theme.spacing.unit * 10,
    fullWidth: true,
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 2,
    backgroundColor: "#9ee",
    wrap: "nowrap",
    minWidth: 120
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

class CreateNewFacultyForm extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state=
    {
       option:"",
    };
  }
  OnOptionchange(){

  }
    render() {
      const { classes } = this.props;
      const deptquery = gql`{
      departments{
        name
      }
    }   `;
      return (
        <div className={classes.root}>
          <Typography>
            {" "}
            <strong>Basic Info</strong>
          </Typography>
          <GridContainer>
            <GridItem xs={12} sm={4} md={4} className={classes.elementPadding}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="name"
                fullWidth
              />
            </GridItem>
            <GridItem xs={12} sm={4} md={4} className={classes.elementPadding}>
              <TextField
                autoFocus
                margin="dense"
                id="username"
                label="Username"
                type="name"
                fullWidth
              />
            </GridItem>
            <GridItem xs={12} sm={4} md={4} className={classes.elementPadding}>
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
              />
            </GridItem>
          </GridContainer>
          <Spacing />
          <Typography>
            {" "}
            <strong>College Info</strong>
          </Typography>
          <GridContainer>
            <GridItem xs={12} sm={4} md={4} className={classes.elementPadding}>
              <TextField
                autoFocus
                margin="dense"
                id="phone"
                label="Phone Number"
                type="phone"
                fullWidth
              />
            </GridItem>
            <GridItem xs={12} sm={4} md={4} className={classes.formControl}>
              <FormControl fullWidth>
                <InputLabel htmlFor="age-simple">Department</InputLabel>
                <Select
                  value={this.state.option}
                  inputProps={{
                    name: "dept",
                    id: "dept"
                  }}
                  fullWidth
                >
                  <Query query={deptquery}>
                    {({ data, loading, error }) => {
                      if (!loading) {
                        return (<Fragment>
                          {data.departments.map(department => {
                            return <MenuItem value="sm" onClick={}>{department.name}</MenuItem>;
                          })}
                        </Fragment>);
                      }

                      else {
                        return <Fragment />;
                      }
                    }}
                  </Query>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem xs={12} sm={4} md={4} className={classes.elementPadding}>
              <TextField
                autoFocus
                margin="dense"
                id="batch"
                label="Batch"
                type="number"
                fullWidth
              />
            </GridItem>
          </GridContainer>
        </div>
      );
    }
  }


export default withStyles(styles)(CreateNewFacultyForm);
