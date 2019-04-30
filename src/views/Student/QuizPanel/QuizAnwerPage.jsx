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
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <GridContainer>
          <GridItem>
            <Typography>
              <h4>Quiz 1</h4>
            </Typography>
          </GridItem>
        </GridContainer>
        <Spacing />
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
                  <strong>Score:</strong>25.5/50
                </p>
                <p>
                  <strong>Negative Marks:</strong>24
                </p>
                <p>
                  <strong>Time Taken:</strong>23.6 mins/30mins
                </p>
                <p>
                  <strong>Current Rank:</strong>6th/150
                </p>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <Spacing />

        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <form>
                    <CardContent>
                      <Typography>
                        Question Number: <b>1</b>
                      </Typography>
                      <p>
                        A train travells at a spped of 120 km/hr. how long does
                        it take to travel a distance of 3km?
                      </p>
                      <Divider />
                    </CardContent>
                    <CardBody>
                      <FormControl
                        component="fieldset"
                        className={classes.formControl}
                      >
                        <FormLabel component="legend">
                          Marked Choice
                        </FormLabel>
                        <RadioGroup
                          aria-label="options"
                          name="option"
                          className={classes.group}
                        >
                          <FormControlLabel
                            value={1}
                            control={<Radio />}
                            label={"1"}
                          />
                          <FormControlLabel
                            value={2}
                            control={<Radio />}
                            label={"2"}
                          />
                          <FormControlLabel
                            value={3}
                            control={<Radio />}
                            label={"3"}
                          />
                          <FormControlLabel
                            value={4}
                            control={<Radio />}
                            label={"4"}
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
                    <div>The has no fuel thus it travels zero km.</div>
                  </p>
                </ExpansionPanelDetails>
              </ExpansionPanel>
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
