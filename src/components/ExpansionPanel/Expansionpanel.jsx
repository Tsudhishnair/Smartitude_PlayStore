import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography
} from "@material-ui/core";
import ExpandMore from "@material-ui/icons/ExpandMore";
import QuizForm from "../../views/Admin/QuizManage/QuizForm";
import CreateNewFacultyForm from "../../views/Admin/FacultyManage/CreateNewFacultyForm";
import FormAddStudent from "../../views/Admin/StudentManage/FormAddStudent.jsx";
import FormAddDepartment from "../../views/Admin/DeptManage/FormAddDepartment.jsx";
import FormAddStudentBatch from "../../views/Admin/StudentManage/FormAddStudentBatch";
import FormAddFacultyBatch from "../../views/Admin/FacultyManage/FormAddFacultyBatch";
import FormAddCategory from "../../views/Admin/CategoryManagement/FormAddCategory";
import FormAddSubcategory from "../../views/Admin/CategoryManagement/FormAddSubcategory";
import {
  EXPANSION_CATEGORY_FORM,
  EXPANSION_DEPARTMENT_FORM,
  EXPANSION_FACULTY_BATCH,
  EXPANSION_FACULTY_FORM,
  EXPANSION_MESSAGE_FORM,
  EXPANSION_QUIZ_FORM,
  EXPANSION_STUDENT_BATCH,
  EXPANSION_STUDENT_FORM,
  EXPANSION_SUBCATEGORY_FORM
} from "../../Utils";
import FormCreateMessage from "../../views/Admin/NotificationManager/FormCreateMessage";

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
    flexGrow: 1,
    marginBottom: 0,
    paddingBottom: 0
  }
});

// TODO: REFACTOR THIS WHOLE THING

class Expansionpanel extends Component {
  render() {
    const { classes, directingValue, header, headers } = this.props;
    let layout;

    if (directingValue === EXPANSION_QUIZ_FORM) {
      layout = <QuizForm quizType={false} reloadList={this.props.reloadList}/>;
    } else if (directingValue === EXPANSION_FACULTY_FORM) {
      layout = (
        <CreateNewFacultyForm
          categoryDetails={this.props.categoryDetails}
          departments={this.props.departments}
          reloadFacultiesList={this.props.reloadList}
        />
      );
    } else if (directingValue === EXPANSION_STUDENT_BATCH) {
      layout = (
        <FormAddStudentBatch
          reloadStudentsList={this.props.reloadList}
        />
      );
    } else if (directingValue === EXPANSION_STUDENT_FORM) {
      layout = (
        <FormAddStudent reloadStudentsList={this.props.reloadList}/>
      );
    } else if (directingValue === EXPANSION_DEPARTMENT_FORM) {
      layout = <FormAddDepartment reloadDepartmentsList={this.props.reloadList}/>;
    } else if (directingValue === EXPANSION_FACULTY_BATCH) {
      layout = <FormAddFacultyBatch reloadFacultiesList={this.props.reloadList}/>;
    } else if (directingValue === EXPANSION_CATEGORY_FORM) {
      layout = <FormAddCategory reloadList={this.props.reloadList}/>;
    } else if (directingValue === EXPANSION_SUBCATEGORY_FORM) {
      layout = <FormAddSubcategory categories={this.props.categories} reloadList={this.props.reloadList}/>;
    } else if (directingValue === EXPANSION_MESSAGE_FORM) {
      layout = <FormCreateMessage reloadList={this.props.reloadList}/>;
    }

    return (
      <div className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
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
  Footer2: PropTypes.object.isRequired,
  categories: PropTypes.object,
  categoryDetails: PropTypes.object,
  departments: PropTypes.object,
  reloadList: PropTypes.func
};

export default withStyles(styles)(Expansionpanel);
