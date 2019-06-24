import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Typography
} from "@material-ui/core";

import { Timeline, Timer, TrendingDown, TrendingUp } from "@material-ui/icons";

import Spacing from "../../../components/Spacing/Spacing";
import CardFooter from "../../../components/Card/CardFooter";
import CardBody from "../../../components/Card/CardBody";

import { blue, green, red } from "@material-ui/core/colors";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Latex from "../../General/Latex";

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 1,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.down("sm")]: {
      margin: 0
    }
  },
  title: {
    textAlign: "center",
    fontWeight: "600",
    color: blue[600]
  },
  subtitle: {
    textAlign: "center"
  },
  timer: {
    color: "green"
  },
  formControl: {
    margin: theme.spacing.unit * 1,
    marginLeft: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  },
  fab: {
    margin: theme.spacing.unit,
    elevation: 0,
    boxShadow: "none"
  },
  button: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },

  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  avatar: {
    backgroundColor: red[500]
  },
  headerAvatar: {
    backgroundColor: red[500],
    margin: 10,
    width: 55,
    height: 55,
    float: "left"
  },
  descText: {
    color: red[500]
  },
  sectionCard: {
    marginTop: theme.spacing.unit * 6,
    marginBottom: theme.spacing.unit * 1
  },
  questionCard: {
    marginTop: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 1
  },
  markedInfo: {
    marginTop: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 1,
    float: "right"
  },
  radioPrimary: {
    color: green[600],
    "&$checked": {
      color: green[500]
    }
  },
  radioCorrect: {
    color: blue[600],
    "&$blueChecked": {
      color: blue[500]
    }
  },
  checked: {},
  blueChecked: {}
});

class QuizAnswer extends React.Component {
  constructor(props) {
    super(props);

    //save data received in props
    this.data = this.props.location.state;
    console.log(this.data);

    this.quizScore = this.getQuizScore();
    this.totalQuizScore = this.getTotalQuizScore();
    this.percentage = this.calculatePercentage();
  }

  //jsx for header
  renderHeader = () => {
    const { classes } = this.props;
    return (
      <fragment>
        <Card>
          <CardContent>
            <Typography variant={"h4"} className={classes.title}>
              Quiz Completed!
            </Typography>
            <Typography variant={"h6"} className={classes.subtitle}>
              Score Card
            </Typography>
          </CardContent>
          <CardBody>
            <GridContainer justify="center">
              <GridItem xs={12} sm={3} md={3} justify="center">
                <div justify={"center"}>
                  <Avatar aria-label="Icon" className={classes.headerAvatar}>
                    <TrendingUp />
                  </Avatar>
                  <p>
                    <Typography variant={"overline"}>Score:</Typography>
                    <Typography variant={"h5"} className={classes.descText}>
                      {this.quizScore}/{this.totalQuizScore}
                    </Typography>
                  </p>
                </div>
              </GridItem>
              <GridItem xs={12} sm={3} md={3}>
                <div justify={"center"}>
                  <Avatar aria-label="Icon" className={classes.headerAvatar}>
                    <TrendingDown />
                  </Avatar>
                  <p>
                    <Typography variant={"overline"}>
                      Negative Marks:
                    </Typography>
                    <Typography variant={"h5"} className={classes.descText}>
                      {this.getTotalNegativeMarks()}
                    </Typography>
                  </p>
                </div>
              </GridItem>
              <GridItem xs={12} sm={3} md={3}>
                <div justify={"center"}>
                  <Avatar aria-label="Icon" className={classes.headerAvatar}>
                    <Timer />
                  </Avatar>
                  <p>
                    <Typography variant={"overline"}>Time Taken:</Typography>
                    {this.data.quizType === 3 ? (
                      <Typography variant={"h5"} className={classes.descText}>
                        {this.calculateTimeTaken()} Mins
                      </Typography>
                    ) : (
                      <Typography variant={"h5"} className={classes.descText}>
                        {this.calculateTimeTaken()}/{this.getTotalTimeLimit()}{" "}
                        Mins
                      </Typography>
                    )}
                  </p>
                </div>
              </GridItem>
              <GridItem xs={12} sm={3} md={3}>
                <div justify={"center"}>
                  <Avatar aria-label="Icon" className={classes.headerAvatar}>
                    <Timeline />
                  </Avatar>
                  <p>
                    <Typography variant={"overline"}>Percentage:</Typography>
                    <Typography variant={"h5"} className={classes.descText}>
                      {this.percentage}
                    </Typography>
                  </p>
                </div>
              </GridItem>
            </GridContainer>
          </CardBody>
          <CardFooter />
        </Card>
        <Card className={classes.questionCard}>
          <CardContent>
            <Typography>Option Chart</Typography>
            <GridContainer>
              <GridItem xs={12} sm={4} md={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={true}
                      value="checkedB"
                      classes={{
                        root: classes.radioPrimary,
                        checked: classes.checked
                      }}
                    />
                  }
                  label="Correct & Marked Option"
                />
              </GridItem>
              <GridItem xs={12} sm={4} md={4}>
                <FormControlLabel
                  control={<Checkbox checked={true} value="checkedB" />}
                  label="Marked Wrong Answer"
                />
              </GridItem>
              <GridItem xs={12} sm={4} md={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={false}
                      value="checkedB"
                      classes={{
                        root: classes.radioPrimary,
                        checked: classes.checked
                      }}
                    />
                  }
                  label="Unmarked Correct Answer"
                />
              </GridItem>
            </GridContainer>
          </CardContent>
        </Card>
      </fragment>
    );
  };

