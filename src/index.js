import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/css/material-dashboard-react.css?v=1.5.0";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { orange700 } from "material-ui/styles/colors";

import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";

import AdminLogin from "./layouts/Login/AdminLogin";
import FacultyLogin from "./layouts/Login/FacultyLogin";
import StudentLogin from "./layouts/Login/StudentLogin";
import AdminPanel from "./layouts/AdminPanel/AdminPanel";
import StudentPanel from "./layouts/StudentPanel/StudentPanel";
import FacultyPanel from "./layouts/FacultyPanel/FacultyPanel";
import Landing from "./layouts/Landing/Landing";
import { PrivateRoute } from "./routes/PrivateRoute";

import AddQues from "./views/Faculty/AddQuestion/AddQuestion";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#ff9800" }, // Purple and green play nicely together.
    secondary: { main: orange700 } // This is just green.A700 as hex.
  },
  typography: { useNextVariants: true }
});

const hist = createBrowserHistory();

// add authorization header to all requests
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql"
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={theme}>
      <Router history={hist}>
        <Switch>
          <Route path="/admin/login" component={AdminLogin} />
          <Route path="/faculty/login" component={FacultyLogin} />
          <Route path="/stud/login" component={StudentLogin} />
          <PrivateRoute path="/admin/" component={AdminPanel} />
          <PrivateRoute path="/faculty/" component={FacultyPanel} />
          <PrivateRoute path="/faculty/questions/add" component={AddQues} />
          <Route path="/student/" component={StudentPanel} />
          <Route path="/" component={Landing} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
