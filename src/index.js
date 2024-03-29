import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { HashRouter, Route, Switch } from "react-router-dom";
import "assets/css/material-dashboard-react.css?v=1.5.0";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import SignUp from "./layouts/Signup/SignUp";
import AdminLogin from "./layouts/Login/AdminLogin";
import FacultyLogin from "./layouts/Login/FacultyLogin";
import StudentLogin from "./layouts/Login/StudentLogin";
import ErrorPage from "./views/General/ErrorPage";
import AdminPanel from "./layouts/AdminPanel/AdminPanel";
import StudentPanel from "./layouts/StudentPanel/StudentPanel";
import FacultyPanel from "./layouts/FacultyPanel/FacultyPanel";
import Landing from "./layouts/Landing/Landing";
import QuizPanel from "./views/Student/QuizPanel/QuizPanelView";
import { PrivateRoute } from "./routes/PrivateRoute";
import AddQuestion from "./views/Faculty/AddQuestion/AddQuestion";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#f5af19" },
    secondary: { main: "#f12711" }
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
  // uri: "https://smartitude-graphql.herokuapp.com/graphql"
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={theme}>
      <HashRouter>
        <Switch>
          <Route path="/SignUp" component={SignUp}/>
          <Route path="/admin/login" component={AdminLogin} />
          <Route path="/faculty/login" component={FacultyLogin} />
          <Route path="/student/login" component={StudentLogin} />
          <Route path="/student/quiz" component={QuizPanel} />
          <Route path="/error" component={ErrorPage} />
          <PrivateRoute path="/admin/" component={AdminPanel} />
          <PrivateRoute path="/faculty/" component={FacultyPanel} />
          <PrivateRoute
            path="/faculty/questions/add"
            component={<AddQuestion isEdit={false} />}
          />
          <PrivateRoute path="/student/" component={StudentPanel} />
          <Route path="/" component={Landing} />
          <Route component={ErrorPage} />
        </Switch>
      </HashRouter>
    </MuiThemeProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
