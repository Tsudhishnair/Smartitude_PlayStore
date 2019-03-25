import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import TableDialog from "../../../components/Dialog/DialogQuizTable";
import Spacing from "../../../components/Spacing/Spacing.jsx";
import Button from "components/CustomButtons/Button";
import { Link } from "react-router-dom";

class Dashboard extends React.Component {
  render() {
    const { classes } = this.props;
    let data = [
      {
        dept_id: "124",
        dept_name: "Question Question",
        dept_desc:
          "Division of Computing Sciences laid its foundation stone in the year 2001 with the commencement of a B. Tech. programme in Computer Science & Engineering."
      },
      {
        dept_id: "123",
        dept_name: "Question Question",
        dept_desc:
          "Division of Computing Sciences laid its foundation stone in the year 2001 with the commencement of a B. Tech. programme in Computer Science & Engineering."
      },
      {
        dept_id: "124",
        dept_name: "Question Question",
        dept_desc:
          "Division of Computing Sciences laid its foundation stone in the year 2001 with the commencement of a B. Tech. programme in Computer Science & Engineering."
      },
      {
        dept_id: "124",
        dept_name: "Question Question",
        dept_desc:
          "Division of Computing Sciences laid its foundation stone in the year 2001 with the commencement of a B. Tech. programme in Computer Science & Engineering."
      },
      {
        dept_id: "124",
        dept_name: "Question Question",
        dept_desc:
          "Division of Computing Sciences laid its foundation stone in the year 2001 with the commencement of a B. Tech. programme in Computer Science & Engineering."
      },
      {
        dept_id: "124",
        dept_name: "Question Question",
        dept_desc:
          "Division of Computing Sciences laid its foundation stone in the year 2001 with the commencement of a B. Tech. programme in Computer Science & Engineering."
      }
    ];
    const Frameworks = props => {
      return (
        <React.Fragment>
          {props.items.map(item => (
            <React.Fragment key={item.id}>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardBody>
                    <h4 className={classes.cardTitle}>{item.dept_name}</h4>
                    <p className={classes.cardCategory}>{item.dept_desc}</p>
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
                <Spacing />
              </GridItem>
            </React.Fragment>
          ))}
        </React.Fragment>
      );
    };

    return (
      <div>
        <GridItem xs={12} sm={2} md={2}>
          <Link to="/faculty/questions/add">
            <Button fullWidth color="primary" className={classes.button}>
              Add a new Question
            </Button>
          </Link>
        </GridItem>
        <TableDialog onRef={ref => (this.child = ref)} />
        <Spacing />
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card className={classes.root}>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Questions</h4>
              </CardHeader>
              <GridContainer style={{ padding: "2%" }}>
                <Frameworks items={data} />
              </GridContainer>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
