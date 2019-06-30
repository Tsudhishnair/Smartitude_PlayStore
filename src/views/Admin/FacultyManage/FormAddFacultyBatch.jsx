import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import "react-datasheet/lib/react-datasheet.css";

import { Button, Typography, ExpansionPanelDetails } from "@material-ui/core";

import CSVReader from "react-csv-reader";

import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import {
  INDEX_CATEGORY,
  INDEX_DEPARTMENT,
  INDEX_EMAIL,
  INDEX_INCHARGE,
  INDEX_INCHARGE_LIST,
  INDEX_NAME,
  INDEX_PASSWORD,
  INDEX_PHONE,
  INDEX_SUBCATEGORY,
  INDEX_USERNAME,
  transformYesOrNo,
  validators
} from "../../../Utils";
import DialogAlert from "../../../components/Dialog/DialogAlert";
import CustomSnackbar from "../../../components/Snackbar/CustomSnackbar";

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

    //store list of categories
    this.categories = [];

    // store list of data that is going to be uplaoded
    this.uploadData = [];
  }

  state = {
    alertOpen: false,
    alertDialog: {
      title: "",
      content: ""
    },
    snackbar: {
      open: false,
      variant: "error",
      message: ""
    }
  };

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

      //check if there is actually any input in a row before giving error messages or proceeding with calculation. This helps remove unnecessary errors as CSVReader sometimes returns empty rows
      if (
        row[INDEX_USERNAME] ||
        row[INDEX_EMAIL] ||
        row[INDEX_NAME] ||
        row[INDEX_PASSWORD] ||
        row[INDEX_PHONE] ||
        row[INDEX_DEPARTMENT] ||
        row[INDEX_CATEGORY] ||
        row[INDEX_SUBCATEGORY] ||
        row[INDEX_INCHARGE]
      ) {
        // check if any of the values are null
        if (
          !row[INDEX_USERNAME] ||
          !row[INDEX_EMAIL] ||
          !row[INDEX_NAME] ||
          !row[INDEX_PASSWORD] ||
          !row[INDEX_PHONE] ||
          !row[INDEX_DEPARTMENT] ||
          !row[INDEX_CATEGORY] ||
          !row[INDEX_SUBCATEGORY] ||
          !row[INDEX_INCHARGE]
        ) {
          // stop the loop if there is an error in input
          this.alertDialog(
            "Invalid Input Field",
            `A mandatory input field has been left empty at row number: ${i +
              1}. Please check your input!`
          );
          disablePush = true;
          break;
        } else {
          // deptIndex contains the index of the dept that was found from the search
          let deptIndex = this.departments.findIndex(department => {
            return (
              row[INDEX_DEPARTMENT].trim().toLowerCase() ===
              department.name.trim().toLowerCase()
            );
          });

          //initialise lists to store ids of subcategory & inChargeSubcategories
          let subcategoryIdList = [];
          let inChargeIdList = [];

          //if dept was not found, disable mutation and stop loop
          if (deptIndex === -1) {
            this.alertDialog(
              "Invalid Department",
              `Invalid department entered at row number: ${i + 1}`
            );
            disablePush = true;
            break;
          }

          //find index position of category
          let categoryIndex = this.categories.findIndex(category => {
            return (
              row[INDEX_CATEGORY].toLowerCase() ===
              category.category.name.toLowerCase()
            );
          });

          //if category not found
          if (categoryIndex === -1) {
            this.alertDialog(
              "Invalid Category",
              `Invalid category entered at row number: ${i + 1}`
            );
            disablePush = true;
            break;
          } else {
            //find index position of subcategory and create id list
            let subcategoryList = row[INDEX_SUBCATEGORY].split(",");
            let j = 0;
            while (j < subcategoryList.length) {
              let indexPosn = this.categories[
                categoryIndex
              ].subcategory.findIndex(item => {
                return (
                  subcategoryList[j].trim().toLowerCase() ===
                  item.name.trim().toLowerCase()
                );
              });
              //if subcategory was found, push its id onto the list
              if (indexPosn !== -1) {
                subcategoryIdList.push(
                  this.categories[categoryIndex].subcategory[indexPosn]._id
                );
              } else {
                this.alertDialog(
                  "Invalid Subcategory",
                  `Invalid subcategory entered at row number: ${i + 1}`
                );
                disablePush = true;
                break;
              }
              j++;
            }

            //if disablePush is true, it is evident that an invalid subcategory was entered, break is used here as the previous break statement can only break its respective while loop. This break is used to stop execution of for loop
            if (disablePush) {
              break;
            }

            //find index position and create id list of incharge
            if (transformYesOrNo(row[INDEX_INCHARGE])) {
              let inChargeList = row[INDEX_INCHARGE_LIST].split(",");
              let j = 0;
              while (j < inChargeList.length) {
                let indexPosn = this.categories[
                  categoryIndex
                ].subcategory.findIndex(item => {
                  return (
                    inChargeList[j].trim().toLowerCase() ===
                    item.name.trim().toLowerCase()
                  );
                });
                //if incharge category was found, push it onto the list
                if (indexPosn !== -1) {
                  inChargeIdList.push(
                    this.categories[categoryIndex].subcategory[indexPosn]._id
                  );
                } else {
                  this.alertDialog(
                    "Invalid Incharge Subcategory",
                    `Invalid incharge subcategory entered at row number: ${i +
                      1}`
                  );
                  disablePush = true;
                  break;
                }
                j++;
              }
              //if disablePush is true, it is evident that an invalid subcategory was entered for incharge, break is used here as the previous break statement can only break its respective while loop. This break is used to stop execution of for loop
              if (disablePush) {
                break;
              }
            }
          }

          //validate all entries
          if (!validators.isUsername(row[INDEX_USERNAME])) {
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
          } else if (!validators.isYesOrNo(row[INDEX_INCHARGE])) {
            this.alertDialog(
              "In-charge Invalid",
              `Enter yes/no at row number: ${i +
                1} to indicate if user is in charge or not`
            );
            disablePush = true;
            break;
          } else {
            // gather data to be uploaded and push onto list if all conditions satisfy
            this.uploadData.push({
              username: row[INDEX_USERNAME],
              email: row[INDEX_EMAIL],
              name: row[INDEX_NAME],
              password: row[INDEX_PASSWORD],
              phoneNumber: row[INDEX_PHONE],
              department: this.departments[deptIndex]._id,
              category: this.categories[categoryIndex].category._id,
              subcategory: subcategoryIdList,
              isInCharge: transformYesOrNo(row[INDEX_INCHARGE]),
              inChargeSubcategories: inChargeIdList
            });
          }
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
          this.setState(
            {
              loading: false,
              snackbar: {
                ...this.state.snackbar,
                variant: "success",
                message: "Faculties Added Successfully!"
              }
            },
            () => {
              this.openSnackbar();
            }
          );
        })
        .catch(err => {
          console.log(err);
          if (this.props.reloadFacultiesList !== null) {
            this.props.reloadFacultiesList();
          }
          this.setState(
            {
              loading: false,
              snackbar: {
                ...this.state.snackbar,
                variant: "error",
                message: "Student Batch Additions Failed!" + err.message
              }
            },
            () => {
              this.openSnackbar();
            }
          );
        });
    }
  };
  // handle alert dialog
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

  // open snackbar
  openSnackbar = () => {
    this.setState({
      snackbar: {
        ...this.state.snackbar,
        open: true
      }
    });
  };

  // close snackbar by changing open state
  closeSnackbar = () => {
    this.setState({
      snackbar: {
        ...this.state.snackbar,
        open: false
      }
    });
  };

  render() {
    const { classes } = this.props;
    const { alertOpen, alertDialog, snackbar } = this.state;

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
              <br />
              <Typography variant="subtitles">Valid Categories:</Typography>
              <Typography variant="body1">
                {this.props.categoryDetails.map((categoryDetail, i, array) => {
                  this.categories.push(categoryDetail);

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
              <br />
              <Typography variant="subtitles">Format:</Typography>
              <Typography variant="body1">
                username, email, name, password, phoneNumber, department,
                category, subcategories, incharge, incharge subcategories
              </Typography>
            <br/>
              <Typography variant="subtitles">Constraints:</Typography>
              <Typography variant="body1">
                <b>username:</b> alphanumerics + underscore <br />
                <b>name:</b> alphabets + space <br />
                <b>password:</b> min 6 characters <br />
                <b>phoneNumber:</b> valid mobile phone number <br />
                <b>incharge:</b> yes or no <br />
                <b>
                  All fields are mandatory except incharge subcategories. Please
                  ensure that there are no duplicate entries
                </b>
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
        </ExpansionPanelDetails>
        <CustomSnackbar
          onClose={this.closeSnackbar}
          variant={snackbar.variant}
          open={snackbar.open}
          message={snackbar.message}
        />
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
