// Component to handle quiz management both in faculty as well as admin quiz management

import React, { Component } from "react";

import PropTypes from "prop-types";
import { Button, Divider, IconButton } from "@material-ui/core";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import Delete from "@material-ui/icons/Delete";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Snackbar from "@material-ui/core/Snackbar";
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import MessageDialog from "../../components/Dialog/MessageDialog";
import Latex from "./Latex";

class QuestionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogDelete: false,
    };
    // stores question which is to be deleted
    this.questionToBeDeleted;
    // stores mutation call of question
    this.questionDeleteMutation;

    this.node = React.createRef();
  }

  handleDelete = (func, data) => {
    this.toggleDeleteDialogVisibility();
    this.questionToBeDeleted = data;
    this.questionDeleteMutation = func;

  };
  //Dialog for Question Delete
  renderDeleteDialog = (dialogDelete) => {
    if (dialogDelete) {
      return (
        <MessageDialog
          title="Delete Question"
          content="Are you sure you want to delete this Questions?"
          positiveAction="Delete"
          negativeAction="Cancel"
          action={this.deleteQuestion}
          onClose={this.toggleDeleteDialogVisibility}
        />
      );
    }
  };
  
  //used to toggle the visibility of delete dialog
  toggleDeleteDialogVisibility = () => {
    this.setState(prevState => ({
      dialogDelete: !prevState.dialogDelete
    }));
  };
  //delete mutation action
  deleteQuestion = () => {
    this.questionDeleteMutation({
      variables: {
        _id: this.questionToBeDeleted
      }
    });
    this.props.reloadData();
    this.props.snackFunction();
   
  };

  approveQuestionOptions(showAllDetails, data, answer) {
    if (showAllDetails) {
      return (
        <div>
          <GridContainer>
            {data.map((opt, index) => {
              return (
                <GridItem>
                  <strong>Option {index + 1}:</strong> <Latex text={opt} />
                </GridItem>
              );
            })}

            <Divider />
          </GridContainer>
          <GridContainer>
            <GridItem>
              <strong>Correct Option: </strong> {answer}
            </GridItem>
            <Divider />
          </GridContainer>
        </div>
      );
    }
  }
  render() {
    //---------------------------------------------------------------
    //Mutation to delete questions
    const DELETE_QUESTION = gql`
      mutation deleteQuestion($_id: ID!) {
        deleteQuestion(_id: $_id) {
          _id
        }
      }
    `;

    const {
      question,
      showActions,
      actionButtonText,
      actionFunction,
      showSecondaryAction,
      actionSecondaryFunction,
      secondaryActionButtonText,
      showDeleteIcon,
      showAllDetails,
      snackFunction,
      reloadData
    } = this.props;
    return (
      <React.Fragment>
        <GridItem xs={12} sm={12} md={12} ref={this.node}>
          {this.renderDeleteDialog(this.state.dialogDelete)}
          {console.log(question)}
          <CardBody>
            <h4>
              <b>Q: </b>
              <Latex text={question.question} />
              {/*<div>{question.question}</div>*/}
            </h4>
            {this.approveQuestionOptions(
              showAllDetails,
              question.options,
              question.correctOption
            )}
            <p>
              <b>Created By: </b>
              {question.createdBy.name}
              <br />
              <b>Category/Subcategory: </b>
              {question.category.name} - {question.subcategory.name}
              <br />
            </p>
          </CardBody>
          {showActions ? (
            <CardFooter>
              {showDeleteIcon ? (
                <Mutation mutation={DELETE_QUESTION}>
                  {deleteQuestion => {
                    return (
                      <IconButton
                        onClick={() => {
                          this.handleDelete(deleteQuestion, question._id);
                        }}
                      >
                        <Delete />
                      </IconButton>
                    );
                  }}
                </Mutation>
              ) : (
                ""
              )}
              <Button
                round
                variant={"outlined"}
                color="primary"
                onClick={() => {
                  actionFunction(question);
                }}
              >
                {actionButtonText}
              </Button>
              {showSecondaryAction ? (
                <Button
                  round
                  variant={"outlined"}
                  color="secondary"
                  onClick={() => {
                    actionSecondaryFunction(question);
                  }}
                >
                  {secondaryActionButtonText}
                </Button>
              ) : (
                ""
              )}
            </CardFooter>
          ) : (
            ""
          )}
          <Divider />
        </GridItem>
      </React.Fragment>
    );
  }
}

QuestionDetails.propTypes = {
  question: PropTypes.object.isRequired,
  showActions: PropTypes.func.isRequired,
  actionButtonText: PropTypes.string,
  secondaryActionButtonText: PropTypes.string,
  actionFunction: PropTypes.func,
  showSecondaryAction: PropTypes.bool,
  actionSecondaryFunction: PropTypes.func,
  showDeleteIcon: PropTypes.bool,
  deleteFunction: PropTypes.func,
  showAllDetails: PropTypes.bool
};
export default QuestionDetails;
