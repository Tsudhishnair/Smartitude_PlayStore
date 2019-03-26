import { loginHandler } from "../Utils";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import React from "react";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      // get the route and split it with delimiter / userType in index posn 1
      const route = props.location.pathname.split("/");

      // if logged in, do further checks
      if (loginHandler.isLoggedIn === true) {
        // if route is admin and usertype is admin, return component
        if (route[1] === "admin" && loginHandler.userType === "admin") {
          return <Component {...props} />;
        }
        // if route is faculty and usertype is faculty, return component
        else if (
          route[1] === "faculty" &&
          loginHandler.userType === "faculty"
        ) {
          return <Component {...props} />;
        } else {
          // malicious cases such as those where usertype is faculty and trying to access routes for admin

          loginHandler.logout();

          // if trying to access admin route, logout and reroute to admin login
          if (route[1] === "admin") {
            return <Redirect to="/admin/login" />;
          } else if (route[1] === "faculty") {
            return <Redirect to="/faculty/login" />;
          }
        }
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
