import { loginHandler } from "../Utils";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import React from "react";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      console.log('state:', loginHandler.isLoggedIn);
      return loginHandler.isLoggedIn === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/admin/login" />
      );
    }}
  />
);
