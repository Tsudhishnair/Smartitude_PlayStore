// Component to handle quiz management both in faculty as well as admin quiz management

import React, { Component } from "react";
// core components
import GridItem from "../../components/Grid/GridItem";
// import GridContainer from "components/Grid/GridContainer.jsx";
// import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import Card from "../../components/Card/Card.jsx";
// import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";

// import TableDialog from "../../../components/Dialog/DialogQuizTable";

import GridContainer from "../../components/Grid/GridContainer.jsx";
import { Button, Divider } from "@material-ui/core";
class QuizManage extends Component {
  render() {
    const { items } = this.props;
    console.log(items);

    return (
      <GridContainer>
        {items.map(item => {
          console.log("item");
          console.log(item);

          return (
            <GridItem xs={12} sm={12} md={12}>
              <CardBody>
                <h4>
                  <b>Q:</b> {item.question}
                </h4>
                <p>
                  <b>Created By: </b>
                  {item.createdBy}
                  <b>Category/Subcategory:</b>
                  {item.category} - {item.subcategory}
                </p>
              </CardBody>
              <CardFooter>
                <Button
                  round
                  variant={"outlined"}
                  color="primary"
                  style={{ marginLeft: "auto" }}
                >
                  Manage Question
                </Button>
              </CardFooter>
              <Divider />
            </GridItem>
          );
        })}
      </GridContainer>
    );
  }
}
export default QuizManage;
