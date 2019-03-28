import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Grid from "@material-ui/core/Grid";
import {
  Card,
  CardHeader,
  Button,
  CardContent,
  Typography,
  Divider,
  Fab
} from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Spacing from "../../components/Spacing/Spacing";
import CardFooter from "../../components/Card/CardFooter";
import CardBody from "../../components/Card/CardBody";
import Timer from "react-compound-timer";

const styles = theme => ({
  root: {
    display: "block",
    margin: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 5,
    marginRight: theme.spacing.unit * 5
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
  }
});

class StartQuiz extends React.Component {
  state = {
    value: "option"
  };
  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <GridContainer>
          <Typography>
            <h4>Quiz Name</h4>
          </Typography>
          <GridItem>
          <Button variant={"outlined"} size={"small"}>Finish & Exit</Button>
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
                <CardFooter>
                  <Button
                    variant="outlined"
                    size={"small"}
                    type={"reset"}
                    className={classes.button}
                  >
                    Clear Selection
                  </Button>
                </CardFooter>
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
                    color="primary"
                    size={"small"}
                    type={"submit"}
                    className={classes.button}
                  >
                    Submit & Next
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <CardContent>
                <p>
                  Time Remaining:{" "}
                  <h4 className={classes.timer}>
                    <b>
                      {" "}
                      <Timer
                        initialTime={60000 * 10 + 60}
                        direction="backward"
                        onStop={() => console.log("onStop hook")}
                      >
                        {() => (
                          <React.Fragment>
                            <Timer.Minutes /> minutes <Timer.Seconds /> seconds
                          </React.Fragment>
                        )}
                      </Timer>
                    </b>
                  </h4>
                </p>
                <Spacing />
                <p>
                  <b>Questions:</b>
                </p>
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
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

StartQuiz.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StartQuiz);
