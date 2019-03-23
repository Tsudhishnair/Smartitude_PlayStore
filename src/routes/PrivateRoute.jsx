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
        // TODO: ACCOMODATE ALL TYPES OF USERS. GET FULL PATH FROM CURRENT ROUTE AND USE IT TO IDENTIFY USER FOLLOWING WHICH REDIRECTION SHOULD BE MADE TO THE LOGIN PAGE OF THAT PARTICULAR USER. IF THIS IS NOT DONE, IT WILL CAUSE PROBLEMS IN THE FOLLOWING CASE: 1. ON SYSTEMS WHERE TEST HAS NOT BEEN STARTED BEFORE 2. WHEN A FACULTY USES A PC AND A STUDENT LATER TRIES TO ACCESS SOME LINK, HE WILL BE REDIRECTED TO FACULTY LOGIN
      );
    }}
  />
);
