import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Grid from "@material-ui/core/Grid";
import {
  Card,
  CardHeader,
  Button,
  CardContent,
  Typography,
  Divider
} from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Spacing from "../../components/Spacing/Spacing";
import CardFooter from "../../components/Card/CardFooter";
import CardBody from "../../components/Card/CardBody";

const styles = theme => ({
  root: {
    display: "flex",
    margin: "10",
    paddingLeft: "20",
    marginLeft: theme.spacing.unit *1
  },
  formControl: {
    margin: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit * 6
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
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
        <Typography>
          <h4>Quiz Name</h4>
        </Typography>
        <GridContainer>
          <GridItem>
            <Card>
              <form>
                <CardContent>
                  <Typography>Question Number: XX</Typography>
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
                <Spacing />
                <Divider />
                <CardFooter>
                  <Button
                    variant="outlined"
                    color={"secondary"}
                    className={classes.button}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outlined"
                    type={"reset"}
                    className={classes.button}
                  >
                    Clear
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    type={"submit"}
                    className={classes.button}
                  >
                    Submit & Next
                  </Button>
                </CardFooter>
              </form>
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
