import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  FormControl,
  Input,
  InputLabel,
  Snackbar,
  CircularProgress,
  TextField,
  Tooltip
} from "@material-ui/core";

import combineStyles from "components/CombineStyles/CombineStyles.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import withStyles from "@material-ui/core/styles/withStyles";
import { Redirect, withRouter } from "react-router-dom";
import green from "@material-ui/core/colors/green";
import lock from "assets/img/drawable/smart_logo.png";
import Footer from "../../components/Footer/Footer";
import gql from "graphql-tag";
import IconButton from "@material-ui/core/IconButton";
import { Mutation } from "react-apollo";
import { loginHandler } from "../../Utils";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import CustomSnackbar from "../../components/Snackbar/CustomSnackbar";
import GridContainer from "../../components/Grid/GridContainer";
import Header from "../../components/HomeHeader/HomeHeader.jsx";
import HeaderLinks from "../../components/HomeHeader/HeaderLinks.jsx";
import Button from "../../components/CustomButtons/Button";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import image from "assets/img/bg.jpg";
import GridItem from "../../components/Grid/GridItem";

import loginPageStyle from "../../assets/jss/material-dashboard-react/views/loginPage.jsx";

const styles = theme => ({
  wrapper: {
    margin: theme.spacing.unit,
    position: "relative"
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -9,
    marginLeft: -12
  },
  margin: {
    margin: theme.spacing.unit
  },
  // formControl: {
  //   margin: theme.spacing.unit
  // },
  withoutLabel: {
    marginTop: theme.spacing.unit * 2
  },
  textField: {
    flexBasis: 200
  }
});
// Mutaion for signup
const Student_Sign_Up = gql`
  mutation studentSignUp($studentInput: StudentSignUpInput!) {
    studentSignUp(studentInput: $studentInput) {
      _id
    }
  }
`;
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      form: {
        mname: "",
        email: "",
        phonenumber: "",
        username: "",
        password: ""
      },
      redirecter: false,
      snackbar: {
        open: false,
        variant: "",
        message: ""
      }
    };
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
  // Method to set the state
  handleFormFields = event => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value
      }
    });
  };
  // Method to clear the state and form on submission
  handleResetForm = e => {
    this.setState(prevState => ({
      ...prevState,
      form: {
        mname: "",
        email: "",
        phonenumber: "",
        username: "",
        password: ""
      }
    }));
  };
  //Submission mutation method
  handleClick = (studentSignUp, e) => {
    e.preventDefault();
    console.log("Entered Mutaion call");
    studentSignUp({
      variables: {
        studentInput: {
          name: this.state.form.mname,
          email: this.state.form.email,
          username: this.state.form.username,
          password: this.state.form.password,
          phoneNumber: this.state.form.phonenumber
        }
      }
    })
      .then(response => {
        this.handleResetForm(e);
        this.setState(
          {
            snackbar: {
              ...this.state.snackbar,
              variant: "success",
              message:
                "Successfully Signed Up. Login with your username & password"
            }
          },
          () => {
            this.openSnackbar();
          }
        );
      })
      .catch(err => {
        this.setState(
          {
            snackbar: {
              ...this.state.snackbar,
              variant: "error",
              message: "SignUp Failed!" + err.message
            }
          },
          () => {
            this.openSnackbar();
          }
        );
      });
  };
  // open snackbar
  openSnackbar = () => {
    console.log("SNAckeee");
    this.setState({
      snackbar: {
        ...this.state.snackbar,
        open: true
      }
    });
    setTimeout(() => {
      this.setState({
        snackbar: {
          ...this.state.snackbar,
          open: false
        }
      });
    }, 4000);
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
  render() {
    const { loading } = this.state;
    const { classes, ...rest } = this.props;
    const { redirecter, snackbar, error } = this.state;

    // if auth token is present in storage, redirect to dashboard
    if (redirecter === true) {
      return <Redirect to="/student/login" />;
    }
    return (
      <Mutation mutation={Student_Sign_Up} onCompleted={this.handleResetForm}>
        {(studentSignUp, { data }) => {
          return (
            <div>
              <Header
                absolute
                color="transparent"
                brand="Smartitude"
                rightLinks={<HeaderLinks />}
                {...rest}
              />
              <div
                className={classes.pageHeader}
                style={{
                  backgroundImage: "url(" + image + ")",
                  backgroundSize: "cover",
                  backgroundPosition: "top center"
                }}
              >
                <div className={classes.container} style={{ overflow: "auto" }}>
                  <GridContainer justify="center">
                    <GridItem xs={11} sm={9} md={4}>
                      <Card className={classes[this.state.cardAnimaton]}>
                        <form
                          className={classes.form}
                          onSubmit={e => this.handleClick(studentSignUp, e)}
                        >
                          <CardHeader
                            color="primary"
                            className={classes.cardHeader}
                          >
                            <h4>Student Registration</h4>
                          </CardHeader>
                          <CardBody>
                            <p className={classes.divider}>
                              <img width="150dp" src={lock} alt="..." />
                            </p>
                            <FormControl
                              required
                              className={classes.formControl}
                              fullWidth
                            >
                              <TextField
                                autoFocus
                                // margin="dense"
                                id="name"
                                label="Name"
                                required
                                type="text"
                                InputProps={{
                                  inputProps: { pattern: "^[a-zA-Z ]*$" }
                                }}
                                name="mname"
                                onChange={this.handleFormFields}
                                value={this.state.form.mname}
                                fullWidth
                              />
                            </FormControl>
                            <FormControl
                              required
                              className={classes.formControl}
                              fullWidth
                            >
                              <TextField
                                required
                                id="email"
                                label="Email Address"
                                type="email"
                                name="email"
                                onChange={this.handleFormFields}
                                value={this.state.form.email}
                                fullWidth
                              />
                            </FormControl>
                            <GridContainer>
                              <GridItem xs={12} sm={6}>
                                <FormControl
                                  required
                                  className={classes.formControl}
                                >
                                  <Tooltip
                                    disableFocusListener
                                    title="Make sure your name and username are not similar"
                                  >
                                    <TextField
                                      required
                                      // margin="l"
                                      id="usrname"
                                      label="User Name"
                                      type="text"
                                      name="username"
                                      InputProps={{
                                        inputProps: {
                                          pattern: "^[a-zA-Z0-9_]*$"
                                        }
                                      }}
                                      onChange={this.handleFormFields}
                                      value={this.state.form.username}
                                      fullWidth
                                    />
                                  </Tooltip>
                                </FormControl>
                              </GridItem>
                              <GridItem xs={12} sm={6}>
                                <FormControl
                                  required
                                  fullWidth
                                  className={classes.formControl}
                                >
                                  <Tooltip
                                    // disableFocusListener
                                    title="At least 6 characters necessary & a mixture of letters and numbers recommended"
                                  >
                                    <TextField
                                      id="password"
                                      label="Password"
                                      type="password"
                                      name="password"
                                      InputProps={{
                                        inputProps: { pattern: ".{6,}" }
                                      }}
                                      required
                                      onChange={this.handleFormFields}
                                      value={this.state.form.password}
                                      fullWidth
                                    />
                                  </Tooltip>
                                </FormControl>
                              </GridItem>
                            </GridContainer>
                            <FormControl
                              required
                              className={classes.formControl}
                              fullWidth
                            >
                              <TextField
                                autoFocus
                                id="phone"
                                label="Phone Number"
                                // margin={"dense"}
                                type="number"
                                name="phonenumber"
                                required
                                InputProps={{
                                  inputProps: {
                                    min: 6000000000,
                                    max: 9999999999
                                  }
                                }}
                                onChange={this.handleFormFields}
                                value={this.state.form.phoneNumber}
                                fullWidth
                              />
                            </FormControl>
                          </CardBody>
                          <CardFooter className={classes.cardFooter}>
                            <div className={classes.wrapper}>
                              <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                size={"lg"}
                                simple
                                disabled={loading}
                                className={classes.submit}
                              >
                                Sign Up
                              </Button>
                              {loading && (
                                <CircularProgress
                                  size={26}
                                  className={classes.buttonProgress}
                                />
                              )}
                            </div>
                          </CardFooter>
                        </form>
                      </Card>
                    </GridItem>
                  </GridContainer>
                </div>
                <Footer whiteFont />
              </div>
              <CustomSnackbar
                  onClose={this.closeSnackbar}
                  variant={snackbar.variant}
                  open={snackbar.open}
                  message={snackbar.message}
                />
            </div>
          );
        }}
      </Mutation>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
const combinedStyles = combineStyles(styles, loginPageStyle);

export default withRouter(withStyles(combinedStyles)(SignUp));
