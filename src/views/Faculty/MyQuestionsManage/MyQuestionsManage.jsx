import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Spacing from "../../../components/Spacing/Spacing.jsx";
import QuestionDetails from "../../General/QuestionDetails";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import CardHeader from "../../../components/Card/CardHeader";
import Card from "../../../components/Card/Card";
import dashboardStyle from "../../../assets/jss/material-dashboard-react/views/dashboardStyle";
import DialogQuestion from "../../../components/Dialog/DialogQuestion";
import gql from "graphql-tag";
import Typography from "@material-ui/core/Typography";
import { Query } from "react-apollo";

// core components

class MyQuestionsManage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  showQuestionManageDialog = isOpen => {
    if (isOpen) {
      console.log("render dialog called");
      return (
        <DialogQuestion
          question={this.state.question}
          onClose={this.hideQuestionManageDialog}
        />
      );
    }
  };
  hideQuestionManageDialog = isOpen => {
    console.log("close dialog called");
    this.setState({
      open: false
    });
  };
  triggerQuestionManageDialog = question => {
    this.setState({
      ...this.state,
      question,
      open: true
    });
  };

  render() {
    const { classes } = this.props;

    //----------------------------------------------------------------
    //Query to fetch question from database
    const RETRIVE_QUESTIONS = gql`
      {
        myQuestions {
          _id
          question
          category {
            _id
            name
          }
          subcategory {
            _id
            name
          }
          difficulty
          timesAttempted
          approvalStatus
          timesSolved
          options
          correctOption
          createdBy {
            _id
            name
          }
          solution
          createdAt
        }
      }
    `;
    //------------------------------------------------------------------------

    return (
      <Query query={RETRIVE_QUESTIONS}>
        {({ data, loading, error }) => {
          if (loading) {
            return <Typography>Loading...</Typography>;
          } else if (error) {
            return <Typography>Error occured!!!</Typography>;
          } else {
            return (
              <div>
                {this.showQuestionManageDialog(this.state.open)}
                <Spacing/>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Card className={classes.root}>
                      <CardHeader color="warning">
                        <h4 className={classes.cardTitleWhite}>Questions</h4>
                      </CardHeader>
                      <GridContainer style={{ padding: "2%" }}>
                        {data.myQuestions.map(question => {
                          return (
                            <QuestionDetails
                              key={question._id}
                              question={question}
                              showActions={question.approvalStatus !== 2}
                              actionButtonText={"Manage Question"}
                              actionFunction={this.triggerQuestionManageDialog}
                              showDeleteIcon={true}
                              // deleteFunction={this.deleteQuestion}
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
        }}
      </Query>
    );
  }
}

MyQuestionsManage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(MyQuestionsManage);
