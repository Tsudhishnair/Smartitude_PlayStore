import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/css/material-dashboard-react.css?v=1.5.0";
import indexRoutes from "routes/index.jsx";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { orange700 } from "material-ui/styles/colors";

const theme = createMuiTheme({
  palette: {
    primary: { main: orange700 }, // Purple and green play nicely together.
    secondary: { main: orange700 }, // This is just green.A700 as hex.
  },
  typography: { useNextVariants: true },
});


const hist = createBrowserHistory();

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Router history={hist}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return <Route path={prop.path} component={prop.component} key={key} />;
        })}
      </Switch>
    </Router> </MuiThemeProvider>,
  document.getElementById("root")
);
