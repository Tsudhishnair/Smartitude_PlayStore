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
import DialogQuestion from "../../../components/Dialog/DialogQuestion";
import gql from "graphql-tag";
import Typography from "@material-ui/core/Typography";
import { Query } from "react-apollo";
import Fuse from "fuse.js";

import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
// core components

const styles = theme => ({
  searchRoot: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    float: "right",
    background: "transparent"
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  }
});

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

    var options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ["question", "myQuestions.firstName"]
    };

    var fuse = new Fuse(RETRIVE_QUESTIONS, options);

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
                <Spacing />
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Card className={classes.root}>
                      <CardHeader color="warning">
                        <h4 className={classes.cardTitleWhite}>Questions</h4>
                      </CardHeader>
                      <Spacing />
                      <div className={classes.searchRoot} elevation={1}>
                        <InputBase
                          className={classes.input}
                          placeholder="Search Questions"
                        />
                        <IconButton
                          className={classes.iconButton}
                          aria-label="Search"
                        >
                          <SearchIcon />
                        </IconButton>
                      </div>
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

export default withStyles(styles)(MyQuestionsManage);
