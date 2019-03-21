import { loginHandler } from "../Utils";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import React from "react";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return loginHandler.isLoggedIn === true ? (
        // if logged in, return component as usual
        <Component {...props} />
      ) : (
        // if not logged in, redirect to login page
        <Redirect to="/admin/login" />
        // TODO: ACCOMODATE ALL TYPES OF USERS
      );
    }}
  />
);
