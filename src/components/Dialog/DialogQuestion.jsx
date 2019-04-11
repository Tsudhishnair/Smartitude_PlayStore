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
import AddQuestion from "../../views/Faculty/AddQuestion/AddQuestion";

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
class DialogQuestion extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: true
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.onClose();
  };

  render() {
    const { classes, question } = this.props;

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
                Question
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
                  {/*<Typography*/}
                  {/*  className={classes.title}*/}
                  {/*  color="textSecondary"*/}
                  {/*  gutterBottom*/}
                  {/*>*/}
                  {/*  Quiz ID*/}
                  {/*</Typography>*/}
                  {/*<Typography variant="h5" component="h2">*/}
                  {/*  Quiz Name Comes Here*/}
                  {/*</Typography>*/}
                  {/*<Typography className={classes.pos} color="textSecondary">*/}
                  {/*  description description description description description*/}
                  {/*  description description description description*/}
                  {/*</Typography>*/}
                  {/*<Spacing/>*/}
                  <GridContainer>
                    <GridItem xs={12} sm={3} md={3}>
                      <Typography component="p">
                        <b>Created by: &emsp;</b>
                        {question.createdBy.name}
                      </Typography>
                    </GridItem>
                    <GridItem xs={12} sm={3} md={3}>
                      <Typography component="p">
                        <b>Created On:</b>
                        &emsp;
                        {question.createdAt}
                      </Typography>
                    </GridItem>
                  </GridContainer>
                </CardContent>
              </Card>
            </GridItem>
          </GridContainer>
          <GridContainer style={{ padding: "3%" }}>
            <GridItem xs={12} sm={12} md={12}>
              <AddQuestion question={question} isEdit={true} fullwidth />
            </GridItem>
          </GridContainer>
        </Dialog>
      </div>
    );
  }
}

DialogQuestion.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired
};

export default withStyles(styles)(DialogQuestion);
