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
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {/* <GridContainer>
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
            <Card>
              <CardContent>
                <p>
                  <Typography variant={"overline"}>Time Remaining:</Typography>
                  <Typography variant={"h5"} className={classes.timer}>
                    <b>
                      <Timer
                        initialTime={60000 * this.getTimeLimit(selectedSection)}
                        direction="backward"
                        onStop={this.handleSectionSubmit}
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
        </GridContainer> */}
        
        <p>hello asdbhjskldbgklhi</p>
      </div>
    );
  }
}

QuizAnswer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QuizAnswer);
