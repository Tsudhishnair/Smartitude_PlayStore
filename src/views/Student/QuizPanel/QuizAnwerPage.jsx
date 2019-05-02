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
  CardContent,
  Typography,
  Divider,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanel,
  FormControlLabel,
  Checkbox,
  FormGroup,
  FormControl,
  FormLabel,
  CardHeader,
  Avatar
} from "@material-ui/core";

import { TrendingUp, TrendingDown, Timer } from "@material-ui/icons";

import Spacing from "../../../components/Spacing/Spacing";
import CardFooter from "../../../components/Card/CardFooter";
import CardBody from "../../../components/Card/CardBody";

import { green, blue, red } from "@material-ui/core/colors";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 1,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.down("sm")]: {
      margin: 0
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
  radioPrimary: {
    color: green[600],
    "&$checked": {
      color: green[500]
    }
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  avatar: {
    backgroundColor: red[500],
    position: "relative"
  },
  descText: {
    color: red[500]
  },
  sectionCard: {
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 1
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
  }

  //jsx for header
  renderHeader = () => {
    const { classes } = this.props;
    return (
      <Card>
        <CardContent>
          <Typography variant={"h5"}>Congratulation</Typography>
        </CardContent>
        <CardBody>
          <GridContainer>
            <GridItem xs={12} sm={4} md={3}>
              <div justify={"center"}>
                <Avatar aria-label="Icon" className={classes.avatar}>
                  <TrendingUp />
                </Avatar>
                <p>
                  <Typography variant={"overline"}>Score:</Typography>
                  <Typography variant={"h5"} className={classes.descText}>
                    25.5/50
                  </Typography>
                </p>
              </div>
            </GridItem>
            <GridItem xs={12} sm={4} md={3}>
              <div justify={"center"}>
                <Avatar aria-label="Icon" className={classes.avatar}>
                  <TrendingDown />
                </Avatar>
                <p>
                  <Typography variant={"overline"}>Negative Marks:</Typography>
                  <Typography variant={"h5"} className={classes.descText}>
                    5
                  </Typography>
                </p>
              </div>
            </GridItem>
            <GridItem xs={12} sm={4} md={3}>
              <div justify={"center"}>
                <Avatar aria-label="Icon" className={classes.avatar}>
                  <Timer />
                </Avatar>
                <p>
                  <Typography variant={"overline"}>Time Taken:</Typography>
                  <Typography variant={"h5"} className={classes.descText}>
                    23.6/30 Mins
                  </Typography>
                </p>
              </div>
            </GridItem>
          </GridContainer>
        </CardBody>
      </Card>
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
          classes={{
            root: classes.radioCorrect,
            checked: classes.blueChecked
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
          checked={true}
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
      return <Checkbox value={optionIndex} checked={true} />;
    } else {
      return <Checkbox value={optionIndex} checked={false} />;
    }
  };

  //create jsx for a single question
  createQuestionPiece = (sectionIndex, questionIndex, classes) => {
    const question = this.data.sections[sectionIndex].questions[questionIndex];

    console.log(question);

    return (
      <Card>
        <form>
          <CardContent>
            <Typography>
              Question Number: <b>{questionIndex + 1}</b>
            </Typography>
            <p>{question.question}</p>
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
                  label={question.options[0]}
                />
                <FormControlLabel
                  control={this.renderCheckbox(
                    sectionIndex,
                    questionIndex,
                    2,
                    classes
                  )}
                  label={question.options[1]}
                />
                <FormControlLabel
                  control={this.renderCheckbox(
                    sectionIndex,
                    questionIndex,
                    3,
                    classes
                  )}
                  label={question.options[2]}
                />
                <FormControlLabel
                  control={this.renderCheckbox(
                    sectionIndex,
                    questionIndex,
                    4,
                    classes
                  )}
                  label={question.options[3]}
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
            <p>
              <div>{question.solution}</div>
            </p>
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

  //getting section title
  createSectionHeader = value => {
    const { classes } = this.props;
    return (
      <Card className={classes.sectionCard}>
        <CardHeader
          avatar={
            <Avatar aria-label="Section" className={classes.avatar}>
              {value}
            </Avatar>
          }
          action={<Typography variant={"overline"}>Score: 12/20</Typography>}
          title="Section"
          subheader="15 Questions"
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
