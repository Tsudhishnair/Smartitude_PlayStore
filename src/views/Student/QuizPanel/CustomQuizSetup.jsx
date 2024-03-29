import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import { CardContent, Divider, Typography } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import Card from "components/Card/Card.jsx";
import QuizForm from "../../Admin/QuizManage/QuizForm";
import CardHeader from "../../../components/Card/CardHeader";
import CardBody from "../../../components/Card/CardBody";

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
  // state = {
  //   value: "option"
  // };
  // handleChange = event => {
  //   this.setState({ value: event.target.value });
  // };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Card>
          <form>
            <CardHeader color="success" className={classes.root}>
              <h4 className={classes.cardTitleWhite}>Custom Quiz</h4>
            </CardHeader>
            <CardBody>
              <Typography variant="body2">
                Create a custom quiz of your preferred categories and topics
              </Typography>

              <CardContent>
                <Divider />
                <QuizForm quizType={true} />
              </CardContent>
            </CardBody>
          </form>
        </Card>
      </div>
    );
}
}

CustomQuizSetup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomQuizSetup);
