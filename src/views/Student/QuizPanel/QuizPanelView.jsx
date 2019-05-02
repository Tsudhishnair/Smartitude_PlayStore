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
  Fab,
  StepLabel,
  Step,
  Stepper,
  Hidden
} from "@material-ui/core";
import Radio from "@material-ui/core/Radio/index";
import RadioGroup from "@material-ui/core/RadioGroup/index";
import FormControlLabel from "@material-ui/core/FormControlLabel/index";
import FormControl from "@material-ui/core/FormControl/index";
import FormLabel from "@material-ui/core/FormLabel/index";
import Spacing from "../../../components/Spacing/Spacing";
import CardFooter from "../../../components/Card/CardFooter";
import CardBody from "../../../components/Card/CardBody";
import Timer from "react-compound-timer/build/components/Timer/Timer";
import { Redirect } from "react-router-dom";
const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 1,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing.unit * 1,
      marginRight: theme.spacing.unit * 1
    }
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
  rightPanel: {
    color: "green",
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing.unit * 2,
    }
  }
});

class QuizPanelView extends React.Component {
  constructor(props) {
    super(props);

    //currentSecion is an index value of the section that is being attempted currently
    this.currentSection = 0;

    //maintaining index value of current question being answered
    this.currentQnNum = 0;

    //get object of current question being answered
    const currentQn = this.props.location.state.sections[this.currentSection]
      .questions[this.currentQnNum];

    this.state = {
      //index value of step that is active
      activeStep: 0,
      //maintain value of fields of question
      fields: {
        question: currentQn.question,
        options: {
          1: currentQn.options[0],
          2: currentQn.options[1],
          3: currentQn.options[2],
          4: currentQn.options[3]
        }
      },
      //integer value of option marked by user
      markedOption: "",
      //maintain state of prev and next buttons
      prevButton: !this.isNotFirstQn(),
      nextButton: !this.isNotLastQn(
        this.props.location.state.sections[this.currentSection]
      ),
      //used to redirect from quizPanel to answers view
      redirector: false
    };

    //maintain interval for timeTaken field
    this.timer;

    //contains data to be submitted on submission of sections and quiz
    this.dataToSubmit = {
      quizId: this.props.location.state._id,
      attemptedAt: new Date(),
      attemptedSections: []
    };

    //populate dataToSubmit with empty data to protect against undefined values
    let i = 0;
    while (i < this.props.location.state.sections.length) {
      this.dataToSubmit.attemptedSections.push({
        attemptedQuestions: []
      });

      let j = 0;
      while (j < this.props.location.state.sections[i].questions.length) {
        this.dataToSubmit.attemptedSections[i].attemptedQuestions.push({
          question: this.props.location.state.sections[i].questions[j]._id,
          markedOption: "",
          timeTakenToMark: 0
        });
        j++;
      }
      i++;
    }

    //start time counter
    this.manageTimeTakenCounter();
  }

  //check if qn is the first of the section
  isNotFirstQn = () => {
    return this.currentQnNum !== 0;
  };

  //check if qn is the last of the section
  isNotLastQn = selectedSection => {
    return this.currentQnNum !== selectedSection.questions.length - 1;
  };

  //called when section submit is called
  handleSectionSubmit = quizSections => {
    //set qn index to 0 to start from first qn
    this.currentQnNum = 0;

    //check if section is the last one, if not, change activeStep and change fields
    if (++this.currentSection < quizSections.length) {
      this.setState(prevState => ({
        activeStep: prevState.activeStep + 1
      }));

      this.setFields(quizSections[this.currentSection]);
    } else {
      //call mutation for final section submission

      this.clearTimeTakenCounter();
      // TODO: CALL MUTATION HERE
      this.setState(() => ({
        redirector: true
      }));
    }
  };

  //clear markedOption field
  handleClearClick = () => {
    this.setState(() => ({
      markedOption: this.setMarkedOption("")
    }));
  };

  //change qn to the next index
  handleNextClick = (event, selectedSection) => {
    if (this.isNotLastQn(selectedSection)) {
      const newQn = selectedSection.questions[++this.currentQnNum];

      this.setState(() => ({
        fields: {
          question: newQn.question,
          options: {
            1: newQn.options[0],
            2: newQn.options[1],
            3: newQn.options[2],
            4: newQn.options[3]
          }
        },
        markedOption: this.getMarkedOption(),
        prevButton: !this.isNotFirstQn(),
        nextButton: !this.isNotLastQn(selectedSection)
      }));
    }
  };

