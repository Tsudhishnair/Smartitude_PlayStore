// Component to handle quiz management both in faculty as well as admin quiz management

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Divider, IconButton } from "@material-ui/core";
import GridItem from "../../components/Grid/GridItem";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

class QuestionDetails extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      question,
      showActions,
      actionButtonText,
      actionFunction,
      showSecondaryAction,
      actionSecondaryFunction,
      secondaryActionButtonText,
      showDeleteIcon,
      deleteFunction
    } = this.props;
    return (
      <GridItem xs={12} sm={12} md={12}>
        <CardBody>
          <h4>
            <b>Q:</b> {question.question}
          </h4>
          <p>
            <b>Created By: </b>
            {question.createdBy.name}
            <br />
            <b>Category/Subcategory: </b>
            {question.category.name} - {question.subcategory.name}
            <br />
            <b>Times Attempted: </b>
            {question.timesAttempted}
            &nbsp; &nbsp; &nbsp;
            <b>Times Solved: </b>
            {question.timesSolved}
          </p>
        </CardBody>
        {showActions ? (
          <CardFooter>
            {showDeleteIcon ? (
              <IconButton
                onClick={() => {
                  deleteFunction(question);
                }}
              >
                <DeleteForeverIcon />
              </IconButton>
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
                color="default"
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
  deleteFunction: PropTypes.func
};
export default QuestionDetails;
