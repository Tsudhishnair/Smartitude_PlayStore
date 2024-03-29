/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route, Switch } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import dashboardRoutes from "routes/student_dashboard.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import logo from "assets/img/reactlogo.png";
import { loginHandler } from "../../Utils";
import MessageDialog from "../../components/Dialog/MessageDialog";
import Grow from "@material-ui/core/Grow";

const switchRoutes = (
  <Switch>
    {dashboardRoutes.map((prop, key) => {
      if (prop.redirect && !prop.subRoute)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      if (prop.subRoute)
        return <Route path={prop.path} component={prop.component} key={key}/>;
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

class StudentPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      redirect: false,
      isLogoutDialogVisible: false
    };
    this.resizeFunction = this.resizeFunction.bind(this);
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/maps";
  }
  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }


  logout = () => {
    loginHandler.logout();
    this.setState({
      redirect: true
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/student/login"/>;
    }
  };

  toggleLogoutVisibility = () => {
    this.setState(prevState => ({
      isLogoutDialogVisible: !prevState.isLogoutDialogVisible
    }));
  };

  renderLogoutDialog = (isVisible) => {
    if (isVisible) {
      return (
        <MessageDialog
          title="Logout"
          content="Are you sure that you want to logout?"
          positiveAction="YES"
          negativeAction="NO"
          action={this.logout}
          onClose={this.toggleLogoutVisibility}
        />
      );
    }
  };
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        {this.renderRedirect()}
        {this.renderLogoutDialog(this.state.isLogoutDialogVisible)}
        <Sidebar
          logoutDialogToggle={this.toggleLogoutVisibility}
          routes={dashboardRoutes}
          logoText={"Smartitude"}
          logo={logo}
          image=""
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="orange"
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <Header
            routes={dashboardRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          }
          {<Footer />}
        </div>
      </div>
    );
  }
}

StudentPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(StudentPanel);
