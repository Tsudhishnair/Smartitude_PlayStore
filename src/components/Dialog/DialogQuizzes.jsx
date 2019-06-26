import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import MUIDataTable from "mui-datatables";

import {
  AppBar,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
  Toolbar,
  Typography
} from "@material-ui/core";

import { Close } from "@material-ui/icons";

import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Spacing from "../../components/Spacing/Spacing.jsx";

import MessageDialog from "./MessageDialog";

import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { transformDateString } from "../../Utils";
import formControlStyle from "../../assets/jss/form-control";

const columns = [
  {
    name: "Name",
    options: {
      filter: false,
      sort: true,
      sortDirection: "desc"
    }
  },
  {
    name: "Department",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Score",
    options: {
      filter: false,
      display: true,
      sort: true
    }
  },
  {
    name: "Submitted At",
    options: {
      filter: false,
      display: true,
      sort: true
    }
  }
];

// list all attempts made by students for the quiz chosen
const GET_ADMIN_QUIZ_ATTEMPTS = gql`
  query getAdminQuizAttempts($quizId: ID!) {
    getAdminQuizAttempts(quizId: $quizId) {
      _id
      totalScore
      totalMaximumScore
      submittedAt
      attemptedBy {
        name
        department {
          name
        }
      }
    }
  }
`;

const RESET_QUIZ_PROGRESS = gql`
  mutation reactivateAdminQuizForStudent($attemptedAdminQuizId: ID!) {
    reactivateAdminQuizForStudent(attemptedAdminQuizId: $attemptedAdminQuizId)
  }
`;

//transition component for the dialog box
function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class QuizzesDialog extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      open: true,
      resetOpen: false
    };

    this.attemptList;
  }

  //mui datatable options
  options = {
    selectableRows: false,
    elevation: 0,
    responsive: "scroll",
    rowsPerPage: 100,
    rowsPerPageOptions: [20, 30, 100, 200, 1000],
    onRowClick: (rowData, rowState) => {
      this.toggleResetDialog();

      this.selectedAttempt = this.attemptList[rowState.dataIndex];
    }
  };

  // opens dialog box
  handleDialogOpen = () => {
    this.setState({ open: true });
  };

  // close dialogbox, also call close in parent
  handleDialogClose = () => {
    this.setState({ open: false });
    this.props.onClose();
  };

  resetProgress = resetAttempt => {
    resetAttempt({
      variables: {
        attemptedAdminQuizId: this.selectedAttempt._id
      }
    })
      .then(res => console.log("success"))
      .catch(err => console.log(err));
  };

  toggleResetDialog = () => {
    this.setState(prevState => ({
      resetOpen: !prevState.resetOpen
    }));
  };

  renderResetDialog = () => {
    if (this.state.resetOpen) {
      return (
        <Mutation mutation={RESET_QUIZ_PROGRESS}>
          {resetAttempt => (
            <MessageDialog
              title="Progress Reset"
              content="Are you sure you want to reset the progress of the student in this quiz"
              positiveAction="Yes"
              negativeAction="No"
              action={() => this.resetProgress(resetAttempt)}
              onClose={this.toggleResetDialog}
            />
          )}
        </Mutation>
      );
    }
  };

  render() {
    const { classes, object } = this.props;

    //store variable to be passed for query
    const variables = {
      quizId: this.props.object._id
    };

    return (
      <div>
        {this.renderResetDialog()}
        <Dialog
          fullScreen
          TransitionComponent={Transition}
          open={this.state.open}
          onClose={this.handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
          maxWidth={"xs"}
        >
          {/* appbar used to display orange top banner */}
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                style={{ color: "white" }}
                onClick={this.handleDialogClose}
                aria-label="Close"
              >
                <Close/>
              </IconButton>
              <Typography
                variant="h6"
                style={{ color: "white", textTransform: "capitalize" }}
                className={classes.flex}
              >
                {object.name}
              </Typography>
            </Toolbar>
          </AppBar>
          {/* empty dialog title used to introduce spacing */}
          <DialogTitle id="form-dialog-title"/>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Query query={GET_ADMIN_QUIZ_ATTEMPTS} variables={variables}>
                    {({ loading, error, data }) => {
                      if (loading) {
                        return (
                          <CircularProgress className={classes.progress}/>
                        );
                      } else if (error) {
                        return (
                          <Typography>
                            No students has attempted this quiz yet!
                          </Typography>
                        );
                      } else {
                        this.attemptList = data.getAdminQuizAttempts;

                        let quizList;
                        //transform data for datatable
                        quizList = data.getAdminQuizAttempts.map(quiz => {
                          let quizData = [];
                          quizData.push(quiz.attemptedBy.name);
                          quizData.push(quiz.attemptedBy.department.name);
                          quizData.push(quiz.totalScore.toString());
                          quizData.push(transformDateString(quiz.submittedAt));
                          return quizData;
                        });

                        return (
                          <React.Fragment>
                            <GridContainer>
                              <GridItem xs={12} md={6}>
                                <Typography align="left" variant="h6" inline>
                                  {quizList.length}
                                </Typography>
                                <Typography inline>
                                  {"  "}
                                  students have attempted this quiz
                                </Typography>
                              </GridItem>
                              <GridItem xs={12} md={6}>
                                <Typography inline>Maximum score:</Typography>
                                <Typography variant="h6" inline>
                                  {"   "}
                                  {data.getAdminQuizAttempts[0]
                                    ? data.getAdminQuizAttempts[0]
                                      .totalMaximumScore
                                    : "No Submissions"}
                                </Typography>
                              </GridItem>
                            </GridContainer>
                            <Spacing/>
                            <MUIDataTable
                              title={data.name}
                              data={quizList}
                              columns={columns}
                              options={this.options}
                            />
                          </React.Fragment>
                        );
                      }
                    }}
                  </Query>
                </GridItem>
              </GridContainer>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

QuizzesDialog.propTypes = {
  onClose: PropTypes.func,
  object: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(formControlStyle)(QuizzesDialog);
