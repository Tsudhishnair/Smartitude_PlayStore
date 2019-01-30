import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/css/material-dashboard-react.css?v=1.5.0";
import Log from './layouts/Login/Login';
import indexRoutes from "routes/index.jsx";

const hist = createBrowserHistory();

ReactDOM.render(
  // <Router history={hist}>
  //   <Switch>
  //     {indexRoutes.map((prop, key) => {
  //       return <Route path={prop.path} component={prop.component} key={key} />;
  //     })}
  //   </Switch>
  // </Router>,
  <Log/>,
  document.getElementById("root")
);
