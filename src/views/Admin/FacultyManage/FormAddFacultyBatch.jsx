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
import { transformYesOrNo, validators } from "../../../Utils";

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
        // deptIndex contains the index of the dept that was found from the search
        let deptIndex = this.departments.findIndex(department => {
          return row[5].toLowerCase() === department.name.toLowerCase();
        });

        //find index position of category
        let categoryIndex = this.categories.findIndex(category => {
          return row[6].toLowerCase() === category.category.name.toLowerCase();
        });

        //find index position of subcategory and create id list
        let subcategoryList = row[7].split(",");
        let subcategoryIdList = [];
        let i = 0;
        while (i < subcategoryList.length) {
          let indexPosn = this.categories[categoryIndex].subcategory.findIndex(
            item => {
              return (
                subcategoryList[i].trim().toLowerCase() ===
                item.name.trim().toLowerCase()
              );
            }
          );
          if (indexPosn !== -1) {
            subcategoryIdList.push(
              this.categories[categoryIndex].subcategory[indexPosn]._id
            );
          } else {
            disablePush = true;
            break;
          }
          i++;
        }

        //find index position and create id list of incharge
        let inChargeIdList = [];
        if (transformYesOrNo(row[8])) {
          let inChargeList = row[9].split(",");
          let i = 0;
          while (i < inChargeList.length) {
            let indexPosn = this.categories[
              categoryIndex
            ].subcategory.findIndex(item => {
              return (
                inChargeList[i].trim().toLowerCase() ===
                item.name.trim().toLowerCase()
              );
            });
            if (indexPosn !== -1) {
              inChargeIdList.push(
                this.categories[categoryIndex].subcategory[indexPosn]._id
              );
            } else {
              disablePush = true;
              break;
            }
            i++;
          }
        }

        // if department is found
        if (deptIndex !== -1) {
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
          } else if (!validators.isYesOrNo(row[8])) {
            alert(
              `Enter yes/no at row number: ${i +
                1} to indicate if user is in charge or not`
            );
            disablePush = true;
            break;
          } else {
            // gather data to be uploaded
            this.uploadData.push({
              username: row[0],
              email: row[1],
              name: row[2],
              password: row[3],
              phoneNumber: row[4],
              department: this.departments[deptIndex]._id,
              category: this.categories[categoryIndex].category._id,
              subcategory: subcategoryIdList,
              isInCharge: transformYesOrNo(row[8]),
              inChargeSubcategories: inChargeIdList
            });
          }
        } else if (deptIndex === -1) {
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
      console.log("success");
      console.log(this.uploadData);
      // addFaculties({
      //   variables: {
      //     facultyInputs: this.uploadData
      //   }
      // })
      //   .then(response => {
      //     console.log(response);
      //     if (this.props.reloadFacultiesList !== null) {
      //       this.props.reloadFacultiesList();
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err);
      //     if (this.props.reloadFacultiesList !== null) {
      //       this.props.reloadFacultiesList();
      //     }
      //   });
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
              incharge: yes or no <br />
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