  //change qn to the previous index
  handlePreviousClick = (event, selectedSection) => {
    if (this.isNotFirstQn()) {
      const newQn = selectedSection.questions[--this.currentQnNum];

      this.setState(() => ({
        fields: {
          question: newQn.question,
          options: {
            1: newQn.options[0],
            2: newQn.options[1],
            3: newQn.options[2],
            4: newQn.options[3]
          }
        },
        markedOption: this.getMarkedOption(),
        nextButton: !this.isNotLastQn(selectedSection),
        prevButton: !this.isNotFirstQn()
      }));
    }
  };

  //called when an option is clicked in a question
  handleChange = event => {
    event.persist();

    //change marked option to the new option
    this.setMarkedOption(event.target.value);

    this.setState(() => ({
      markedOption: Number(event.target.value)
    }));
  };

  //get steps for display
  getSteps = quizSections => {
    let sectionNames = [];
    let i = 0;
    while (i < quizSections.length) {
      sectionNames.push(quizSections[i].category.name);
      i++;
    }
    return sectionNames;
  };

  //get the current question number
  getQuestionNumber = () => {
    return this.currentQnNum + 1;
  };

  //return timeLimit of the section
  getTimeLimit = section => {
    return section.timeLimit;
    // let totalTime = 0;

    // let i = 0;
    // while (i < sections.length) {
    //   totalTime += sections[i].timeLimit;
    //   i++;
    // }
    // return totalTime;
  };

  //change questionIndex and set fields
  changeQuestion = (questionNo, quizSection) => {
    this.currentQnNum = questionNo;
    this.setFields(quizSection);
  };

  //set question fields depending on the current section and qnNumber
  setFields = quizSection => {
    const currentQn = quizSection.questions[this.currentQnNum];
    this.setState(() => ({
      fields: {
        question: currentQn.question,
        options: {
          1: currentQn.options[0],
          2: currentQn.options[1],
          3: currentQn.options[2],
          4: currentQn.options[3]
        }
      },
      markedOption: this.getMarkedOption(),
      prevButton: !this.isNotFirstQn(),
      nextButton: !this.isNotLastQn(quizSection)
    }));
  };

  //set Marked option depending on the value passed
  setMarkedOption = value => {
    this.dataToSubmit.attemptedSections[this.currentSection].attemptedQuestions[
      this.currentQnNum
    ].markedOption = Number(value);
  };

  //return options that were marked
  getMarkedOption = () => {
    return this.dataToSubmit.attemptedSections[this.currentSection]
      .attemptedQuestions[this.currentQnNum].markedOption;
  };

  //start counter. this counter sets value for timeTakenToMark field in the array to be submitted according to the current section and Qno
  manageTimeTakenCounter = () => {
    this.timer = setInterval(() => {
      this.dataToSubmit.attemptedSections[this.currentSection]
        .attemptedQuestions[this.currentQnNum].timeTakenToMark++;
    }, 1000);
  };

  clearTimeTakenCounter = () => {
    clearInterval(this.timer);
  };

  //generate jumpers
  generateQuestionJumpers = (quizSection, styles) => {
    let quizJumpers = [];

    //create jumpers and assign colors according to the current index of qn
    let i = 0;
    while (i < quizSection.questions.length) {
      if (this.currentQnNum + 1 === i + 1) {
        quizJumpers.push(
          this.generateJumper(i, "primary", styles, quizSection)
        );
      } else {
        quizJumpers.push(this.generateJumper(i, "white", styles, quizSection));
      }
      i++;
    }

    return quizJumpers;
  };

  //return Fab code for the jumper
  generateJumper = (questionNo, color, styles, quizSection) => {
    return (
      <Fab
        size="small"
        variant={"outlined"}
        color={color}
        aria-label="Add"
        onClick={() => this.changeQuestion(questionNo, quizSection)}
        className={styles}
      >
        {questionNo + 1}
      </Fab>
    );
  };

