import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography
} from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import QuizForm from "../../views/Admin/QuizManage/QuizForm";
import CreateFacultyForm from "../../views/Admin/FacultyManage/CreateNewFacultyForm";
import FormAddStudent from "../../views/Admin/StudentManage/FormAddStudent.jsx";
import AddDeptForm from "../../views/Admin/DeptManage/FormAddDepartment.jsx";
import StudentGroupManagement from "../../views/Admin/StudentManage/FormAddStudentBatch";
import FacultyGroupManagement from "../../views/Admin/FacultyManage/FormAddFacultyBatch";

import {
  EXPANSION_QUIZ_FORM,
  EXPANSION_DEPARTMENT_FORM,
  EXPANSION_FACULTY_BATCH,
  EXPANSION_FACULTY_FORM,
  EXPANSION_STUDENT_BATCH,
  EXPANSION_STUDENT_FORM
} from "../../Utils";

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
  render() {
    const { classes, directingValue, header, headers } = this.props;
    let layout;

    if (directingValue == EXPANSION_QUIZ_FORM) {
      layout = <QuizForm />;
    } else if (directingValue == EXPANSION_FACULTY_FORM) {
      layout = <CreateFacultyForm />;
    } else if (directingValue == EXPANSION_STUDENT_BATCH) {
      layout = <StudentGroupManagement />;
    } else if (directingValue == EXPANSION_STUDENT_FORM) {
      layout = <FormAddStudent />;
    } else if (directingValue == EXPANSION_DEPARTMENT_FORM) {
      layout = <AddDeptForm />;
    } else if (directingValue === EXPANSION_FACULTY_BATCH) {
      layout = <FacultyGroupManagement />;
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
        </ExpansionPanel>
      </div>
    );
  }
}

Expansionpanel.propTypes = {
  classes: PropTypes.object.isRequired,
  directingValue: PropTypes.object.isRequired,
  header: PropTypes.object.isRequired,
  headers: PropTypes.object.isRequired,
  Footer1: PropTypes.object.isRequired,
  Footer2: PropTypes.object.isRequired
};

export default withStyles(styles)(Expansionpanel);
