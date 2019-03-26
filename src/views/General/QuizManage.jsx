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
import Button from "../../components/CustomButtons/Button";
import Spacing from "material-ui/styles/spacing";

class QuizManage extends Component {
  render() {
    const { items } = this.props;
    console.log(items);
    
    return (
        <GridContainer>
          {items.map(item => {
              console.log("item");
              console.log(item);
              
              
           return(
            <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardBody>
                <h4>{item.dept_name}</h4>
                <p>{item.dept_desc}</p> 
                blah
              </CardBody>
              <CardFooter>
                <Button
                  round
                  color="success"
                  style={{ marginLeft: "auto" }}
                >
                  Manage
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
           )
          }    
            )}
        </GridContainer>
    );
  }
}
export default QuizManage;
