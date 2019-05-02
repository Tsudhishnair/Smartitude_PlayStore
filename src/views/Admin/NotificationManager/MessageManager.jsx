import React, { Fragment } from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { Query } from "react-apollo";
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

const options = {
  filterType: "checkbox",
  rowsPerPage: 20,
  elevation: 0,
  responsive: "scroll",
  selectableRows: false,
  rowsPerPageOptions: [20, 30, 100, 200]
};

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
let messageList = [];

class MessageManager extends React.Component {
  reloadList = null;

  constructor(props) {
    super(props);
  }

  reloadMessagesList = () => {
    if (this.reloadList !== null) {
      this.reloadList();
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
            messageList = data.messages.map(message => {
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
                        <MUIDataTable
                          title={""}
                          data={messageList}
                          columns={columns}
                          options={options}
                        />
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
