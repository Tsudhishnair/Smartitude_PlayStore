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
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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

    this.data = this.props.location.state;

    console.log(this.data);
  }

  renderHeader = () => {
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardContent>
              <p>
                <Typography variant={"overline"} />
                <Typography variant={"h5"}>
                  <center>
                    <p>Congratulation</p>
                  </center>
                </Typography>
              </p>
            </CardContent>
            <CardFooter>
              <p>
                <strong>Score:</strong>
                25.5/50
              </p>
              <p>
                <strong>Negative Marks:</strong>
                24
              </p>
              <p>
                <strong>Time Taken:</strong>
                23.6 mins/30mins
              </p>
              <p>
                <strong>Current Rank:</strong>
                6th/150
              </p>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    );
  };

  createQuestionPiece = (sectionIndex, questionIndex, classes) => {
    const question = this.data.sections[sectionIndex].questions[questionIndex];

    console.log(question);

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <form>
                  <CardContent>
                    <Typography>
                      Question Number: <b>{questionIndex + 1}</b>
                    </Typography>
                    <p>{question.question}</p>
                    <Divider />
                  </CardContent>
                  <CardBody>
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormLabel component="legend">Marked Choice</FormLabel>
                      <RadioGroup
                        aria-label="options"
                        name="option"
                        value={
                          this.data.attemptedSections[sectionIndex]
                            .attemptedQuestions[questionIndex].markedOption
                        }
                        className={classes.group}
                      >
                        <FormControlLabel
                          value={1}
                          control={<Radio />}
                          label={question.options[0]}
                        />
                        <FormControlLabel
                          value={2}
                          control={<Radio />}
                          label={question.options[1]}
                        />
                        <FormControlLabel
                          value={3}
                          control={<Radio />}
                          label={question.options[2]}
                        />
                        <FormControlLabel
                          value={4}
                          control={<Radio />}
                          label={question.options[3]}
                        />
                      </RadioGroup>
                    </FormControl>
                  </CardBody>
                  <Divider />
                </form>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <p>
                  <strong>Detailed Answer:</strong>
                  <div>{question.solution}</div>
                </p>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Card>
        </GridItem>
      </GridContainer>
    );
  };

  renderQuestions = classes => {
    let rowCounter = 0,
      columnCounter = 0;

    let container = [];

    while (rowCounter < this.data.sections.length) {
      console.log(this.data.sections);

      container.push(this.createSectionHeader(rowCounter + 1));

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

  createSectionHeader = value => {
    return <Typography>Section {value}</Typography>;
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <GridContainer>
          <GridItem>
            <Typography>
              <h4>{this.data.name}</h4>
            </Typography>
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
