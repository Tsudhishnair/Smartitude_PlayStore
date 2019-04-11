import React, { Fragment } from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import Expansionpanel from "../../../components/ExpansionPanel/Expansionpanel";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import MUIDataTable from "mui-datatables";
import Spacing from "../../../components/Spacing/Spacing.jsx";
import { EXPANSION_QUIZ_FORM } from "../../../Utils";
import { CircularProgress } from "@material-ui/core";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 6
  },
  progress: {
    margin: theme.spacing.unit * 10,
    marginLeft: theme.spacing.unit * 20
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
      activeFrom
      negativeMarkPerQuestion
      markPerQuestion
    }
  }
`;
let quizList = [];
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
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
          sort: true,
          display: false
        }
      },
      {
        name: "Created By",
        options: {
          filter: true,
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
          sort: true
        }
      }
    ];

    const testData = [
      [
        "Preliminary Round 1st Years",
        "uxxxxx",
        "Admin",
        "2022",
        "YES",
        "29/05/19"
      ],
      [
        "Preliminary Round 2nd Years",
        "uxxxxx",
        "Django",
        "2019",
        "YES",
        "13/05/19"
      ],
      [
        "Preliminary Round 3rdd Years",
        "uxxxxx",
        "Admin",
        "2019",
        "YES",
        "30/05/19"
      ]
    ];

    const options = {
      filterType: "checkbox",
      rowsPerPage: 20,
      elevation: 0,
      selectableRows: false,
      rowsPerPageOptions: [20, 30, 100, 200]
    };

    return (
      <Query query={QUIZ_VIEW_QUERY}>
        {({ data, loading, error }) => {
          if (loading) {
            return <CircularProgress className={classes.progress}/>;
          } else if (error) {
            return <Typography>Error occured while fetching data!</Typography>;
          } else {
            quizList = data.adminQuizzes.map(data => {
              let quizData = [];
              quizData.push(data.name);
              quizData.push(data.description);
              quizData.push(data.name);
              quizData.push(data.target);
              quizData.push(data.active.toString());
              quizData.push(data.activeTo);
              let a = new Date(data.activeTo);
              console.log(a);
              
              return quizData;
            });
            return (
              <Fragment>
                
              {console.log(data)
              }
                {/* not needed to use for quiz */}
                {/* <TableDialog onRef={ref => (this.child = ref)} />   */}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Expansionpanel
                      headers={header1}
                      header={header2}
                      directingValue={EXPANSION_QUIZ_FORM}
                    />
                  </GridItem>
                </GridContainer>
                <Spacing/>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Card className={classes.root}>
                      <CardHeader color="warning">
                        <h4 className={classes.cardTitleWhite}>Quizzes</h4>
                      </CardHeader>
                      <MUIDataTable
                        title={""}
                        data={quizList}
                        columns={columns}
                        options={options}
                      />
                    </Card>
                  </GridItem>
                </GridContainer>
              </Fragment>
            );
          }
        }}
      </Query>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
