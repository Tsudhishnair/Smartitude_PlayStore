import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import Spacing from "../Spacing/Spacing";
import QuestionDetails from "../../views/General/QuestionDetails";
import DialogQuestion from "./DialogQuestion";

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

// TODO: Delete
let questions = [
  {
    question:
      "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
    options: ["120 metres", "180 metres", "324 metres", "150 metres"],
    timesAttempted: "2",
    timesSolved: "1",
    createdBy: "Django",
    correctOption: "",
    category: "Speed and Distance",
    subcategory: "Problems on Trains"
  },
  {
    question:
      "The length of the bridge, which a train 130 metres long and travelling at 45 km/hr can cross in 30 seconds, is:",
    options: ["120 metres", "180 metres", "324 metres", "150 metres"],
    timesAttempted: "2",
    timesSolved: "1",
    correctOption: "4"
  },
  {
    question:
      "In the first 10 overs of a cricket game, the run rate was only 3.2. What should be the run rate in the remaining 40 overs to reach the target of 282 runs?",
    options: ["120 metres", "180 metres", "324 metres", "150 metres"],
    timesAttempted: "2",
    timesSolved: "1",
    correctOption: "4"
  },
  {
    question:
      "A family consists of two grandparents, two parents and three grandchildren. The average age of the grandparents is 67 years, that of the parents is 35 years and that of the grandchildren is 6 years. What is the average age of the family?",
    options: ["120 metres", "180 metres", "324 metres", "150 metres"],
    timesAttempted: "2",
    timesSolved: "1",
    correctOption: "4"
  },
  {
    question: "Question Question",
    options: ["120 metres", "180 metres", "324 metres", "150 metres"],
    timesAttempted: "2",
    timesSolved: "1",
    correctOption: "4"
  },
  {
    question: "Question Question",
    options: ["120 metres", "180 metres", "324 metres", "150 metres"],
    timesAttempted: "2",
    timesSolved: "1",
    correctOption: "4"
  }
];

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class DialogQuizTable extends React.Component {
  state = {
    open: false,
    openQuestionDialog: false
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

  showQuestionManageDialog = isOpen => {
    if (isOpen) {
      console.log("render dialog called");
      return (<DialogQuestion question={this.state.question} onClose={this.hideQuestionManageDialog}/>);
    }
  };
  hideQuestionManageDialog = isOpen => {
    console.log("close dialog called");
    this.setState({
      openQuestionDialog: false
    });
  };
  triggerQuestionManageDialog = (question) => {
    this.setState({
      ...this.state,
      question,
      openQuestionDialog: true
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;
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
        {this.showQuestionManageDialog(this.state.openQuestionDialog)}
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
            {questions.map(question => {
              return (
                <QuestionDetails
                  question={question}
                  actionButtonText={"Manage Question"}
                  showActions={true}
                  actionFunction={this.triggerQuestionManageDialog}
                  showDeleteIcon={false}
                />
              );
            })}
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
