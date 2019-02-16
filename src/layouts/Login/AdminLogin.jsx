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
  Typography,
  Paper
} from "@material-ui/core";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import withStyles from "@material-ui/core/styles/withStyles";
import { Redirect, withRouter } from "react-router-dom";

import lock from "assets/img/drawable/smart_logo.png";
import { createMuiTheme } from "@material-ui/core";
import { MuiThemeProvider } from "material-ui/styles";
import { orange100 } from "material-ui/styles/colors";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { loginHandler } from "../../Utils";

// login mutation query
const ADMIN_LOGIN = gql`
  mutation adminLogin($username: String!, $password: String!) {
    adminLogin(username: $username, password: $password)
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
      background: "linear-gradient(80deg,#ffa726,#fb8c00)"
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

class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        username: "",
        password: ""
      },
      redirecter: false
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
        if (loginHandler.authenticated()) {
          this.setState(() => ({
            redirecter: true
          }));
        }
      })
      .catch(err => console.log(err));
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
    const { redirecter } = this.state;

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
                      onClick={e => this.handleClick(adminLogin, e)}
                    >
                      Login
                    </Button>
                  </form>
                </Paper>
                <img width="400dp" src={lock} alt="..." />
              </main>
            </div>
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
