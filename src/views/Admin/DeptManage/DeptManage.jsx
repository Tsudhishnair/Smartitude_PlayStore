import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Button from "components/CustomButtons/Button.jsx";
// import Button from '@material-ui/core/Button';

// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import Expansionpanel from "../../../components/ExpansionPanel/Expansionpanel";
import { EXPANSION_DEPARTMENT_FORM } from "../../../Utils";
import DeptDialog from "./DeptDialog";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import DialogDelete from "../../../components/Dialog/DialogDelete";

class DeptManage extends React.Component {
  constructor(props) {
    super(props);
    //state to manage department dialog
    this.state = {
      open: false,
      deptData: {}
    }
  }
  handleUpdate = (data) => {

    if (data) {
      this.setState({
        // ...this.state,
        // open: true,
        deptData: data
      });
      this.toggleDialogVisibility();

    }
  }
  //delete function passsed to the dialog
  handleDelete = (deleteDepartment,data) => {
    deleteDepartment(
      {
        variables:{
          _id:data._id
        }
      }
    );
  }
  toggleDialogVisibility = () => {
    this.setState(prevState => ({
      open: !prevState.open,
    }));
  }

  renderDialog = (isVisible) => {
    if (isVisible) {
      return (
        <DeptDialog
          department={this.state.deptData}
          onClose={this.toggleDialogVisibility} />
      );
    }
  }
  render() {
    const { classes } = this.props;

    // initialise query to get list of all departments
    const deptList = gql`
      {
        departments {
          _id
          name
          description
        }
      }
    `;
    const deletedept = gql`
    mutation deleteDepartment($_id: ID!) {
      deleteDepartment(_id: $_id) {
      _id
      }
    }
    `;

    const header1 = "Dept";
    const header2 = "Add new department";

    return (
      <div>
        {this.renderDialog(this.state.open)}
        <Expansionpanel
          headers={header1}
          header={header2}
          directingValue={EXPANSION_DEPARTMENT_FORM}
        />

        <Query query={deptList}>
          {({ data, loading, error }) => {
            return (
              <GridContainer>
                {!loading
                  ? data.departments.map(department => {
                    return (
                      <React.Fragment key={department._id}>
                        <GridItem xs={12} sm={6} md={4}>
                          <Card>
                            <CardBody>
                              <h4 className={classes.cardTitle}>
                                {department.name}
                              </h4>
                              <p className={classes.cardCategory}>
                                {department.description}
                              </p>
                            </CardBody>
                            <CardFooter>
                              <Mutation mutation={deletedept}>{(deleteDepartment) => {
                                return (
                                  <DeleteForeverIcon className={classes.icon} onClick={e => this.handleDelete(deleteDepartment,department)} />
                                );
                              }}</Mutation>
                              <Button
                                round
                                color="success"
                                style={{ marginLeft: "auto" }}
                                // onClick={this.handleUpdate(department)}
                                onClick={e => this.handleUpdate(department)}
                              >
                                Manage
                                </Button>
                            </CardFooter>
                          </Card>
                        </GridItem>
                      </React.Fragment>
                    );
                  })
                  : ""}
              </GridContainer>
            );
          }}
        </Query>
      </div>
    );
  }
}

DeptManage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(DeptManage);
