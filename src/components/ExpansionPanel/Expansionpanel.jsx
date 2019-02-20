import React,{Component} from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions,
  Typography,
  Button,
  Divider
} from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import QuizForm from "../../views/Admin/QuizManage/QuizForm";
import CreateFacultyForm from "../../views/Admin/FacultyManage/CreateNewFacultyForm";
import CreateNewStudentForm from "../../views/Admin/StudentManage/FormAddStudent.jsx";
import AddDeptForm from "../../views/Admin/DeptManage/FormAddDepartment.jsx";
import StudentGroupManagement from "../../views/Admin/StudentManage/FormAddStudentBatch";

const styles = theme => ({
  root: {
    width: "100%",
    padding: "1px"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20
  },
  column: {
    flexBasis: "33.33%"
  },
  details: {
    alignItems: "center"
  },
  formSpacing: {
    flexGrow: 1
  }
});

// TODO: REFACTOR THIS WHOLE THING

class Expansionpanel extends Component {
  render(){
  const { classes, directingValue, header, headers, Footer1, Footer2 } = this.props;
  let layout;

  if (directingValue == "1") {
    layout = <QuizForm />;
  } else if (directingValue == "2") {
    layout = <CreateFacultyForm />;
  } else if (directingValue == "3") {
    layout = <StudentGroupManagement />;
  } else if (directingValue == "4") {
    layout = <CreateNewStudentForm />;
  } else if (directingValue == "5") {
    layout = <AddDeptForm />;
  }

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.column}>
            <Typography className={classes.heading}>{headers}</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              {header}
            </Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.formSpacing}>
          {layout}
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button size="small">{Footer1}</Button>
          <Button size="small" color="primary">
            {Footer2}
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
}
}

Expansionpanel.PropTypes = {
  classes: PropTypes.object.isRequired,
  directingValue: PropTypes.object.isRequired,
  header: PropTypes.object.isRequired,
  headers: PropTypes.object.isRequired,
  Footer1: PropTypes.object.isRequired,
  Footer2: PropTypes.object.isRequired
};

export default withStyles(styles)(Expansionpanel);
