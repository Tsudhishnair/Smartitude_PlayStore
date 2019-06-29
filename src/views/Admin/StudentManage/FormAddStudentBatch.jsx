import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import { Button, Typography } from "@material-ui/core";

import CSVReader from "react-csv-reader";

import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import { validators } from "../../../Utils";

const styles = theme => ({
  formControl: {
    margin: 0,
    padding: theme.spacing.unit * 10,
    fullWidth: true,
    backgroundColor: "#9ee",
    wrap: "nowrap"
  },
  elementPadding: {
    padding: "15px",
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

//add students mutation query
const BATCH_ADD_STUDENTS = gql`
  mutation addStudents($studentInputs: [StudentInput!]) {
    addStudents(studentInputs: $studentInputs) {
      _id
    }
  }
`;

// initialise query to get list of all departments
const GET_DEPARTMENTS = gql`
  {
    departments {
      _id
      name
      description
    }
  }
`;

class StudentBatchAddition extends React.Component {
  constructor(props) {
    super(props);

    this.props = props;

    // store list of departments
    this.departments = [];

    // store list of data that is going to be uplaoded
    this.uploadData = [];
  }

  // called on click of valiate & upload button
  handleBatchUpload = (result, addStudents) => {
    // temporarily store datasheet values
    let rows = result;
    let disablePush = false;

    // clear upload data
    this.uploadData = [];

    // run loop for each row in the datasheet
    for (let i = 0; i < rows.length; i++) {
      let row = rows[i];

      if (row[0]) {
        // found contains the index of the dept that was found from the search
        let found = this.departments.findIndex(element => {
          return row[5].toLowerCase() === element.name.toLowerCase();
        });
        //TODO error snack in each case
        // if department is found
        if (found !== -1) {
          // check if any of the values are null
          if (!row[0] || !row[1] || !row[2] || !row[3] || !row[4]) {
            // stop the loop if there is an error in input
            alert(
              `An empty input field has been entered at row number: ${i +
                1}. Please check your input!`
            );
            disablePush = true;
            break;
          } else if (!validators.isUsername(row[0])) {
            alert(`Invalid username entered at row number: ${i + 1}`);
            disablePush = true;
            break;
          } else if (!validators.isEmail(row[1])) {
            alert(`Invalid email entered at row number: ${i + 1}`);
            disablePush = true;
            break;
          } else if (!validators.isName(row[2])) {
            alert(`Invalid name entered at row number: ${i + 1}`);
            disablePush = true;
            break;
          } else if (!validators.isPassword(row[3])) {
            alert(`Invalid password entered at row number: ${i + 1}`);
            disablePush = true;
            break;
          } else if (!validators.isPhoneNumber(row[4])) {
            alert(`Invalid phone number entered at row number: ${i + 1}`);
            disablePush = true;
            break;
          } else if (!validators.isBatch(row[6])) {
            alert(`Invalid batch entered at row number: ${i + 1}`);
            disablePush = true;
            break;
          } else {
            // gather data to be uploaded
            this.uploadData.push({
              username: rows[i][0],
              email: rows[i][1],
              name: rows[i][2],
              password: rows[i][3],
              phoneNumber: rows[i][4],
              department: this.departments[found]._id,
              batch: Number(rows[i][6])
            });
          }
        } else if (found === -1) {
          disablePush = true;
          //if department was not found while there was a valid entry, notify user
          alert(
            `You have entered an invalid department in row number: ${i + 1}. 
            Please check the department that you have entered.`
          );
          break;
        }
      }
    }

    // set variables of the mutation and call mutation
    if (!disablePush) {
      addStudents({
        variables: {
          studentInputs: this.uploadData
        }
      })
        .then(response => {
          //TODO success snack
          if (this.props.reloadStudentsList !== null) {
            this.props.reloadStudentsList();
          }
        })
        .catch(err => {
          //TODO error snack
          console.log(err);
        });
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Typography variant="subtitles" gutterBottom>
              List of valid departments:
            </Typography>
            <Query query={GET_DEPARTMENTS}>
              {({ data, loading, error }) => {
                return (
                  <Typography variant="body1">
                    {!loading
                      ? data.departments.map((department, i, array) => {
                          // add department to list of departments
                          this.departments.push(department);

                          // display the list of valid departments to admin
                          if (array.length - 1 == i) {
                            return department.name;
                          } else {
                            return department.name + ", ";
                          }
                        })
                      : ""}
                  </Typography>
                );
              }}
            </Query>
          </GridItem>
          <GridItem xs={12} sm={9} md={9} className={classes.elementPadding}>
            <Typography variant="subtitles">Format:</Typography>
            <Typography>
              username, email, name, password, phoneNumber, department, batch
            </Typography>
            <Typography variant="subtitles">Constraints:</Typography>
            <Typography>
              username: alphanumerics + underscore <br />
              name: alphabets + space <br />
              password: min 6 characters <br />
              phoneNumber: valid mobile phone number <br />
              batch: year should be below 2040 <br />
              Please ensure that there are no duplicate entries
            </Typography>
          </GridItem>
          <GridItem xs={12} sm={3} md={3} className={classes.elementPadding}>
            <Mutation mutation={BATCH_ADD_STUDENTS}>
              {addStudents => (
                <CSVReader
                  label="Add students by CSV"
                  onFileLoaded={result =>
                    this.handleBatchUpload(result, addStudents)
                  }
                  inputId="csvUpload"
                  inputStyle={{ color: "red" }}
                />
              )}
            </Mutation>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

StudentBatchAddition.propTypes = {
  classes: PropTypes.object.isRequired,
  reloadStudentsList: PropTypes.func.isRequired
};

export default withStyles(styles)(StudentBatchAddition);
