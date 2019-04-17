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
  List,
  ListItem
} from "@material-ui/core";
import CardFooter from "../../../components/Card/CardFooter";
import CardBody from "../../../components/Card/CardBody";
import Spacing from "../../../components/Spacing/Spacing";
import Link from "react-router-dom/es/Link";
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
  }
});

class PreQuizInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "option"
    };
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

  render() {
    const { classes } = this.props;
    const quiz = this.props.location.state;

    if (!quiz) {
      return <Redirect to="/student/dashboard" />;
    }

    return (
      <div className={classes.root}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <form>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {quiz.name}
                  </Typography>
                  <Typography variant="body2">{quiz.description}</Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                    className={classes.textGrey}
                  >
                    {this.getTotalNumberOfQns(quiz.sections)} Questions |{" "}
                    {this.transformTimeLimit(quiz.sections)} Minutes |{" "}
                    {this.getNumberOfSections(quiz.sections)} sections
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
                    {this.transformInstructions(quiz.instructions)}
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
                  <Link
                    to={{
                      pathname: "/student/quiz",
                      state: {
                        ...quiz
                      }
                    }}
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      size={"large"}
                      style={{ float: "center" }}
                      type={"submit"}
                      className={classes.button}
                    >
                      Start Quiz
                    </Button>
                  </Link>
                </CardFooter>
              </form>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

PreQuizInfo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PreQuizInfo);
