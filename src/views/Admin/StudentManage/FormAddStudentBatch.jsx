import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import DialogAlert from "../../../components/Dialog/DialogAlert";

import { Button, ExpansionPanelDetails, Typography } from "@material-ui/core";

import CSVReader from "react-csv-reader";

import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import {
  INDEX_BATCH,
  INDEX_DEPARTMENT,
  INDEX_EMAIL,
  INDEX_NAME,
  INDEX_PASSWORD,
  INDEX_PHONE,
  INDEX_USERNAME,
  validators
} from "../../../Utils";

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

  state = {
    alertOpen: false,
    alertDialog: {
      title: "",
      content: ""
    }
  };

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

      if (row[INDEX_USERNAME]) {
        // found contains the index of the dept that was found from the search
        let found = this.departments.findIndex(element => {
          return (
            row[INDEX_DEPARTMENT].toLowerCase() === element.name.toLowerCase()
          );
        });
        //TODO error snack in each case
        // if department is found
        if (found !== -1) {
          // check if any of the values are null
          if (
            !row[INDEX_USERNAME] ||
            !row[INDEX_EMAIL] ||
            !row[INDEX_NAME] ||
            !row[INDEX_PASSWORD] ||
            !row[INDEX_PHONE]
          ) {
            // stop the loop if there is an error in input
            this.alertDialog(
              "Empty Field",
              `An empty input field has been entered at row number: ${i +
                1}. Please check your input!`
            );
            disablePush = true;
            break;
          } else if (!validators.isUsername(row[INDEX_USERNAME])) {
            this.alertDialog(
              "Invalid Username",
              `Invalid username entered at row number: ${i + 1}`
            );
            disablePush = true;
            break;
          } else if (!validators.isEmail(row[INDEX_EMAIL])) {
            this.alertDialog(
              "Invalid Email",
              `Invalid email entered at row number: ${i + 1}`
            );
            disablePush = true;
            break;
          } else if (!validators.isName(row[INDEX_NAME])) {
            this.alertDialog(
              "Invalid Name",
              `Invalid name entered at row number: ${i + 1}`
            );
            disablePush = true;
            break;
          } else if (!validators.isPassword(row[INDEX_PASSWORD])) {
            this.alertDialog(
              "Invalid Password",
              `Invalid password entered at row number: ${i + 1}`
            );
            disablePush = true;
            break;
          } else if (!validators.isPhoneNumber(row[INDEX_PHONE])) {
            this.alertDialog(
              "Invalid Phone Number",
              `Invalid phone number entered at row number: ${i + 1}`
            );
            disablePush = true;
            break;
          } else if (!validators.isBatch(row[INDEX_BATCH])) {
            this.alertDialog(
              "Invalid Batch",
              `Invalid batch entered at row number: ${i + 1}`
            );
            disablePush = true;
            break;
          } else {
            // gather data to be uploaded
            this.uploadData.push({
              username: row[INDEX_USERNAME],
              email: row[INDEX_EMAIL],
              name: row[INDEX_NAME],
              password: row[INDEX_PASSWORD],
              phoneNumber: row[INDEX_PHONE],
              department: this.departments[found]._id,
              batch: Number(row[INDEX_BATCH])
            });
          }
        } else if (found === -1) {
          disablePush = true;
          //if department was not found while there was a valid entry, notify user
          this.alertDialog(
            "Invalid Department",
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

  alertDialog = (input_title, input_content) => {
    this.setState({
      alertDialog: {
        title: input_title,
        content: input_content
      },
      alertOpen: true
    });
  };

  alertDialogClose = () => {
    this.setState(() => ({ alertOpen: false }));
  };

  render() {
    const { classes } = this.props;

    const { alertOpen, alertDialog } = this.state;

    return (
      <div className={classes.root}>
        <DialogAlert
          title={alertDialog.title}
          open={alertOpen}
          content={alertDialog.content}
          onClose={this.alertDialogClose}
        />
        <ExpansionPanelDetails>
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
              <br />
              <Typography variant="subtitles">Format:</Typography>
              <Typography>
                username, email, name, password, phoneNumber, department, batch
              </Typography>
              <br />
              <Typography variant="subtitles">Constraints:</Typography>
              <Typography>
                <b>username:</b> alphanumerics + underscore <br />
                <b>name:</b> alphabets + space <br />
                <b>password:</b> min 6 characters <br />
                <b>phoneNumber:</b> Valid mobile phone number <br />
                <b>batch:</b> Year should be below 2040 <br />
                <b>Please ensure that there are no duplicate entries</b>
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
        </ExpansionPanelDetails>
      </div>
    );
  }
}

StudentBatchAddition.propTypes = {
  classes: PropTypes.object.isRequired,
  reloadStudentsList: PropTypes.func.isRequired
};

export default withStyles(styles)(StudentBatchAddition);
