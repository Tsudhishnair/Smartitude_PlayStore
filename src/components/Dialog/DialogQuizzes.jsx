import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import MUIDataTable from "mui-datatables";

import {
  AppBar,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
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

import gql from "graphql-tag";
import { Query } from "react-apollo";
import { transformDateString } from "../../Utils";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  formControl: {
    margin: 0,
    padding: theme.spacing.unit * 10,
    fullWidth: true,
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 2,
    minWidth: theme.spacing.unit * 5,
    wrap: "nowrap"
  },
  elementPadding: {
    padding: "15px",
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 10
  },
  container: {
    display: "flex",

    flexGrow: 1
  },
  root: {
    flexGrow: 1,
    marginLeft: 10
  },
  button: {
    margin: theme.spacing.unit * 4
  },
  progress: {
    margin: theme.spacing.unit * 10,
    marginTop: "10%",
    marginLeft: "45%"
  }
});

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
      filter: true,
      display: true,
      sort: true
    }
  },
  {
    name: "Submitted At",
    options: {
      filter: true,
      display: true,
      sort: true
    }
  }
];

// list all attempts made by students for the quiz chosen
const GET_ADMIN_QUIZ_ATTEMPTS = gql`
  query getAdminQuizAttempts($quizId: ID!) {
    getAdminQuizAttempts(quizId: $quizId) {
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

//mui datatable options
const options = {
  selectableRows: false,
  rowsPerPageOptions: [20, 30, 100, 200, 700]
};

//transition component for the dialog box
function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class QuizzesDialog extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      open: true
    };
  }

  // opens dialog box
  handleDialogOpen = () => {
    this.setState({ open: true });
  };

  // close dialogbox, also call close in parent
  handleDialogClose = () => {
    this.setState({ open: false });
    this.props.onClose();
  };

  render() {
    const { classes, object } = this.props;

    //store variable to be passed for query
    const variables = {
      quizId: this.props.object._id
    };

    return (
      <div>
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
                color="inherit"
                onClick={this.handleDialogClose}
                aria-label="Close"
              >
                <Close />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                {object.name}
              </Typography>
              <Button color="inherit" onClick={this.handleDialogClose}>
                Ok
              </Button>
            </Toolbar>
          </AppBar>
          {/* empty dialog title used to introduce spacing */}
          <DialogTitle id="form-dialog-title" />
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Query query={GET_ADMIN_QUIZ_ATTEMPTS} variables={variables}>
                    {({ loading, error, data }) => {
                      if (loading) {
                        return (
                          <CircularProgress className={classes.progress} />
                        );
                      } else if (error) {
                        return (
                          <Typography>
                            No students has attempted this quiz yet!
                          </Typography>
                        );
                      } else {

                        //transform data for datatable
                        let quizList;
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
                                  {
                                    data.getAdminQuizAttempts[0]
                                      ? data.getAdminQuizAttempts[0]
                                        .totalMaximumScore : "No Submissions"
                                  }
                                </Typography>
                              </GridItem>
                            </GridContainer>
                            <Spacing />
                            <MUIDataTable
                              title={data.name}
                              data={quizList}
                              columns={columns}
                              options={options}
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
          <DialogActions>
            <Button onClick={this.handleDialogClose} color="primary">
              {"OK"}
            </Button>
          </DialogActions>
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

export default withStyles(styles)(QuizzesDialog);
