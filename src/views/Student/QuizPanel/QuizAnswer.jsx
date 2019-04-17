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
  Stepper
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

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 1,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
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
  }
});

class QuizAnswer extends React.Component {
  constructor(props) {
    super(props);

    this.currentSection = 0;
    this.currentQnNum = 0;

    const currentQn = this.props.location.state.sections[this.currentSection]
      .questions[this.currentQnNum];

    this.state = {
      activeStep: 0,
      fields: {
        question: currentQn.question,
        options: {
          1: currentQn.options[0],
          2: currentQn.options[1],
          3: currentQn.options[2],
          4: currentQn.options[3]
        }
      },
      markedOption: "",
      prevButton: !this.isFirstQn(),
      nextButton: !this.isLastQn(
        this.props.location.state.sections[this.currentSection]
      )
    };
  }

  isFirstQn = () => {
    return this.currentQnNum !== 0;
  };

  isLastQn = selectedSection => {
    return this.currentQnNum !== selectedSection.questions.length - 1;
  };

  handleNext = () => {
    const { activeStep } = this.state;

    this.setState({
      activeStep: activeStep + 1
    });
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  handleClearClick = () => {
    this.setState(() => ({
      markedOption: ""
    }));
  };

  handleNextClick = (event, selectedSection) => {
    if (this.isLastQn(selectedSection)) {
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
        markedOption: "",
        prevButton: !this.isFirstQn(),
        nextButton: !this.isLastQn(selectedSection)
      }));
    }
  };

  handlePreviousClick = (event, selectedSection) => {
    if (this.isFirstQn()) {
      const newQn = selectedSection.questions[--this.currentQnNum];

      this.setState(prevState => ({
        fields: {
          question: newQn.question,
          options: {
            1: newQn.options[0],
            2: newQn.options[1],
            3: newQn.options[2],
            4: newQn.options[3]
          }
        },
        markedOption: "",
        nextButton: !this.isLastQn(selectedSection),
        prevButton: !this.isFirstQn()
      }));
    }
  };

  handleChange = event => {
    event.persist();

    this.setState(() => ({
      markedOption: Number(event.target.value)
    }));
  };

  getSteps = quizSections => {
    let sectionNames = [];
    let i = 0;
    while (i < quizSections.length) {
      sectionNames.push(quizSections[i].category.name);
      i++;
    }
    return sectionNames;
  };

  getQuestionNumber = () => {
    return this.currentQnNum + 1;
  };

  getTotalTime = sections => {
    let totalTime = 0;

    let i = 0;
    while (i < sections.length) {
      totalTime += sections[i].timeLimit;
      i++;
    }
    return totalTime;
  };

  changeQuestion = (questionNo, quizSection) => {
    this.currentQnNum = questionNo;
    this.setFields(quizSection);
  };

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
        },
        markedOption: ""
      },
      prevButton: !this.isFirstQn(),
      nextButton: !this.isLastQn(quizSection)
    }));
  };

  generateQuestionJumpers = (quizSection, styles) => {
    let quizJumpers = [];

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
                      onChange={this.handleChange}
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
            <Card>
              <CardContent>
                <p>
                  <Typography variant={"overline"}>Time Remaining:</Typography>
                  <Typography variant={"h5"} className={classes.timer}>
                    <b>
                      <Timer
                        initialTime={60000 * this.getTotalTime(quiz.sections)}
                        direction="backward"
                        onStop={this.handleNext}
                      >
                        {(stop, getTimerState, getTime) => (
                          <React.Fragment>
                            <Timer.Minutes /> minutes <Timer.Seconds /> seconds
                            {getTimerState}
                          </React.Fragment>
                        )}
                      </Timer>
                    </b>
                  </Typography>
                </p>
                <Spacing />
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
                  onClick={this.handleNext}
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
                {steps.map((label, index) => {
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

QuizAnswer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QuizAnswer);
