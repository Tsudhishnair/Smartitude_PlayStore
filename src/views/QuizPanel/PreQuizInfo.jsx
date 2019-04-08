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
    margin: theme.spacing.unit * 3
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
                  <Typography variant="h5">Quiz Name</Typography>
                  <Typography variant="subtitle2">
                    Quiz Description Quiz Description Quiz Description Quiz
                    Description Quiz Description Quiz Description
                  </Typography>
                  <Spacing />
                  <Typography variant="h6" gutterBottom>
                    Instructions:
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Total number of questions : <b>XX</b>
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Time allotted : <b>XX</b>
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Each question carry 1 mark, no negative marks
                  </Typography>
                </CardContent>
                <CardBody>
                  <Typography variant="h6" gutterBottom>
                    Note:
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Click the “Finish quiz” button given in bottom of this page
                    to submit your answer. Test will be submitted automatically
                    if the time expired. Don’t refresh the page. When you are
                    ready, click <b>Start Quiz</b> to start the first sub-test.
                  </Typography>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Link to="/student/quiz">
                    <Button
                      variant="outlined"
                      color="primary"
                      size={"large"}
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
