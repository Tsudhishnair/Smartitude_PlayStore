import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts

// @material-ui/core
import Card from "components/Card/Card.jsx";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

import GridContainer from "components/Grid/GridContainer.jsx";

// @material-ui/icons

// core components
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});

class DeptManage extends React.Component {
  state = {
    open: false
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes } = this.props;
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
                    <ListItemText
                      primary={item.name}
                      secondary={item.desc}
                    />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
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
    return (
      <div>
        <GridContainer>
          <Frameworks items={data} />
        </GridContainer>
      </div>
    );
  }
}

DeptManage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DeptManage);
