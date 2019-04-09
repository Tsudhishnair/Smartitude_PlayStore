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

class CustomQuizSetup extends React.Component {
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
                    Custom Quiz
                  </Typography>
                  <Typography variant="body2">
                    Create a custom quiz of your preferred categories and topics
                  </Typography>
                </CardContent>
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
                      Create Quiz
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

CustomQuizSetup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomQuizSetup);
