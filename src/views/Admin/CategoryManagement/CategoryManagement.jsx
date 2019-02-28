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
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

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

  render() {
    const { classes } = this.props;
    let header1 = "Dept";
    let header2 = "Add new department";
    let data = [
      {
        _id: "affa",
        name: "Verbal",
        desc: "subcat",
        subcategories: [
          {
            _id: "affa",
            name: "Verbal",
            desc: "subcat"
          },
          {
            _id: "affa",
            name: "Verbal",
            desc: "subcat"
          },
          {
            _id: "affa",
            name: "Verbal",
            desc: "subcat"
          }
        ]
      },
      {
        _id: "affa",
        name: "Linguistic",
        desc: "subcat",
        subcategories: [
          {
            _id: "affa",
            name: "Verbal",
            desc: "subcat"
          },
          {
            _id: "affa",
            name: "Verbal",
            desc: "subcat"
          },
          {
            _id: "affa",
            name: "Verbal",
            desc: "subcat"
          }
        ]
      }
    ];
    const Frameworks = props => {
      return (
        <React.Fragment>
          <Card>
            {props.items.map(item => (
              <React.Fragment key={item.id}>
                <List component="nav">
                  <ListItem button onClick={this.handleClick}>
                    <ListItemText primary={item.name} secondary={item.desc} />
                    <ListItemSecondaryAction>
                      <IconButton
                        aria-label="Comments"
                        onClick={this.handleClick}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="Comments"
                        onClick={this.handleClick}
                      >
                        {this.state.open ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    {item.subcategories.map(subitem => (
                      <List component="div" disablePadding key={subitem.id}>
                        <ListItem button className={classes.nested}>
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
          headers={header1}
          header={header2}
          Footer1={"Cancel"}
          Footer2={"Assign"}
          directingValue={"5"}
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
