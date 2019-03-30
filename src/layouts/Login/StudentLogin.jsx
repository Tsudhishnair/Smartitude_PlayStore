import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  Avatar,
  Button,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Checkbox,
  Input,
  InputLabel,
  Paper,
  Typography,
  createMuiTheme
} from "@material-ui/core";

import withStyles from "@material-ui/core/styles/withStyles";
import { Redirect, withRouter } from "react-router-dom";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import lock from "assets/img/drawable/smart_logo.png";
import { MuiThemeProvider } from "material-ui/styles";
import { orange100 } from "material-ui/styles/colors";

import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import { loginHandler } from "../../Utils";

import Spacing from "./AdminLogin";
import GridContainer from "../../components/Grid/GridContainer";

const STUDENT_LOGIN = gql`
  mutation studentLogin($username: String!, $password: String!) {
    studentLogin(username: $username, password: $password)
  }
`;

const theme = createMuiTheme({
  palette: {
    primary: { main: orange100 }, // Purple and green play nicely together.
    secondary: { main: "#11cb5f" } // This is just green.A700 as hex.
  }
});

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
    margin: "0"
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

class StudentLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  handleUserName = event => {
    this.setState({
      form: {
        ...this.state.form,
        username: event.target.value
      }
    });
  };
  handlePassword = event => {
    this.setState({
      form: {
        ...this.state.form,
        password: event.target.value
      }
    });
  };
  handleClick = (studentLogin, e) => {
    this.setState({ ...this.state, loading: true });

    studentLogin({
      variables: {
        username: this.state.form.username,
        password: this.state.form.password
      }
    })
      .then(response => {
        localStorage.setItem("token", response.data.studentLogin);

        // check for the value in local storage & update local state accordingly
        if (loginHandler.authenticated("student")) {
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
    const { classes } = this.props;
    const { redirecter, snackbar, error } = this.state;

    // if auth token is present in storage, redirect to dashboard
    if (redirecter === true) {
      return <Redirect to="/admin/dashboard" />;
    }

    return (
      <Mutation mutation={STUDENT_LOGIN}>
        {(studentLogin, data) => (
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
                      <InputLabel htmlFor="email">Email Address</InputLabel>
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
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={e => this.handleClick(studentLogin, e)}
                    >
                      Login
                    </Button>
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
          </MuiThemeProvider>
        )}
      </Mutation>
    );
  }
}

StudentLogin.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(StudentLogin));
