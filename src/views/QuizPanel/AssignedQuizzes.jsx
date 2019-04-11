import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import { Typography } from "@material-ui/core";
import Card from "components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import CardContent from "@material-ui/core/es/CardContent/CardContent";

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

class AssignedQuizzes extends React.Component {
  state = {
    value: "option"
  };
  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const testData = [
      [
        "Preliminary Round 1st Years",
        "uxxxxx",
        "Admin",
        "2022",
        "YES",
        "29/05/19"
      ],
      [
        "Preliminary Round 2nd Years",
        "uxxxxx",
        "Django",
        "2019",
        "YES",
        "13/05/19"
      ],
      [
        "Preliminary Round 3rdd Years",
        "uxxxxx",
        "Admin",
        "2019",
        "YES",
        "30/05/19"
      ]
    ];

    return (
      <div className={classes.root}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <form>
                <CardHeader className={classes.root} color="danger">
                  <h4 className={classes.cardTitleWhite}>Assigned Quizzes</h4>
                </CardHeader>
                <CardContent>
                  <Typography
                    variant="body2"
                    className={classes.cardTitleWhite}
                  >
                    Create a custom quiz of your preferred categories and topics
                  </Typography>
                </CardContent>
              </form>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

AssignedQuizzes.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(AssignedQuizzes);
