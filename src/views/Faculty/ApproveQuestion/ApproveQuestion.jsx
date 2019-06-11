import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import approveQuestionStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Spacing from "../../../components/Spacing/Spacing.jsx";
import CardBody from "../../../components/Card/CardBody";
import QuestionDetails from "../../General/QuestionDetails";
import MessageDialog from "../../../components/Dialog/MessageDialog";
import gql from "graphql-tag";
import Typography from "@material-ui/core/Typography";
import { Mutation, Query } from "react-apollo";

const APPROVE_QUESTION = gql`
  mutation approveQuestion($_id: ID!) {
    approveQuestion(_id: $_id) {
      _id
    }
  }
`;

const REJECT_QUESTION = gql`
  mutation rejectQuestion($_id: ID!) {
    rejectQuestion(_id: $_id) {
      _id
    }
  }
`;

class ApproveQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.reloadList = undefined;
    this.state = {
      open: false,
      approve: false,
      reject: false
    };
  }

  setQuestionToApprove = question => {
    this.setState({
      ...this.state,
      question,
      open: true,
      approve: true,
      reject: false
    });
  };

  setQuestionToReject = question => {
    this.setState({
      ...this.state,
      question,
      open: true,
      approve: false,
      reject: true
    });
  };

  renderConfirmationDialog = isOpen => {
    if (isOpen) {
      if (this.state.approve) {
        return (
          <Mutation mutation={APPROVE_QUESTION}>
            {approveQuestion => {
              return (
                <MessageDialog
                  title="Confirm Approval"
                  positiveAction="Yes"
                  negativeAction="No"
                  content="Are you sure to approve this question?"
                  onClose={this.closeDialog}
                  action={() => {
                    this.performApproval(approveQuestion);
                  }}
                />
              );
            }}
          </Mutation>
        );
      } else if (this.state.reject) {
        return (
          <Mutation mutation={REJECT_QUESTION}>
            {rejectQuestion => {
              return (
                <MessageDialog
                  title="Confirm Rejection"
                  positiveAction="Yes"
                  negativeAction="No"
                  content="Rejecting the question will delete this question permanently. Are you sure you want to continue?"
                  onClose={this.closeDialog}
                  action={() => {
                    this.performRejection(rejectQuestion);
                  }}
                />
              );
            }}
          </Mutation>
        );
      } else {
        return "";
      }
    } else {
      return "";
    }
  };

  closeDialog = () => {
    this.setState({
      open: false,
      approve: false,
      reject: false
    });
  };

  performRejection = rejectQuestion => {
    console.log("performRejection called");
    rejectQuestion({
      variables: {
        _id: this.state.question._id
      }
    });
    this.reloadList();
    this.closeDialog();
  };

  performApproval = approveQuestion => {
    console.log("performApproval called");
    approveQuestion({
      variables: {
        _id: this.state.question._id
      }
    });
    this.reloadList();
    this.closeDialog;
  };

  render() {
    const { classes } = this.props;
    //----------------------------------------------------------------
    //Query to fetch question from database
    const RETRIVE_QUESTIONS = gql`
      query questionsForIncharge($approvalStatus: Int!) {
        questionsForIncharge(approvalStatus: $approvalStatus) {
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
      <Query query={RETRIVE_QUESTIONS} variables={{ approvalStatus: 0 }}>
        {({ data, loading, error, refetch }) => {
          this.reloadList = refetch;
          if (loading) {
            return <Typography>Loading...</Typography>;
          } else if (error) {
            return <Typography>{error.message}</Typography>;
          } else {
            return (
              <div>
                {this.renderConfirmationDialog(this.state.open)}

                <Card className={classes.card}>
                  <CardBody>
                    <p>
                      <b>Questions yet to approve:</b> {data.questionsForIncharge.length}
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
                        {data.questionsForIncharge.map(question => {
                          return (
                            <QuestionDetails
                              question={question}
                              showActions={true}
                              actionButtonText={"Approve Question"}
                              secondaryActionButtonText={"Reject Question"}
                              showSecondaryAction={true}
                              actionFunction={this.setQuestionToApprove}
                              actionSecondaryFunction={this.setQuestionToReject}
                              showDeleteIcon={false}
                              showAllDetails={true}
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

ApproveQuestion.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(approveQuestionStyle)(ApproveQuestion);
