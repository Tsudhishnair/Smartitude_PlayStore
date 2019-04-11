import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import {Button, CardContent, Typography } from "@material-ui/core";
import CardFooter from "../../../components/Card/CardFooter";
import Card from "components/Card/Card.jsx";
import Link from "react-router-dom/es/Link";
import QuizForm from "../../Admin/QuizManage/QuizForm";
import CardHeader from "../../../components/Card/CardHeader";
import Spacing from "../../../components/Spacing/Spacing";

const styles = theme => ({
  root: {
    display: "block",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center"
  },
  textGrey: {
    color: "grey"
  },
  textDarkGrey: {
    color: "#696969"
  },
  formroot: {
    display: "flex",
    flexWrap: "wrap"
  },
  container: {
    display: "flex",
    flexGrow: 1
  },
  date_root: {
    marginTop: theme.spacing.unit * 2,
    display: "flex",
    flexWrap: "nowrap",
    autoWidth: true
  },
  formControl: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    minWidth: 120,
    display: "flex",
    flexGrow: 1
  },
  button: {
    margin: theme.spacing.unit * 4
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
                <CardHeader color="success" className={classes.root}>
                  <h4 className={classes.cardTitleWhite}>Custom Quiz</h4>
                </CardHeader>
                <CardContent>
                  <Typography variant="body2">
                    Create a custom quiz of your preferred categories and topics
                  </Typography>
                  <Spacing />
                  <QuizForm />
                </CardContent>
                <CardFooter
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Link to="/student/start_quiz">
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
