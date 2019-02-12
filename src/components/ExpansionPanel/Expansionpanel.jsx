import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import QuizForm from '../../views/Admin/QuestionManage/QuizForm';
import CreateFacultyForm from '../../views/Admin/FacultyManage/CreateNewFacultyForm';
import GroupFaculty from '../../views/Admin/FacultyManage/UploadGroupFacultyForm.1.jsx';
import CreateStudentForm from '../../views/Admin/StudentManage/CNStudForm.jsx';
import AddDeptForm from '../../views/Admin/DeptManage/AddDeptForm.jsx';

const styles = theme => ({
  root: {
    width: '100%',
    padding:"1px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  column: {
    flexBasis: '33.33%',
  },
  details:
  {
    alignItems:'center',
   },
   formSpacing:
   {
     flexGrow:1,

   }
});

function Expansionpanel(props) {
  const { classes } = props;
  let layout;
  if(props.directingValue=="1")
  {
     layout = <QuizForm/>;
  }
  if(props.directingValue=="2")
  {
     layout = <CreateFacultyForm/>;
  }
  if(props.directingValue=="3")
  {
     layout = <GroupFaculty/>;
  }
  if(props.directingValue=="3")
  {
    
    layout = <GroupFaculty/>;     
  }
  if(props.directingValue=="4")
  {
    layout = <CreateStudentForm/>;     
  }
  if(props.directingValue=="5")
  {
    layout = <AddDeptForm/>;     
  }
  return (
    <div className={classes.root}>
    
    <ExpansionPanel >
      </ExpansionPanel>
      <ExpansionPanel >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.column}>
            <Typography className={classes.heading}>{props.headers}</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>{props.header}</Typography>

          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.formSpacing}>
            {layout}
        </ExpansionPanelDetails>
        <Divider/>
        <ExpansionPanelActions>
          <Button size="small">{props.Footer1}</Button>
          <Button size="small" color="primary">
            {props.Footer2}
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
      <ExpansionPanel >
      </ExpansionPanel>
    </div>
  );
}

ExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Expansionpanel);