  render() {
    const { classes } = this.props;
    const quiz = this.props.location.state;
    const selectedSection = quiz.sections[this.currentSection];
    const { activeStep } = this.state;

    const steps = this.getSteps(quiz.sections);

    console.log(quiz);

    console.log(this.dataToSubmit);

    if (this.state.redirector === true) {
      return (
        <Redirect
          push
          to={{
            pathname: "/student/quiz_answer",
            state: {
              ...this.dataToSubmit,
              ...quiz
            }
          }}
        />
      );
    }

    return (
      <div className={classes.root}>
        <GridContainer>
          <GridItem>
            <Typography>
              <h4>{quiz.name}</h4>
            </Typography>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <form>
                <CardContent>
                  <Hidden mdUp implementation="css">
                    <p>
                      <Typography variant={"overline"}>
                        Time Remaining:
                      </Typography>
                      <Typography variant={"h5"} className={classes.timer}>
                        <b>
                          <Timer
                            initialTime={
                              60000 * this.getTimeLimit(selectedSection)
                            }
                            direction="backward"
                            onStop={this.handleSectionSubmit}
                          >
                            {(stop, getTimerState, getTime) => (
                              <React.Fragment>
                                <Timer.Minutes /> minutes <Timer.Seconds />{" "}
                                seconds
                                {getTimerState}
                              </React.Fragment>
                            )}
                          </Timer>
                        </b>
                      </Typography>
                    </p>
                    <Spacing />
                  </Hidden>
                  <Typography>
                    Question Number: <b>{this.getQuestionNumber()}</b>
                  </Typography>
                  <p>{this.state.fields.question}</p>
                  <Divider />
                </CardContent>
                <CardBody>
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormLabel component="legend">
                      Select your correct choice below
                    </FormLabel>
                    <RadioGroup
                      aria-label="options"
                      name="option"
                      className={classes.group}
                      value={this.state.markedOption}
                      onChange={event =>
                        this.handleChange(event, quiz.sections)
                      }
                    >
                      <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label={this.state.fields.options["1"]}
                      />
                      <FormControlLabel
                        value={2}
                        control={<Radio />}
                        label={this.state.fields.options["2"]}
                      />
                      <FormControlLabel
                        value={3}
                        control={<Radio />}
                        label={this.state.fields.options["3"]}
                      />
                      <FormControlLabel
                        value={4}
                        control={<Radio />}
                        label={this.state.fields.options["4"]}
                      />
                    </RadioGroup>
                  </FormControl>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Button
                    variant="outlined"
                    color={"secondary"}
                    size={"small"}
                    disabled={this.state.prevButton}
                    className={classes.button}
                    onClick={event =>
                      this.handlePreviousClick(event, selectedSection)
                    }
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outlined"
                    size={"small"}
                    type={"reset"}
                    className={classes.button}
                    onClick={this.handleClearClick}
                  >
                    Clear Selection
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    size={"small"}
                    disabled={this.state.nextButton}
                    className={classes.button}
                    onClick={event =>
                      this.handleNextClick(event, selectedSection)
                    }
                  >
                    Next
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card className={classes.rightPanel}>
              <CardContent>
                <Hidden smDown implementation="css">
                  <p>
                    <Typography variant={"overline"}>
                      Time Remaining:
                    </Typography>
                    <Typography variant={"h5"} className={classes.timer}>
                      <b>
                        <Timer
                          initialTime={
                            60000 * this.getTimeLimit(selectedSection)
                          }
                          direction="backward"
                          onStop={this.handleSectionSubmit}
                        >
                          {(stop, getTimerState, getTime) => (
                            <React.Fragment>
                              <Timer.Minutes /> minutes <Timer.Seconds />{" "}
                              seconds
                              {getTimerState}
                            </React.Fragment>
                          )}
                        </Timer>
                      </b>
                    </Typography>
                  </p>
                  <Spacing />
                </Hidden>
                <Typography variant={"overline"}>Questions:</Typography>
                {this.generateQuestionJumpers(selectedSection, classes.fab)}
              </CardContent>
              <CardFooter>
                <Button
                  variant="outlined"
                  color="primary"
                  type={"submit"}
                  size={"small"}
                  fullWidth
                  className={classes.button}
                  onClick={() => this.handleSectionSubmit(quiz.sections)}
                >
                  {activeStep === steps.length - 1
                    ? "Finish Quiz"
                    : "Submit Section"}
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <Spacing />
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map(label => {
                  const props = {};
                  const labelProps = {};
                  return (
                    <Step key={label} {...props}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

QuizPanelView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QuizPanelView);
