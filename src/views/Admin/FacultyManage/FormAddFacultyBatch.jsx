import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import ReactDataSheet from "react-datasheet";
import "react-datasheet/lib/react-datasheet.css";

import { Button, Typography } from "../../../../node_modules/@material-ui/core";

import { Query } from "react-apollo";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

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
  // TODO: duplicate ????
  formControl: {
    margin: theme.spacing.unit * 2,
    minWidth: 120
  },
  button: {
    margin: theme.spacing.unit * 4
  }
});

//add students mutation query
const BATCH_ADD_FACULTIES = gql`
  mutation addStudents($facultyInputs: [FacultyInput!]) {
    addFaculties(facultyInputs: $facultyInputs) {
      _id
    }
  }
`;

class FacultyBatchAddition extends React.Component {
  constructor(props) {
    super(props);

    this.props = props;

    // store data from datasheet
    this.state = {
      grid: [
        [
          { value: "username", readOnly: true },
          { value: "email", readOnly: true },
          { value: "name", readOnly: true },
          { value: "password", readOnly: true },
          { value: "phoneNumber", readOnly: true },
          { value: "department", readOnly: true }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" }
        ]
      ]
    };

    // store list of departments
    this.departments = [];

    // store list of data that is going to be uplaoded
    this.uploadData = [];
  }

  // called on click of valiate & upload button
  handleClick = (addFaculties, e) => {
    // temporarily store datasheet values
    let rows = this.state.grid;
    const rowsLength = rows.length;
    let disablePush = false;
    // clear upload data
    this.uploadData = [];

    // run loop for each row in the datasheet
    for (let i = 1; i < rowsLength; i++) {
      // found contains the index of the dept that was found from the search
      let found = this.departments.findIndex(element => {
        return rows[i][5].value === element.name;
      });

      // if department is found
      if (found !== -1) {
        // check if any of the values are null
        if (
          !rows[i][0].value ||
          !rows[i][1].value ||
          !rows[i][2].value ||
          !rows[i][3].value ||
          !rows[i][4].value
        ) {
          // stop the loop if there is an error in input
          alert(
            `Faculty could not be validated at row number: ${i}. Please check your input!`
          );
          disablePush = true;
        }

        // gather data to be uploaded
        this.uploadData.push({
          username: rows[i][0].value,
          email: rows[i][1].value,
          name: rows[i][2].value,
          password: rows[i][3].value,
          phoneNumber: rows[i][4].value,
          department: this.departments[found]._id
        });
      } else if (found === -1 && !!rows[i][0].value) {
        //if department was not found while there was a valid entry, notify user
        alert(
          `You have entered an invalid department in row number ${i}. Please check the departments that you have entered and make that entry separately`
        );
      }
    }

    // set variables of the mutation and call mutation
    if (!disablePush) {
      addFaculties({
        variables: {
          facultyInputs: this.uploadData
        }
      })
        .then(response => console.log(response))
        .catch(err => console.log(err));
    }
  };

  render() {
    const { classes } = this.props;

    // initialise query to get list of all departments
    const deptList = gql`
      {
        departments {
          _id
          name
          description
        }
      }
    `;

    return (
      <div className={classes.root}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Typography variant="subtitles" gutterBottom>
              List of valid departments:
            </Typography>
            <Query query={deptList}>
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
            <ReactDataSheet
              data={this.state.grid}
              valueRenderer={cell => cell.value}
              overflow="wrap"
              fullwidth
              onCellsChanged={changes => {
                const grid = this.state.grid.map(row => [...row]);
                changes.forEach(({ cell, row, col, value }) => {
                  grid[row][col] = { ...grid[row][col], value };
                });
                this.setState({ grid });
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={3} md={3} className={classes.elementPadding}>
            <Mutation mutation={BATCH_ADD_FACULTIES}>
              {addFaculties => (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={e => this.handleClick(addFaculties, e)}
                >
                  Validate & Upload
                </Button>
              )}
            </Mutation>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

FacultyBatchAddition.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FacultyBatchAddition);
