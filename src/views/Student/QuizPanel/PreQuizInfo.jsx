import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import {
  Card,
  Button,
  CardContent,
  Typography,
  Divider,
  CircularProgress,
  Snackbar
} from "@material-ui/core";
import CardFooter from "../../../components/Card/CardFooter";
import CardBody from "../../../components/Card/CardBody";
import Spacing from "../../../components/Spacing/Spacing";

import { Redirect } from "react-router-dom";

import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import green from "@material-ui/core/colors/green";
import CustomSnackbar from "../../../components/Snackbar/CustomSnackbar";

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
  wrapper: {
    margin: theme.spacing.unit,
    position: "relative"
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});

const START_QUIZ = gql`
  mutation startQuiz($quizId: ID!) {
    startQuiz(quizId: $quizId) {
      _id
    }
  }
`;

class PreQuizInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "option",
      redirecter: false,
      loading: false,
      snackbar: {
        open: false
      },
      error: {
        message: ""
      }
    };

    this.quiz = this.props.location.state;
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  transformInstructions = instructions => {
    let instructionString = "";

    let breakObject = <br />;
    let instructionObject = [];

    let i = 0;
    while (i < instructions.length) {
      instructionString = `${i + 1}. ${instructions[i]}`;
      instructionObject.push(instructionString);
      instructionObject.push(breakObject);
      i++;
    }

    return instructionObject;
  };

  openSnackbar = () => {
    this.setState({
      snackbar: {
        ...this.state.snackbar,
        open: true
      }
    });
  };

  closeSnackbar = () => {
    this.setState({
      snackbar: {
        ...this.state.snackbar,
        open: false
      }
    });
  };

  transformTimeLimit = sections => {
    let totalTimeLimit = 0;
    let i = 0;

    while (i < sections.length) {
      totalTimeLimit += sections[i].timeLimit;
      i++;
    }

    return totalTimeLimit;
  };

  getNumberOfSections = sections => {
    return sections.length;
  };

  getTotalNumberOfQns = sections => {
    let totalQns = 0;

    let i = 0;
    while (i < sections.length) {
      totalQns += sections[i].questions.length;
      i++;
    }

    return totalQns;
  };

  startQuiz = (startQuizMutation, id, event) => {
    event.preventDefault();
    this.setState({ ...this.state, loading: true });
    startQuizMutation({
      variables: {
        quizId: id
      }
    })
      .then(res => {
        console.log(res);
        this.quiz._id = res.data.startQuiz._id;

        this.setState(() => ({ redirecter: true }));
      })
      .catch(err => {
        console.log(err);
        this.setState({
          error: {
            message: err.graphQLErrors[0]
              ? err.graphQLErrors[0].message
              : err.networkError
          }
        });

        this.openSnackbar();
      })
      .finally(() => {
        this.setState({ ...this.state, loading: false });
      });
  };

  render() {
    const { classes } = this.props;
    const { loading, snackbar, error } = this.state;

    if (!this.quiz) {
      return <Redirect to="/student/dashboard" />;
    }

    if (this.state.redirecter) {
      return (
        <Redirect
          to={{
            pathname: "/student/quiz",
            state: {
              ...this.quiz,
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
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {this.quiz.name}
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                    className={classes.textGrey}
                  >
                    {this.getTotalNumberOfQns(this.quiz.sections)} Questions |{" "}
                    {this.transformTimeLimit(this.quiz.sections)} Minutes |{" "}
                    {this.getNumberOfSections(this.quiz.sections)} sections
                  </Typography>
                  <Typography variant="body2">
                    {this.quiz.description}
                  </Typography>
                  <Spacing />
                  <Typography variant="h6" gutterBottom>
                    Instructions:
                  </Typography>
                  <Typography
                    variant="body2"
                    gutterBottom
                    className={classes.textDarkGrey}
                  >
                    {this.transformInstructions(this.quiz.instructions)}
                  </Typography>
                </CardContent>
                <CardBody>
                  <Typography variant="h6" gutterBottom>
                    Note:
                  </Typography>
                  <Typography
                    variant="body2"
                    gutterBottom
                    className={classes.textDarkGrey}
                  >
                    Click the “Finish Quiz” button given in bottom of this page
                    to submit your answer.
                    <br />
                    Test will be submitted automatically if the time expires.
                    <br />
                    Don’t refresh the page.
                    <br />
                    When you are ready, click <b>Start Quiz</b> to start the
                    quiz.
                  </Typography>
                </CardBody>
                <Divider />
                <CardFooter
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Mutation mutation={START_QUIZ}>
                    {startQuiz => (
                      <div className={classes.wrapper}>
                        <Button
                          variant="outlined"
                          color="primary"
                          size={"large"}
                          style={{ float: "center" }}
                          type={"submit"}
                          disabled={loading}
                          className={classes.button}
                          onClick={event =>
                            this.startQuiz(startQuiz, this.quiz._id, event)
                          }
                        >
                          Start Quiz
                        </Button>
                        {loading && (
                          <CircularProgress
                            size={26}
                            className={classes.buttonProgress}
                          />
                        )}
                      </div>
                    )}
                  </Mutation>
                </CardFooter>
              </form>
            </Card>
          </GridItem>
        </GridContainer>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={snackbar.open}
          autoHideDuration={6000}
        >
          <CustomSnackbar
            onClose={this.closeSnackbar}
            variant="error"
            message={error.message}
          />
        </Snackbar>
      </div>
    );
  }
}

PreQuizInfo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PreQuizInfo);
