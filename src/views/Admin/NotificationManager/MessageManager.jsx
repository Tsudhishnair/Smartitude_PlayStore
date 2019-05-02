import React, { Fragment } from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { Mutation, Query } from "react-apollo";
import { CircularProgress, Typography } from "@material-ui/core";
import { EXPANSION_MESSAGE_FORM } from "../../../Utils";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Expansionpanel from "../../../components/ExpansionPanel/Expansionpanel";
import Spacing from "../../../components/Spacing/Spacing";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CardBody from "../../../components/Card/CardBody";
import MUIDataTable from "mui-datatables";
import gql from "graphql-tag";

const header1 = "Create Message";
const header2 = "Create & Send New Message";

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
  },
  {
    name: "Target Batch",
    options: {
      filter: true,
      sort: true
    }
  }
];

// Query to fetch all messages sent to all the batchs
const MESSAGES_FETCH_QUERY = gql`
  {
    messages {
      _id
      title
      description
      batch
    }
  }
`;

const DELETE_MULTIPLE_MESSAGES_QUERY = gql`
  mutation deleteMultipleMessages($_ids: [ID!]!) {
    deleteMultipleMessages(_ids: $_ids)
  }
`;

class MessageManager extends React.Component {
  messageList = [];
  constructor(props) {
    super(props);
    this.deleteMutation;
    this.reloadList = null;
    this.messages = [];
  }

  reloadMessagesList = () => {
    if (this.reloadList !== null) {
      this.reloadList();
    }
  };

  //Deleting messages complete Details
  handleDelete = deleteMessageIds => {
    console.log(deleteMessageIds + "Deleted");
    this.deleteMessagesMutation({
      variables: {
        _ids: deleteMessageIds
      }
    })
      .then(res => {
        // TODO: Show deletion complete messages here
        this.reloadMessagesList();
      })
      .catch(err => {
        // TODO: Show deletion error messages here.
        this.reloadMessagesList();
      });
    this.reloadMessagesList();
  };

  options = {
    filterType: "checkbox",
    rowsPerPage: 20,
    elevation: 0,
    selectableRows: true,
    rowsPerPageOptions: [20, 30, 100, 200],
    onRowsDelete: rowsDeleted => {
      let data = rowsDeleted.data;
      const messagesToDelete = [];
      for (let index in data) {
        messagesToDelete.push(this.messages[data[index].dataIndex]._id);
      }
      this.handleDelete(messagesToDelete);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Query query={MESSAGES_FETCH_QUERY}>
        {({ data, loading, error, refetch }) => {
          this.reloadList = refetch;
          if (loading) {
            return <CircularProgress className={classes.progress}/>;
          } else if (error) {
            return <Typography>Error occured while fetching data!</Typography>;
          } else {
            this.messages = data.messages;
            this.messageList = data.messages.map(message => {
              let messageDetails = [];
              messageDetails.push(message.title);
              messageDetails.push(message.description);
              messageDetails.push(message.batch);
              return messageDetails;
            });
            return (
              <Fragment>
                {console.log(data)}
                {/* not needed to use for quiz */}
                {/* <TableDialog onRef={ref => (this.child = ref)} />   */}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Expansionpanel
                      headers={header1}
                      header={header2}
                      reloadList={this.reloadMessagesList}
                      directingValue={EXPANSION_MESSAGE_FORM}
                    />
                  </GridItem>
                </GridContainer>
                <Spacing/>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Card className={classes.root}>
                      <CardHeader color="warning">
                        <h4 className={classes.cardTitleWhite}>Messages</h4>
                      </CardHeader>
                      <CardBody>
                        <Mutation mutation={DELETE_MULTIPLE_MESSAGES_QUERY}>
                          {deleteMultipleMessages => {
                            this.deleteMessagesMutation = deleteMultipleMessages;
                            return (
                              <Fragment>
                                <MUIDataTable
                                  title={""}
                                  data={this.messageList}
                                  columns={columns}
                                  options={this.options}
                                />
                              </Fragment>
                            );
                          }}
                        </Mutation>
                      </CardBody>
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

MessageManager.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(MessageManager);
