import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Auto from "@material-ui/icons/Autorenew";
import Assessment from "@material-ui/icons/Assessment";
import Assignment from "@material-ui/icons/Assignment";
// core components
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import InfoArea from "../../components/InfoArea/InfoArea.jsx";

import productStyle from "assets/jss/material-dashboard-react/components/productStyle.jsx";

class ProductSection extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>Let's talk smart!</h2>
            <h5 className={classes.description}>
              College students lack a central and organized system where they can take aptitude tests to practice for their placement drives. The applications that already exist don’t offer many features other than the ability to attend tests and viewing the result along with the right answers.
            </h5>
          </GridItem>
        </GridContainer>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Automated Correction"
                description="Primarily, a Smartitude user can take aptitude tests and view its results as well as the right answers as soon as the test is over."
                icon={Auto}
                iconColor="info"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Weekly Leader Boards"
                description="A weekly scoreboard displaying the weekly top performers are generated."
                icon={Assessment}
                iconColor="success"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Report Generation"
                description="Separate downloadable report generation for students, teachers and placement cell officers."
                icon={Assignment}
                iconColor="danger"
                vertical
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(productStyle)(ProductSection);
