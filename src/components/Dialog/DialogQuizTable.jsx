import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import Spacing from "../Spacing/Spacing";
import QuizManage from "../../views/General/QuizManage";

const styles = theme => ({
  appBar: {
    position: "fixed"
  },
  flex: {
    flex: 1
  },
  formControl: {
    margin: 0,
    padding: theme.spacing.unit * 10,
    fullWidth: true,
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 2,
    backgroundColor: "#9ee",
    wrap: "nowrap"
  },
  elementPadding: {
    padding: "15px",
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 10
  },
  container: {
    display: "flex",

    flexGrow: 1
  },
  root: {
    flexGrow: 1,
    marginLeft: 10
  },
  button: {
    margin: theme.spacing.unit * 4
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class DialogQuizTable extends React.Component {
  state = {
    open: false
  };

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;
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
    // const Frameworks = props => {
    //   return (
    //     <React.Fragment>
    //       {props.items.map(item => (
    //         <React.Fragment key={item.id}>
    //           <GridItem xs={12} sm={12} md={12}>
    //             <Card>
    //               <CardBody>
    //                 <h4 className={classes.cardTitle}>{item.dept_name}</h4>
    //                 <p className={classes.cardCategory}>{item.dept_desc}</p>
    //               </CardBody>
    //               <CardFooter>
    //                 <Button
    //                   round
    //                   color="success"
    //                   style={{ marginLeft: "auto" }}
    //                 >
    //                   Manage
    //                 </Button>
    //               </CardFooter>
    //             </Card>
    //             <Spacing />
    //           </GridItem>
    //         </React.Fragment>
    //       ))}
    //     </React.Fragment>
    //   );
    // };
    return (
      <div>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
          style={{ backgroundColor: "transparent" }}
          overlayStyle={{ backgroundColor: "transparent" }}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={this.handleClose}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h7" color="inherit" className={classes.flex}>
                Quiz
              </Typography>
              {/*<Button color="inherit" onClick={this.handleClose}>*/}
              {/*save*/}
              {/*</Button>*/}
            </Toolbar>
          </AppBar>
          <Spacing />
          <GridContainer style={{ padding: "1%" }}>
            <GridItem xs={12} sm={12} md={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    Quiz ID
                  </Typography>
                  <Typography variant="h5" component="h2">
                    Quiz Name Comes Here
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    description description description description description
                    description description description description
                  </Typography>
                  <Spacing />
                  <GridContainer>
                    <GridItem xs={12} sm={3} md={3}>
                      <Typography component="p">
                        <b>Created by: &emsp;</b>
                        {"Faculty Name"}
                      </Typography>
                    </GridItem>
                    <GridItem xs={12} sm={3} md={3}>
                      <Typography component="p">
                        <b>Targeted:</b>
                        &emsp;
                        {"2015"}
                      </Typography>
                    </GridItem>
                    <GridItem xs={12} sm={3} md={3}>
                      <Typography component="p">
                        <b>Active:</b>
                        &emsp;
                        {"Faculty Name"}
                      </Typography>
                    </GridItem>
                    <GridItem xs={12} sm={3} md={3}>
                      <Typography component="p">
                        <b>Expiry:</b>
                        &emsp;
                        {"Faculty Name"}
                      </Typography>
                    </GridItem>
                  </GridContainer>
                </CardContent>
              </Card>
            </GridItem>
          </GridContainer>
       
          <GridContainer style={{ padding: "2%" }}>
            <QuizManage items={data} />
          </GridContainer>
        </Dialog>
      </div>
    );
  }
}

DialogQuizTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DialogQuizTable);