  renderCheckbox = (sectionIndex, questionIndex, optionIndex, classes) => {
    if (
      this.data.sections[sectionIndex].questions[questionIndex]
        .correctOption ===
        this.data.attemptedSections[sectionIndex].attemptedQuestions[
          questionIndex
        ].markedOption &&
      this.data.sections[sectionIndex].questions[questionIndex]
        .correctOption === optionIndex
    ) {
      return (
        <Checkbox
          value={optionIndex}
          checked={true}
          disabled={false}
          classes={{
            root: classes.radioPrimary,
            checked: classes.checked
          }}
        />
      );
    } else if (
      optionIndex ===
      this.data.sections[sectionIndex].questions[questionIndex].correctOption
    ) {
      return (
        <Checkbox
          value={optionIndex}
          checked={false}
          disabled={false}
          classes={{
            root: classes.radioPrimary,
            checked: classes.checked
          }}
        />
      );
    } else if (
      optionIndex ===
      this.data.attemptedSections[sectionIndex].attemptedQuestions[
        questionIndex
      ].markedOption
    ) {
      return <Checkbox value={optionIndex} disabled={false} checked={true} />;
    } else {
      return <Checkbox value={optionIndex} disabled={true} checked={false} />;
    }
  };

  //create jsx for a single question
  createQuestionPiece = (sectionIndex, questionIndex, classes) => {
    const question = this.data.sections[sectionIndex].questions[questionIndex];

    return (
      <Card className={classes.questionCard}>
        <form>
          <CardContent>
            <Typography>
              Question Number: <b>{questionIndex + 1}</b>
            </Typography>
            <Latex text={question.question}/>
          </CardContent>
          <Divider />
          <CardBody>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Marked Choice</FormLabel>
              <FormGroup
                aria-label="options"
                name="option"
                className={classes.group}
              >
                <FormControlLabel
                  control={this.renderCheckbox(
                    sectionIndex,
                    questionIndex,
                    1,
                    classes
                  )}
                  label={<Latex text={question.options[0]}/>}
                />
                <FormControlLabel
                  control={this.renderCheckbox(
                    sectionIndex,
                    questionIndex,
                    2,
                    classes
                  )}
                  label={<Latex text={question.options[1]}/>}
                />
                <FormControlLabel
                  control={this.renderCheckbox(
                    sectionIndex,
                    questionIndex,
                    3,
                    classes
                  )}
                  label={<Latex text={question.options[2]}/>}
                />
                <FormControlLabel
                  control={this.renderCheckbox(
                    sectionIndex,
                    questionIndex,
                    4,
                    classes
                  )}
                  label={<Latex text={question.options[3]}/>}
                />
              </FormGroup>
            </FormControl>
          </CardBody>
        </form>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              View Detailed Answer
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>
              <Latex text={question.solution}/>
              <p>
                Correct Option: <b>{question.correctOption}</b>
              </p>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Card>
    );
  };

  //getting questions
  renderQuestions = classes => {
    let rowCounter = 0,
      columnCounter = 0;

    let container = [];

    while (rowCounter < this.data.sections.length) {
      container.push(
        this.createSectionHeader(
          rowCounter + 1,
          this.data.sections[rowCounter].questions.length,
          rowCounter
        )
      );

      columnCounter = 0;
      while (columnCounter < this.data.sections[rowCounter].questions.length) {
        container.push(
          this.createQuestionPiece(rowCounter, columnCounter, classes)
        );
        columnCounter++;
      }
      rowCounter++;
    }

    return (
      <React.Fragment>
        <Spacing />
        {container}
      </React.Fragment>
    );
  };

  isCorrectlyMarked = (sectionCounter, questionCounter) => {
    return (
      this.data.sections[sectionCounter].questions[questionCounter]
        .correctOption ===
      this.data.attemptedSections[sectionCounter].attemptedQuestions[
        questionCounter
      ].markedOption
    );
  };

