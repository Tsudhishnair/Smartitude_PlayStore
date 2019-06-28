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
import CustomSnackbar from "../../../components/Snackbar/CustomSnackbar";
import DialogQuestion from "../../../components/Dialog/DialogQuestion";
import gql from "graphql-tag";
import Typography from "@material-ui/core/Typography";
import { Query } from "react-apollo";

import SearchInput, { createFilter } from "react-search-input";
// core components

const styles = theme => ({
  searchRoot: {
    padding: "2px 4px",
    display: "flex",
    marginLeft: theme.spacing.units * 2,
    alignItems: "center",
    float: "right",
    background: "transparent"
  },
  searchInput: {
    flex: 1,
    alignItems: "center"
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

const KEYS_TO_FILTERS = ["question", "correctOption"];

class MyQuestionsManage extends React.Component {
  constructor(props) {
    super(props);
    this.reloadList = undefined;
    this.state = {
      open: false,
      searchTerm: "",
      snackbar: {
        open: false,
        message: "Question Deleted Successfully",
        variant: "success"
      }
    };
    this.searchUpdated = this.searchUpdated.bind(this);
  }

  showQuestionManageDialog = isOpen => {
    if (isOpen) {
      console.log("render dialog called");
      return (
        <DialogQuestion
          question={this.state.question}
          onSuccess={this.reloadQuestionsList}
          onClose={this.hideQuestionManageDialog}
        />
      );
    }
  };
  //snackbar for deletion
  openSnackbar = () => {
    console.log("snackbar is open");
    this.setState({
      snackbar: {
        ...this.state.snackbar,
        open: true
      }
    });
    setTimeout(() => {
      this.setState({
        snackbar: {
          ...this.state.snackbar,
          open: false
        }
      });
    }, 4000);
  };
  closeSnackbar = () => {
    console.log("snackbar is closed");
    this.setState({
      snackbar: {
        ...this.state.snackbar,
        open: false
      }
    });
  };

  hideQuestionManageDialog = isOpen => {
    console.log("close dialog called");
    this.setState({
      open: false
    });
    this.reloadQuestionsList();
  };
  triggerQuestionManageDialog = question => {
    this.setState({
      ...this.state,
      question,
      open: true
    });
  };

  reloadQuestionsList() {
    if (this.reloadList !== null) {
      this.reloadList();
      this.firstLoad = true;
    }
  }
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
      <Query query={RETRIVE_QUESTIONS} fetchPolicy="network-only">
        {({ data, loading, error, refetch }) => {
          this.reloadList = refetch;
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
                        <SearchInput
                          className={classes.searchInput}
                          sortResults={"true"}
                          style={{ marginLeft: "10px" }}
                          fuzzy={"true"}
                          onChange={this.searchUpdated}
                          placeholder="Search Questions..."
                        />
                      </div>
                      <GridContainer style={{ padding: "2%" }}>
                        {data.myQuestions
                          .filter(
                            createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
                          )
                          .map(question => {
                            return (
                              <QuestionDetails
                                key={question._id}
                                question={question}
                                showActions={question.approvalStatus !== 2}
                                actionButtonText={"Manage Question"}
                                actionFunction={
                                  this.triggerQuestionManageDialog
                                }
                                showDeleteIcon={true}
                                snackFunction={this.openSnackbar}
                                reloadData={this.reloadList}
                              />
                            );
                          })}
                      </GridContainer>
                    </Card>
                  </GridItem>
                  <CustomSnackbar
                    onClose={this.closeSnackbar}
                    variant={this.state.snackbar.variant}
                    open={this.state.snackbar.open}
                    message={this.state.snackbar.message}
                  />
                </GridContainer>
              </div>
            );
          }
        }}
      </Query>
    );
  }
  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }
}

MyQuestionsManage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MyQuestionsManage);
