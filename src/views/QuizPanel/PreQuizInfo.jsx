import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import {
  Card,
  Button,
  CardContent,
  Typography,
  Divider
} from "@material-ui/core";
import CardFooter from "../../components/Card/CardFooter";
import CardBody from "../../components/Card/CardBody";
import Spacing from "../../components/Spacing/Spacing";
import Link from "react-router-dom/es/Link";

const styles = theme => ({
  root: {
    display: "block",
    justifyContent: "center",
    alignItems: "center"
  },
  textGrey: {
    color: "grey"
  },
  textDarkGrey: {
    color: "#696969"
  }
});

class PreQuizInfo extends React.Component {
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
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <form>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Quiz Name
                  </Typography>
                  <Typography variant="body2">
                    Quiz Description Quiz Description Quiz Description Quiz
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                    className={classes.textGrey}
                  >
                    XX Questions | XX Minutes
                  </Typography>
                  <Spacing />
                  <Typography variant="h6" gutterBottom>
                    Instructions:
                  </Typography>
                  <Typography
                    variant="body2"
                    gutterBottom
                    className={classes.textDarkGrey}
                  >
                    Each question carry <b>1 mark</b>, no negative marks <br />
                    All questions are multiple choice and there is only one
                    correct answer. The test can not be paused. <br />
                    Calculators are not permitted, we recommend having a pen and
                    paper ready for rough calculations. <br />
                    Try to take the test in an environment that you will not be
                    disturbed. <br />
                  </Typography>
                </CardContent>
                <CardBody>
                  <Typography variant="h6" gutterBottom>
                    Note:
                  </Typography>
                  <Typography
                    variant="body2"
                    gutterBottom
                    className={classes.textDarkGrey}
                  >
                    Click the “Finish Quiz” button given in bottom of this page
                    to submit your answer.
                    <br />
                    Test will be submitted automatically if the time expires.
                    <br />
                    Don’t refresh the page.
                    <br />
                    When you are ready, click <b>Start Quiz</b> to start the
                    quiz.
                  </Typography>
                </CardBody>
                <Divider />
                <CardFooter
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Link to="/student/quiz">
                    <Button
                      variant="outlined"
                      color="primary"
                      size={"large"}
                      style={{ float: "center" }}
                      type={"submit"}
                      className={classes.button}
                    >
                      Start Quiz
                    </Button>
                  </Link>
                </CardFooter>
              </form>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

PreQuizInfo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PreQuizInfo);
