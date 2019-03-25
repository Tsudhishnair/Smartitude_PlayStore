import { loginHandler } from "../Utils";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import React from "react";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      // get the route and split it with delimiter / userType in index posn 1
      const route = props.location.pathname.split("/");

      // if logged in, return component as usual
      if (loginHandler.isLoggedIn === true) {
        return <Component {...props} />;
      } else {
        // if not logged in, redirect to login page
        if (route[1] === "admin") {
          return <Redirect to="/admin/login" />;
        } else if (route[1] === "faculty") {
          return <Redirect to="/faculty/login" />;
        }
      }
    }}
  />
);
