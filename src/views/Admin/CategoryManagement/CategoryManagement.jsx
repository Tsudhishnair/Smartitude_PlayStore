import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Expansionpanel from "../../../components/ExpansionPanel/Expansionpanel";

import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CategoryDialog from "../../../components/Dialog/DialogCategoryClick";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import EditIcon from "@material-ui/icons/Edit";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import TableDialog from "../FacultyManage/FacultyManage";
import { EXPANSION_CATEGORY_FORM } from "../../../Utils";


const styles = theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content"
  },
  formControl: {
    marginTop: theme.spacing.unit * 2,
    minWidth: 120
  },
  formControlLabel: {
    marginTop: theme.spacing.unit
  },
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});

class MaxWidthDialog extends React.Component {
  state = {
    open: false
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };
  handleCategoryDialogOpen = () => {
    this.child.handleDialogOpen();
  };

  render() {
    const { classes } = this.props;
    let header1 = "Dept";
    let header2 = "Add new department";
    let data = [
      {
        _id: "affa",
        name: "Verbal",
        desc: "desc",
        subcategories: [
          {
            _id: "affa",
            name: "Verbal",
            desc: "desc"
          },
          {
            _id: "affa",
            name: "Verbal",
            desc: "desc"
          },
          {
            _id: "affa",
            name: "Verbal",
            desc: "desc"
          }
        ]
      },
      {
        _id: "affa",
        name: "Linguistic",
        desc: "desc",
        subcategories: [
          {
            _id: "affa",
            name: "Verbal",
            desc: "desc"
          },
          {
            _id: "affa",
            name: "Verbal",
            desc: "desc"
          },
          {
            _id: "affa",
            name: "Verbal",
            desc: "desc"
          }
        ]
      }
    ];
    const Frameworks = props => {
      return (
        <React.Fragment>
          <CategoryDialog onRef={ref => (this.child = ref)} />
          <Card>
            {props.items.map(item => (
              <React.Fragment key={item.id}>
                <List component="nav">
                  <ListItem button onClick={this.handleClick}>
                    <ListItemAvatar>
                      <Avatar
                        alt="Category Icon"
                        src="assets/img/faces/marc.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText primary={item.name} secondary={item.desc} />
                    <ListItemSecondaryAction>
                      <IconButton
                        aria-label="Edit"
                        onClick={this.handleCategoryDialogOpen}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="Expand"
                        onClick={this.handleClick}
                      >
                        {this.state.open ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    {item.subcategories.map(subitem => (
                      <List component="div" disablePadding key={subitem.id}>
                        <ListItem
                          button
                          className={classes.nested}
                          onClick={this.handleCategoryDialogOpen}
                        >
                          <ListItemText
                            primary={subitem.name}
                            secondary={subitem.desc}
                          />
                        </ListItem>
                      </List>
                    ))}
                  </Collapse>
                </List>
              </React.Fragment>
            ))}
          </Card>
        </React.Fragment>
      );
    };
    ``;
    return (
      <React.Fragment>
        <Expansionpanel
          headers="Category"
          header="Add new category"
          directingValue={EXPANSION_CATEGORY_FORM}
        />
        <Frameworks items={data} />
      </React.Fragment>
    );
  }
}

MaxWidthDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MaxWidthDialog);
