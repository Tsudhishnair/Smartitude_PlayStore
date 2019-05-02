/* eslint-disable */
import React, { Fragment } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import Card from "components/Card/Card.jsx";
import gql from "graphql-tag";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { Query } from "react-apollo";
import { CircularProgress, Typography } from "@material-ui/core";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const columns = [
  {
    name: "Title",
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
  }
];

// Query to fetch all messages sent to all the batchs
const MESSAGES_FETCH_QUERY = gql`
  {
    batchMessages {
      _id
      title
      description
    }
  }
`;
class Notifications extends React.Component {
  options = {
    filterType: "checkbox",
    rowsPerPage: 20,
    elevation: 0,
    selectableRows: false,
    rowsPerPageOptions: [20, 30, 100, 200]
  };
  // to stop the warning of calling setState of unmounted component
  componentWillUnmount() {
    var id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
    }
  }

  constructor(props) {
    super(props);
    this.messageList = [];
  }

  render() {
    const { classes } = this.props;
    return (
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Important</h4>
          <p className={classes.cardCategoryWhite}>
            See the important notifications for your batch below.
          </p>
        </CardHeader>
        <CardBody>
          <Query query={MESSAGES_FETCH_QUERY}>
            {({ data, loading, error, refetch }) => {
              this.reloadList = refetch;
              if (loading) {
                return <CircularProgress className={classes.progress}/>;
              } else if (error) {
                return <Typography>Error occured while fetching data!</Typography>;
              } else {
                // this.messages = data.batchMessages;
                // this.messageList = data.batchMessages.map(message => {
                //   let messageDetails = [];
                //   messageDetails.push(message.title);
                //   messageDetails.push(message.description);
                //   return messageDetails;
                // });
                const snackbars = data.batchMessages.map(message => {
                  const messageView = <Fragment>
                    <b>
                      {message.title}
                    </b>
                    <p>
                      {message.description}
                    </p>
                  </Fragment>;
                  return (

                    <SnackbarContent
                      message={messageView}
                      color="warning"/>
                  );
                });
                return (
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      {snackbars}
                      {/*<MUIDataTable*/}
                      {/*  title={""}*/}
                      {/*  data={this.messageList}*/}
                      {/*  columns={columns}*/}
                      {/*  options={this.options}*/}
                      {/*/>*/}
                    </GridItem>
                  </GridContainer>
                );
              }
            }
            }
          </Query>
        </CardBody>
      </Card>
    );
  }
}

export default withStyles(styles)(Notifications);
