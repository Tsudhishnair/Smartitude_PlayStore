// Component to handle quiz management both in faculty as well as admin quiz management

import React, { Component } from "react";
import GridItem from "../../components/Grid/GridItem";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import { Button, Divider } from "@material-ui/core";
class QuizManage extends Component {
  render() {
    const { items,button } = this.props;
    console.log(items);

    return (
      <GridContainer>
        {items.map(item => {
          return (
            <GridItem xs={12} sm={12} md={12}>
              <CardBody>
                <h4>
                  <b>Q:</b> {item.question}
                </h4>

                <p>
                  <b>Created By: </b>
                  {item.createdBy}
                  <br />
                  <b>Category/Subcategory: </b>
                  {item.category} - {item.subcategory}
                  <br />
                  <b>Times Attempted: </b>
                  {item.timesAttempted}
                  &nbsp; &nbsp; &nbsp;
                  <b>Times Solved: </b>
                  {item.timesSolved}
                </p>
              </CardBody>
              <CardFooter>
                <Button
                  round
                  variant={"outlined"}
                
                >
                  {button}
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
