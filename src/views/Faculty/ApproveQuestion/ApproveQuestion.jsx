import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Spacing from "../../../components/Spacing/Spacing.jsx";
import CardBody from "../../../components/Card/CardBody";
import QuestionDetails from "../../General/QuestionDetails";

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  renderConfirmationDialog = isOpen => {
    if (isOpen) {
      if (this.state.approve) {
        // return (<MessageDialog title="Confirm Approval" positiveAction="Approve Question" action={this.}/>);
      } else {
        return "";
      }
    }
  };
  hideQuestionManageDialog = isOpen => {
    console.log("close dialog called");
    this.setState({
      open: false
    });
  };
  triggerQuestionManageDialog = (question) => {
    this.setState({
      ...this.state,
      question,
      open: true
    });
  };

  rejectQuestion = (question) => {
    return "";
  };

  acceptQuestion = (question) => {
    return "";
  };

  render() {
    let questions = [
      {
        question:
          "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
        options: ["120 metres", "180 metres", "324 metres", "150 metres"],
        timesAttempted: "2",
        timesSolved: "1",
        createdBy: "Django",
        correctOption: "",
        category: "Speed and Distance",
        subcategory: "Problems on Trains"
      },
      {
        question:
          "The length of the bridge, which a train 130 metres long and travelling at 45 km/hr can cross in 30 seconds, is:",
        options: ["120 metres", "180 metres", "324 metres", "150 metres"],
        timesAttempted: "2",
        timesSolved: "1",
        correctOption: "4"
      },
      {
        question:
          "In the first 10 overs of a cricket game, the run rate was only 3.2. What should be the run rate in the remaining 40 overs to reach the target of 282 runs?",
        options: ["120 metres", "180 metres", "324 metres", "150 metres"],
        timesAttempted: "2",
        timesSolved: "1",
        correctOption: "4"
      },
      {
        question:
          "A family consists of two grandparents, two parents and three grandchildren. The average age of the grandparents is 67 years, that of the parents is 35 years and that of the grandchildren is 6 years. What is the average age of the family?",
        options: ["120 metres", "180 metres", "324 metres", "150 metres"],
        timesAttempted: "2",
        timesSolved: "1",
        correctOption: "4"
      },
      {
        question: "Question Question",
        options: ["120 metres", "180 metres", "324 metres", "150 metres"],
        timesAttempted: "2",
        timesSolved: "1",
        correctOption: "4"
      },
      {
        question: "Question Question",
        options: ["120 metres", "180 metres", "324 metres", "150 metres"],
        timesAttempted: "2",
        timesSolved: "1",
        correctOption: "4"
      }
    ];


    const { classes } = this.props;
    return (
      <div>
        {this.renderConfirmationDialog(this.state.open)}

        <Card className={classes.card}>
          <CardBody>
            <p>
              <b>Questions yet to approve:</b> XX
            </p>
          </CardBody>
        </Card>
        <Spacing />
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card className={classes.root}>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Questions</h4>
              </CardHeader>
              <GridContainer style={{ padding: "2%" }}>
                {questions.map(question => {
                  return (
                    <QuestionDetails
                      question={question}
                      showActions={true}
                      actionButtonText={"Approve Question"}
                      secondaryActionButtonText={"Reject Question"}
                      showSecondaryAction={true}
                      actionFunction={this.approveQuestion}
                      actionSecondaryFunction={this.rejectQuestion}
                      showDeleteIcon={false}
                    />
                  );
                })}
              </GridContainer>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
