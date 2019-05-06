import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  FormControl,
  Input,
  InputLabel,
  Snackbar,
  CircularProgress
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

// login mutation query
const ADMIN_LOGIN = gql`
  mutation adminLogin($username: String!, $password: String!) {
    adminLogin(username: $username, password: $password)
  }
`;

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
  withoutLabel: {
    marginTop: theme.spacing.unit * 3
  },
  textField: {
    flexBasis: 200
  }
});

class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      form: {
        username: "",
        password: ""
      },
      redirecter: false,
      snackbar: {
        open: false
      },
      error: {
        message: ""
      },
      cardAnimaton: "cardHidden"
    };
  }

  // handle username field
  handleUserName = event => {
    this.setState({
      form: {
        ...this.state.form,
        username: event.target.value
      }
    });
  };
  // handle password field
  handlePassword = event => {
    this.setState({
      form: {
        ...this.state.form,
        password: event.target.value
      }
    });
  };
  // handle submit button click
  handleClick = (adminLogin, e) => {
    e.preventDefault();
    this.setState({ ...this.state, loading: true });
    adminLogin({
      variables: {
        username: this.state.form.username,
        password: this.state.form.password
      }
    })
      .then(response => {
        // set token to the auth token received

        localStorage.setItem("token", response.data.adminLogin);
        // check for the value in local storage & update local state accordingly
        if (loginHandler.authenticated("admin")) {
          this.setState(() => ({
            redirecter: true
          }));
        }
      })
      .catch(err => {
        // set error message for snackbar
        this.setState({
          error: {
            message: err.graphQLErrors[0]
              ? err.graphQLErrors[0].message
              : err.networkError
          }
        });

        this.openSnackbar();
        console.log(err.graphQLErrors);
        console.log(err.networkError);
      })
      .finally(() => {
        this.setState({ ...this.state, loading: false });
      });
  };

  openSnackbar = () => {
    this.setState({
      snackbar: {
        ...this.state.snackbar,
        open: true
      }
    });
  };

  closeSnackbar = () => {
    this.setState({
      snackbar: {
        ...this.state.snackbar,
        open: false
      }
    });
  };

  // when component mounts, check for authentication state for redirection
  componentDidMount() {
    if (loginHandler.authenticated()) {
      this.setState(() => ({
        redirecter: true
      }));
    }
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const { loading } = this.state;
    const { classes, ...rest } = this.props;
    const { redirecter, snackbar, error } = this.state;


    // if auth token is present in storage, redirect to dashboard
    if (redirecter === true) {
      return <Redirect to="/admin/dashboard" />;
    }

    return (
      <Mutation mutation={ADMIN_LOGIN}>
        {(adminLogin, data) => (
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
              <div className={classes.container}>
                <GridContainer justify="center">
                  <GridItem xs={11} sm={9} md={4}>
                    <Card className={classes[this.state.cardAnimaton]}>
                      <form
                        className={classes.form}
                        onSubmit={e => this.handleClick(adminLogin, e)}
                      >
                        <CardHeader
                          color="primary"
                          className={classes.cardHeader}
                        >
                          <h4>Admin Login</h4>
                        </CardHeader>
                        <p className={classes.divider}>
                          <img width="150dp" src={lock} alt="..." />
                        </p>
                        <CardBody>
                          <FormControl required fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="email" className={classes.labelRoot}>Username</InputLabel>
                            <Input
                              id="email"
                              name="email"
                              autoComplete="email"
                              onChange={this.handleUserName}
                              value={this.state.form.username}
                            />
                          </FormControl>
                          <FormControl required fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="adornment-password" className={classes.labelRoot}>
                              Password
                            </InputLabel>
                            <Input
                              id="adornment-password"
                              type={
                                this.state.showPassword ? "text" : "password"
                              }
                              onChange={this.handlePassword}
                              fullWidth
                              value={this.state.form.password}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="Toggle password visibility"
                                    onClick={this.handleClickShowPassword}
                                  >
                                    {this.state.showPassword ? (
                                      <Visibility />
                                    ) : (
                                      <VisibilityOff />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              }
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
                              Login
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
                variant="error"
                message={error.message}
              />
            </Snackbar>
          </div>
        )}
      </Mutation>
    );
  }
}

AdminLogin.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
const combinedStyles = combineStyles(styles, loginPageStyle);

export default withRouter(withStyles(combinedStyles)(AdminLogin));
