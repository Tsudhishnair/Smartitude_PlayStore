import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  Avatar,
  CssBaseline,
  FormControl,
  Input,
  InputLabel,
  Typography,
  Paper,
  Snackbar,
  Button
} from "@material-ui/core";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import withStyles from "@material-ui/core/styles/withStyles";
import { Redirect, withRouter } from "react-router-dom";
import green from "@material-ui/core/colors/green";
import lock from "assets/img/drawable/smart_logo.png";
import { MuiThemeProvider } from "material-ui/styles";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { loginHandler } from "../../Utils";
import CircularProgress from "@material-ui/core/CircularProgress";

import CustomSnackbar from "../../components/Snackbar/CustomSnackbar";
import GridContainer from "../../components/Grid/GridContainer";
import Spacing from "../../components/Spacing/Spacing";

// login mutation query
const ADMIN_LOGIN = gql`
  mutation adminLogin($username: String!, $password: String!) {
    adminLogin(username: $username, password: $password)
  }
`;

const styles = theme => ({
  "@global": {
    body: {
      // backgroundColor: theme.palette.common.white,
      // background: "linear-gradient(80deg,#ffa726,#fb8c00)"
    }
  },

  root: {
    height: "100vh",
    primary: "orange",
    secondary: "orange",
    backgroundSize: "cover",
    padding: theme.spacing.unit * 8,
    margin: "0",
    display: "flex",
    alignItems: "center"
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: "relative"
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -1,
    marginLeft: -12
  },
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
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
      }
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
            message: err.graphQLErrors
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
  }

  render() {
    const { loading } = this.state;
    const { classes } = this.props;
    const { redirecter, snackbar, error } = this.state;

    // if auth token is present in storage, redirect to dashboard
    if (redirecter === true) {
      return <Redirect to="/admin/dashboard" />;
    }

    return (
      <Mutation mutation={ADMIN_LOGIN}>
        {(adminLogin, data) => (
          <MuiThemeProvider>
            <div className={classes.root}>
              <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                  <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>

                  <form
                    className={classes.form}
                    onSubmit={e => e.preventDefault()}
                  >
                    <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="email">Username</InputLabel>
                      <Input
                        id="email"
                        name="email"
                        autoComplete="email"
                        onChange={this.handleUserName}
                        value={this.state.form.username}
                        autoFocus
                      />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="password">Password</InputLabel>
                      <Input
                        name="password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={this.handlePassword}
                        value={this.state.form.password}
                      />
                    </FormControl>
                    <div className={classes.wrapper}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        className={classes.submit}
                        onClick={e => this.handleClick(adminLogin, e)}
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
                  </form>
                </Paper>
                <Spacing />
                <GridContainer
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justify="center"
                  style={{ marginTop: "5vh" }}
                >
                  <img width="200dp" src={lock} alt="..." />
                </GridContainer>
              </main>
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
          </MuiThemeProvider>
        )}
      </Mutation>
    );
  }
}

AdminLogin.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(AdminLogin));
