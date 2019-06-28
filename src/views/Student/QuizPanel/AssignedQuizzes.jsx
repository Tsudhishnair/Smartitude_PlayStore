import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import { CircularProgress } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Card from "components/Card/Card.jsx";
import CardHeader from "../../../components/Card/CardHeader";
import CardBody from "../../../components/Card/CardBody";

import MUIDataTable from "mui-datatables";

import { Query } from "react-apollo";
import gql from "graphql-tag";

import { ASSIGNED_QUIZ_CONSTANT, transformDateString } from "../../../Utils";
import { Redirect } from "react-router-dom";

const styles = theme => ({
  root: {
    display: "block",
    justifyContent: "center",
    alignItems: "center"
  },
  textGrey: {
    color: "grey"
  },
  textDarkGrey: {
    color: "#696969"
  },
  progress: {
    margin: theme.spacing.unit * 10,
    marginTop: "10%",
    marginLeft: "45%"
  }
});

const columns = [
  {
    name: "QuizName",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "Expiry",
    options: {
      filter: false,
      sort: true,
      sortDirection: "desc"
    }
  }
];

const ADMIN_QUIZZES_BATCH = gql`
  {
    adminQuizzesBatch {
      _id
      name
      description
      instructions
      sections {
        category {
          _id
          name
        }
        timeLimit
        questions {
          _id
          question
          options
          correctOption
          solution
        }
        markPerQuestion
        negativeMarkPerQuestion
      }
      active
      activeTo
    }
  }
`;

class AssignedQuizzes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirecter: false,
      value: "option"
    };

    this.quizList;

    this.options = {
      filterType: "checkbox",
      rowsPerPage: 20,
      elevation: 0,
      print: false,
      download: false,
      responsive: "scroll",
      pagination: false,
      filter: false,
      viewColumns: false,
      selectableRows: false,
      rowsPerPageOptions: [20, 30, 100, 200],
      onRowClick: (rowData, rowState) => {
        if (!this.rowSelected) {
          this.handleRowClick(rowState.dataIndex);
        }
      }
    };
  }

  handleRowClick = clickedIndex => {
    this.clickedQuiz = this.quizList[clickedIndex];

    this.quizType = {
      quizType: ASSIGNED_QUIZ_CONSTANT
    };

    this.setState(() => ({
      redirecter: true
    }));
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { classes } = this.props;

    if (this.state.redirecter === true) {
      return (
        <Redirect
          push
          to={{
            pathname: "/student/start_quiz",
            state: {
              ...this.quizType,
              ...this.clickedQuiz
            }
          }}
        />
      );
    }

    return (
      <div className={classes.root}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <form>
                <CardHeader className={classes.root} color="danger">
                  <h4 className={classes.cardTitleWhite}>Assigned Quizzes</h4>
                </CardHeader>
                <CardBody>
                  <Query query={ADMIN_QUIZZES_BATCH}>
                    {({ data, loading, error }) => {
                      if (loading) {
                        return (
                          <CircularProgress className={classes.progress} />
                        );
                      } else if (error) {
                        return "Error occured";
                      } else {
                        let quizList;
                        quizList = data.adminQuizzesBatch.map(quiz => {
                          let quizData = [];
                          quizData.push(quiz.name);

                          quizData.push(transformDateString(quiz.activeTo));
                          return quizData;
                        });

                        this.quizList = data.adminQuizzesBatch;
                        console.log(this.quizList);
                        return (
                          <MUIDataTable
                            title={""}
                            data={quizList}
                            columns={columns}
                            options={this.options}
                          />
                        );
                      }
                    }}
                  </Query>
                </CardBody>
              </form>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

AssignedQuizzes.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AssignedQuizzes);
