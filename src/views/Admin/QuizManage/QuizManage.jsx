import React, { Fragment } from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { CircularProgress, Typography } from "@material-ui/core";
// core components
import MUIDataTable from "mui-datatables";
import GridItem from "../../../components/Grid/GridItem.jsx";
import GridContainer from "../../../components/Grid/GridContainer.jsx";
import Expansionpanel from "../../../components/ExpansionPanel/Expansionpanel";
import Card from "../../../components/Card/Card.jsx";
import CardHeader from "../../../components/Card/CardHeader.jsx";
import Spacing from "../../../components/Spacing/Spacing.jsx";
import { EXPANSION_QUIZ_FORM, transformDateString } from "../../../Utils";
import CardBody from "../../../components/Card/CardBody";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import QuizzesDialog from "../../../components/Dialog/DialogQuizzes";

const myTheme = createMuiTheme({
  overrides: {
    MUIDataTable: {
      responsiveScroll: {
        maxHeight: "none"
      }
    }
  }
});
const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 6
  },
  progress: {
    margin: theme.spacing.unit * 10,
    marginTop: "10%",
    marginLeft: "45%"
  }
});

const QUIZ_VIEW_QUERY = gql`
  {
    adminQuizzes {
      _id
      name
      description
      target
      active
      activeTo
    }
  }
`;
let quizList = [];

const header1 = "Quiz";
const header2 = "Create & Assign Quiz";

const columns = [
  {
    name: "QuizName",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "Description",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "Target",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Active",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "Expiry",
    options: {
      filter: false,
      sort: true,
      sortDirection: "desc"
    }
  }
];

class QuizManage extends React.Component {
  reloadList = null;

  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      open: false
    };

    this.quizzes;
    this.selectedQuiz;
  }

  options = {
    filterType: "checkbox",
    rowsPerPage: 20,
    responsive: "scroll",
    selectableRows: false,
    elevation: 0,
    rowsPerPageOptions: [20, 30, 100, 200, 700],
    onRowClick: (rowData, rowState) => {
      this.selectedQuiz = this.quizzes[rowState.dataIndex];
      this.toggleQuizzesDialog();
    }
  };

  reloadQuizList = () => {
    if (this.reloadList !== null) {
      this.reloadList();
    }
  };

  toggleQuizzesDialog = () => {
    this.setState(prevState => ({
      ...prevState,
      open: !prevState.open
    }));
  };

  renderQuizDialog = isVisible => {
    if (isVisible) {
      return (
        <QuizzesDialog
          object={this.selectedQuiz}
          onClose={this.toggleQuizzesDialog}
        />
      );
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        {this.renderQuizDialog(this.state.open)}
        <Query query={QUIZ_VIEW_QUERY}>
          {({ data, loading, error, refetch }) => {
            this.reloadList = refetch;
            if (loading) {
              return <CircularProgress className={classes.progress} />;
            } else if (error) {
              return (
                <Typography>Error occured while fetching data!</Typography>

              );
            } else {
              quizList = data.adminQuizzes.map(data => {
                let quizData = [];
                quizData.push(data.name);
                quizData.push(data.description);
                quizData.push(data.target);
                data.active ? quizData.push("Yes") : quizData.push("No");
                quizData.push(transformDateString(data.activeTo));
                return quizData;
              });

              this.quizzes = data.adminQuizzes;

              return (
                <Fragment>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Expansionpanel
                        headers={header1}
                        header={header2}
                        reloadList={this.reloadQuizList}
                        directingValue={EXPANSION_QUIZ_FORM}
                      />
                    </GridItem>
                  </GridContainer>
                  <Spacing />
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Card className={classes.root}>
                        <CardHeader color="danger">
                          <h4 className={classes.cardTitleWhite}>Quizzes</h4>
                        </CardHeader>
                        <CardBody>
                          <MuiThemeProvider theme={myTheme}>
                            <MUIDataTable
                              title={""}
                              data={quizList}
                              columns={columns}
                              options={this.options}
                            />
                          </MuiThemeProvider>
                        </CardBody>
                      </Card>
                    </GridItem>
                  </GridContainer>
                </Fragment>
              );
            }
          }}
        </Query>
      </React.Fragment>
    );
  }
}

QuizManage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QuizManage);
