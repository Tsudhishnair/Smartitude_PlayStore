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
import CategoryDialog from "../../../components/Dialog/DialogCategory";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import EditIcon from "@material-ui/icons/Edit";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import TableDialog from "../FacultyManage/FacultyManage";
import { EXPANSION_CATEGORY_FORM, EXPANSION_SUBCATEGORY_FORM } from "../../../Utils";
import gql from "graphql-tag";
import { Query } from "react-apollo";


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
    const FETCH_CATEGORY_DETAILS = gql`
    {
      categoryDetailsList {
        category {
          _id,
          name,
          description,
        },
        subcategory {
          _id,
          name,
          description,
        }
      }
    }
  `;

    return (
      <Query query={FETCH_CATEGORY_DETAILS}>
        {({ data, loading, error }) => {
          if (loading) {
            return (<Typography>Loading</Typography>)
          }
          else if (error) {
            return (<Typography>Error occured while fetching data.</Typography>)
          }
          else {
            const categoriesList = data.categoryDetailsList.map(categoryDetail => {
              return categoryDetail.category;
            }) 
            
            return (
              <React.Fragment>
                <Expansionpanel
                  headers="Category"
                  header="Add new category"
                  directingValue={EXPANSION_CATEGORY_FORM}
                />
                <Expansionpanel
                  categories = {categoriesList}
                  headers="Sub-Category"
                  header="Add new subcategory"
                  directingValue={EXPANSION_SUBCATEGORY_FORM}
                />
                  <CategoryDialog onRef={ref => (this.child = ref)} />
                  <Card>
                    {data.categoryDetailsList.map(categoryDetail => (
                      <React.Fragment>
                        <List component="nav">
                          <ListItem key={categoryDetail.category._id} button onClick={this.handleClick}>
                            <ListItemAvatar>
                              <Avatar
                                alt="Category Icon"
                                src="assets/img/faces/marc.jpg"
                              />
                            </ListItemAvatar>
                            <ListItemText primary={categoryDetail.category.name} secondary={categoryDetail.category.description} />
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
                            {categoryDetail.subcategory.map(subcategory => (
                              <List component="div" disablePadding key={subcategory._id}>
                                <ListItem
                                  key={subcategory._id}
                                  button
                                  className={classes.nested}
                                  onClick={this.handleCategoryDialogOpen}
                                >
                                  <ListItemText
                                    primary={subcategory.name}
                                    secondary={subcategory.description}
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
          }
        }}
      </Query>
    );
  }
}

MaxWidthDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MaxWidthDialog);
