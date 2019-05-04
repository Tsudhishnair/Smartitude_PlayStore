import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import TextField from "@material-ui/core/TextField";
import {
  Button,
  CircularProgress,
  ExpansionPanelActions,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Typography
} from "@material-ui/core";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import CustomSnackbar from "../../../components/Snackbar/CustomSnackbar";
import green from "@material-ui/core/colors/green";
import PropTypes from "prop-types";

const styles = theme => ({
  root: {
    dispaly: "felx",
    flexGrow: 1
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: "relative"
  }
});

const FETCH_BATCHES_QUERY = gql`
  {
    batches
  }
`;

class FormCreateMessage extends Component {
  constructor(props) {
    super(props);
    this.batches = [];
    this.state = {
      title: "",
      description: "",
      batch: "",
      snackbar: {
        open: false,
        variant: "error",
        message: ""
      }
    };
  }

  // handle changes in form fields
  handleChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  clearForm = () => {
    this.setState({
      title: "",
      description: "",
      batch: ""
    });
    this.props.reloadList();
  };
  // open snackbar
  openSnackbar = () => {
    this.setState({
      snackbar: {
        ...this.state.snackbar,
        open: true
      }
    });
  };

  // close snackbar by changing open state
  closeSnackbar = () => {
    this.setState({
      snackbar: {
        ...this.state.snackbar,
        open: false
      }
    });
  };
  handleClick = (createMessage, e) => {
    e.preventDefault();
    // check if name or desc fields are empty, if so, throw up snackbar and set msg accordingly
    if (!this.state.title) {
      this.setState(
        {
          snackbar: {
            ...this.state.snackbar,
            variant: "error",
            message: "Message title empty name field empty!"
          }
        },
        () => this.openSnackbar()
      );
    } else if (!this.state.description) {
      this.setState(
        {
          snackbar: {
            ...this.state.snackbar,
            variant: "error",
            message: "Message description field empty!"
          }
        },
        () => this.openSnackbar()
      );
    } else {
      // set loading state and start mutation. upon completion, change loading states
      this.setState({
        loading: true
      });
      createMessage({
        variables: {
          messageInput: {
            title: this.state.title,
            description: this.state.description,
            batch: parseInt(this.state.batch)
          }
        }
      })
        .then(response => {
          this.setState(
            {
              loading: false,
              snackbar: {
                ...this.state.snackbar,
                variant: "success",
                message: "New Message Created!"
              }
            },
            () => this.openSnackbar()
          );
          if (this.props.reloadList !== null) {
            this.props.reloadList();
          }
        })
        .catch(err => {
          this.setState({
            loading: false
          });
          this.closeSnackbar();
          if (this.props.reloadList !== null) {
            this.props.reloadList();
          }
        });
    }
  };
  //populate the dropdown used for batches
  renderBatchDropdown = () => {
    if (this.batches) {
      return this.batches.map(batch => {
        return (
          <MenuItem value={batch} key={batch}>
            {batch}
          </MenuItem>
        );
      });
    } else {
      return <Fragment/>;
    }
  };

  render() {
    const CREATE_MESSAGE = gql`
      mutation createMessage($messageInput: MessageInput!) {
        createMessage(messageInput: $messageInput) {
          _id
        }
      }
    `;
    const { classes } = this.props;
    const { snackbar } = this.state;
    return (
      <Query query={FETCH_BATCHES_QUERY}>
        {({ data, loading, error }) => {
          if (loading) {
            return <CircularProgress className={classes.progress}/>;
          } else if (error) {
            return <Typography>Error occured while fetching data!</Typography>;
          } else {
            this.batches = data.batches;
            return (
              <Mutation mutation={CREATE_MESSAGE} onCompleted={this.clearForm}>
                {createMessage => {
                  return (
                    <div className={classes.root}>
                      <form
                        onSubmit={e => {
                          e.preventDefault();
                          createMessage({
                            variables: {
                              messageInput: {
                                title: this.state.title,
                                description: this.state.description,
                                batch: this.state.batch
                              }
                            }
                          });
                        }}
                      >
                        <GridContainer>
                          <GridItem xs={6} md={6}>
                            <TextField
                              autoFocus
                              margin="normal"
                              id="title"
                              name="title"
                              label="Message Title"
                              placeholder={"Enter the message title here"}
                              type="text"
                              value={this.state.title}
                              onChange={this.handleChange}
                              fullWidth
                              required
                            />
                          </GridItem>
                          <GridItem xs={12} sm={3} md={3}>
                            <FormControl
                              required
                              fullWidth
                              className={classes.formControl}
                            >
                              <InputLabel htmlFor="batch">Batch</InputLabel>
                              <Select
                                onChange={e => this.handleChange(e)}
                                value={this.state.batch}
                                renderValue={value => {
                                  return value;
                                }}
                                inputProps={{
                                  name: "batch",
                                  id: "batch"
                                }}
                                fullWidth
                              >
                                {this.renderBatchDropdown()}
                              </Select>
                            </FormControl>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>
                            <TextField
                              autoFocus
                              margin="dense"
                              id="description"
                              name="description"
                              placeholder={
                                "Enter a description for the message here"
                              }
                              label="Message Description"
                              type="text"
                              value={this.state.description}
                              onChange={this.handleChange}
                              multiline={true}
                              rows={2}
                              fullWidth
                              required
                            />
                          </GridItem>
                        </GridContainer>
                        <ExpansionPanelActions>
                          <div className={classes.wrapper}>
                            <Button
                              size="small"
                              color="primary"
                              variant="outlined"
                              type={"submit"}
                              onClick={e => this.handleClick(createMessage, e)}
                              disabled={loading}
                            >
                              Create
                            </Button>
                            {loading && (
                              <CircularProgress
                                size={24}
                                className={classes.buttonProgress}
                              />
                            )}
                          </div>
                        </ExpansionPanelActions>
                        <Snackbar
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right"
                          }}
                          open={snackbar.open}
                          autoHideDuration={6000}
                        >
                          <CustomSnackbar
                            onClose={this.closeSnackbar}
                            variant={snackbar.variant}
                            message={snackbar.message}
                          />
                        </Snackbar>
                      </form>
                    </div>
                  );
                }}
              </Mutation>
            );
          }
        }}
      </Query>
    );
  }
}

FormCreateMessage.propTypes = {
  classes: PropTypes.object.isRequired,
  reloadList: PropTypes.func.isRequired
};
export default withStyles(styles)(FormCreateMessage);