  isUnmarked = (sectionCounter, questionCounter) => {
    return (
      this.data.attemptedSections[sectionCounter].attemptedQuestions[
        questionCounter
      ].markedOption === -1
    );
  };

  getSectionScore = sectionNumber => {
    const marksPerQn = this.data.sections[sectionNumber].markPerQuestion;
    const negMarksPerQn = this.data.sections[sectionNumber]
      .negativeMarkPerQuestion;

    let sectionScore = 0;
    let totalSectionScore;
    let questionCounter = 0;

    while (questionCounter < this.getNumberOfQns(sectionNumber)) {
      if (this.isCorrectlyMarked(sectionNumber, questionCounter)) {
        sectionScore += marksPerQn;
      } else if (!this.isUnmarked(sectionNumber, questionCounter)) {
        sectionScore -= negMarksPerQn;
      }
      questionCounter++;
    }

    totalSectionScore = this.getNumberOfQns(sectionNumber) * marksPerQn;

    return `Score: ${sectionScore}/${totalSectionScore}`;
  };

  getNumberOfQns = sectionCounter => {
    return this.data.sections[sectionCounter].questions.length;
  };

  getSectionLength = () => {
    return this.data.sections.length;
  };

  getQuizScore = () => {
    let sectionCounter = 0;
    let questionCounter = 0;
    let quizScore = 0;

    while (sectionCounter < this.getSectionLength()) {
      questionCounter = 0;
      while (questionCounter < this.getNumberOfQns(sectionCounter)) {
        if (this.isCorrectlyMarked(sectionCounter, questionCounter)) {
          quizScore += this.data.sections[sectionCounter].markPerQuestion;
        } else if (!this.isUnmarked(sectionCounter, questionCounter)) {
          quizScore -= this.data.sections[sectionCounter]
            .negativeMarkPerQuestion;
        }
        questionCounter++;
      }
      sectionCounter++;
    }

    return quizScore;
  };

  getTotalQuizScore = () => {
    let sectionCounter = 0;
    let totalQuizScore = 0;

    while (sectionCounter < this.getSectionLength()) {
      totalQuizScore +=
        this.data.sections[sectionCounter].markPerQuestion *
        this.getNumberOfQns(sectionCounter);
      sectionCounter++;
    }

    return totalQuizScore;
  };

  getTotalNegativeMarks = () => {
    let totalNegativeMarks = 0;
    let sectionCounter = 0;
    let questionCounter = 0;

    while (sectionCounter < this.getSectionLength()) {
      questionCounter = 0;
      while (questionCounter < this.getNumberOfQns(sectionCounter)) {
        if (
          !this.isCorrectlyMarked(sectionCounter, questionCounter) &&
          !this.isUnmarked(sectionCounter, questionCounter)
        ) {
          totalNegativeMarks += this.data.sections[sectionCounter]
            .negativeMarkPerQuestion;
        }
        questionCounter++;
      }
      sectionCounter++;
    }

    return totalNegativeMarks;
  };

  calculatePercentage = () => {
    if (this.quizScore < 0) return 0;
    else return ((this.quizScore / this.totalQuizScore) * 100).toFixed(2);
  };

  calculateTimeTaken = () => {
    const timeTakenInMillis =
      this.data.submittedAt - new Date(this.data.startTime);
    return Math.floor(timeTakenInMillis / 60000);
  };

  getTotalTimeLimit = () => {
    let sectionCounter = 0;
    let totalTime = 0;

    while (sectionCounter < this.getSectionLength()) {
      totalTime += this.data.sections[sectionCounter].timeLimit;
      sectionCounter++;
    }

    return totalTime;
  };

  getSectionSubtitle = sectionLength => {
    if (sectionLength === 1) {
      return sectionLength + " Question";
    } else {
      return sectionLength + " Questions";
    }
  };

  //getting section title
  createSectionHeader = (value, sectionLength, sectionNumber) => {
    const { classes } = this.props;

    return (
      <Card className={classes.sectionCard}>
        <CardHeader
          avatar={
            <Avatar aria-label="Section" className={classes.avatar}>
              {value}
            </Avatar>
          }
          action={
            <Typography variant={"overline"}>
              {this.getSectionScore(sectionNumber)}
            </Typography>
          }
          title="Section"
          subheader={this.getSectionSubtitle(sectionLength)}
        />
      </Card>
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <GridContainer>
          <GridItem>
            <Typography variant={"h6"}>{this.data.name}</Typography>
          </GridItem>
        </GridContainer>
        <Spacing />
        {this.renderHeader()}
        {this.renderQuestions(classes)}
      </div>
    );
  }
}

QuizAnswer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QuizAnswer);
