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
  constructor (props) {
    super(props);
    this.state = {
      activeStep: 0,
      fields: {
        question: "",
        options: {
          1: "",
          2: "",
          3: "",
          4: ""
        }
      },
      markedOption: ""
    };
  }

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

  handleChange = event => {
    this.setState({ value: event.target.value });
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

  render() {
    const { classes } = this.props;
    const quiz = this.props.location.state;
    const { activeStep } = this.state;

    const steps = this.getSteps(quiz.sections);
    console.log(quiz);

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
                    Question Number: <b>XX</b>
                  </Typography>
                  <p>
                    A train 125 m long passes a man, running at 5 km/hr in the
                    same direction in which the train is going, in 10 seconds.
                    The speed of the train is:
                  </p>
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
                      value={this.state.value}
                      onChange={this.handleChange}
                    >
                      <FormControlLabel
                        value="option1"
                        control={<Radio />}
                        label="Option 1"
                      />
                      <FormControlLabel
                        value="option2"
                        control={<Radio />}
                        label="Option 2"
                      />
                      <FormControlLabel
                        value="option3"
                        control={<Radio />}
                        label="Option 3"
                      />
                      <FormControlLabel
                        value="option4"
                        control={<Radio />}
                        label="Option 4"
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
                    className={classes.button}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outlined"
                    size={"small"}
                    type={"reset"}
                    className={classes.button}
                  >
                    Clear Selection
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    size={"small"}
                    type={"submit"}
                    className={classes.button}
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
                        initialTime={60000 * 1 + 60}
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
                <Fab
                  size="small"
                  variant={"outlined"}
                  color="primary"
                  aria-label="Add"
                  className={classes.fab}
                >
                  1
                </Fab>
                <Fab
                  size="small"
                  variant={"outlined"}
                  color="white"
                  aria-label="Add"
                  className={classes.fab}
                >
                  2
                </Fab>
                <Fab
                  size="small"
                  variant={"outlined"}
                  color="white"
                  aria-label="Add"
                  className={classes.fab}
                >
                  3
                </Fab>
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
