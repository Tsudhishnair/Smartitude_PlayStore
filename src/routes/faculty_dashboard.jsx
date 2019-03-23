// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import NotificationIcon from "@material-ui/icons/QuestionAnswer";
// core components/views
import DashboardPage from "../views/Faculty/Dashboard/Dashboard.jsx";

import NotificationsPage from "../views/Student/Notifications/Notifications.jsx";

const dashboardRoutes = [
  {
    path: "/faculty/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Faculty Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/faculty/manage_faculty",
    sidebarName: "Manage Faculty",
    navbarName: "Manage Faculty",
    icon: NotificationIcon,
    component: NotificationsPage
  },
  {
    path: "/faculty/questions",
    sidebarName: "Questions",
    navbarName: "Questions",
    icon: NotificationIcon,
    component: NotificationsPage
  },
  {
    redirect: true,
    path: "/faculty",
    to: "/faculty/dashboard",
    navbarName: "Redirect"
  }
];

export default dashboardRoutes;
