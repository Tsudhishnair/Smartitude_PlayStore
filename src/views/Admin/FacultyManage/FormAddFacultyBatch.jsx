import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import "react-datasheet/lib/react-datasheet.css";

import { Button, Typography } from "../../../../node_modules/@material-ui/core";

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
const BATCH_ADD_FACULTIES = gql`
  mutation addFaculties($facultyInputs: [FacultyInput!]) {
    addFaculties(facultyInputs: $facultyInputs) {
      _id
    }
  }
`;

class FacultyBatchAddition extends React.Component {
  constructor(props) {
    super(props);

    this.props = props;

    // store list of departments
    this.departments = [];

    // store list of data that is going to be uplaoded
    this.uploadData = [];
  }

  // called on click of valiate & upload button
  handleBatchUpload = (result, addFaculties) => {
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
              username: rows[i][0].value,
              email: rows[i][1].value,
              name: rows[i][2].value,
              password: rows[i][3].value,
              phoneNumber: rows[i][4].value,
              department: this.departments[found]._id
            });
          }
        } else if (found === -1) {
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
      addFaculties({
        variables: {
          facultyInputs: this.uploadData
        }
      })
        .then(response => {
          console.log(response);
          if (this.props.reloadFacultiesList !== null) {
            this.props.reloadFacultiesList();
          }
        })
        .catch(err => {
          console.log(err);
          if (this.props.reloadFacultiesList !== null) {
            this.props.reloadFacultiesList();
          }
        });
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={9}>
            <Typography variant="subtitles" gutterBottom>
              List of valid departments:
            </Typography>
            <Typography variant="body1">
              {this.props.departments.map((department, i, array) => {
                // add department to list of departments
                this.departments.push(department);

                // display the list of valid departments to admin
                if (array.length - 1 == i) {
                  return department.name;
                } else {
                  return department.name + ", ";
                }
              })}
            </Typography>
            <Typography variant="subtitles">Valid categories:</Typography>
            <Typography variant="body1">
              {this.props.categoryDetails.map((categoryDetail, i, array) => {
                this.subcategories = this.props.categoryDetails[
                  i
                ].subcategory.map(subcategory => {
                  return subcategory.name;
                });

                return (
                  <div>
                    {categoryDetail.category.name +
                      ": " +
                      this.subcategories.toString()}
                  </div>
                );
              })}
            </Typography>
            <Typography variant="subtitles">Format:</Typography>
            <Typography>
              username, email, name, password, phoneNumber, department,
              category, subcategories, incharge, incharge subcategories
            </Typography>
            <Typography variant="subtitles">Constraints:</Typography>
            <Typography variant="body1">
              username: alphanumerics + underscore <br />
              name: alphabets + space <br />
              password: min 6 characters <br />
              phoneNumber: valid mobile phone number <br />
              Please ensure that there are no duplicate entries
            </Typography>
          </GridItem>
          <GridItem xs={12} sm={3} md={3} className={classes.elementPadding}>
            <Mutation mutation={BATCH_ADD_FACULTIES}>
              {addFaculties => (
                <CSVReader
                  label="Add faculties by CSV"
                  onFileLoaded={result =>
                    this.handleBatchUpload(result, addFaculties)
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

FacultyBatchAddition.propTypes = {
  classes: PropTypes.object.isRequired,
  reloadFacultiesList: PropTypes.func.isRequired,
  departments: PropTypes.object,
  categoryDetails: PropTypes.object
};

export default withStyles(styles)(FacultyBatchAddition);
