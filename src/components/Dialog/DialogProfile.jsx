import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from "@material-ui/core";

import { AccountCircle } from "@material-ui/icons";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import formControlStyle from "../../assets/jss/form-control";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

class DialogChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { classes, open, onClose } = this.props;

    return (
      <div>
        <Dialog
          open={open}
          onClose={onClose}
          maxWidth={"lg"}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">User Profile</DialogTitle>
          <form>
            <DialogContent>
              <GridContainer>
                <GridItem>
                  <Card
                    profile
                    color={"transparent"}
                    plain={true}
                    style={{
                      background: "transparent",
                      marginLeft: "auto"
                    }}
                  >
                    <CardAvatar profile>
                      <AccountCircle
                        style={{ height: "100px", width: "100px" }}
                      />
                    </CardAvatar>
                    <CardBody profile>
                      <h6 className={classes.cardCategory}>USER NAME</h6>
                      <h4 className={classes.cardTitle}>emailid@gmail.com</h4>
                      <p className={classes.description}>
                        Class: XX Department: XX Batch: XX Class and Department
                      </p>
                    </CardBody>
                  </Card>
                </GridItem>
              </GridContainer>
            </DialogContent>
            <DialogActions>
              <Button size="small" color="primary" onClick={onClose}>
                Okay
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

DialogChangePassword.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onRef: PropTypes.object
};

export default withStyles(formControlStyle)(DialogChangePassword);
