// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import LogOutIcon from "@material-ui/icons/ExitToApp";
import BarChart from "@material-ui/icons/BarChart"
import NotificationIcon from "@material-ui/icons/QuestionAnswer"
// core components/views
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import TableList from "views/TableList/TableList.jsx";

import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.jsx";
import Results from "../views/Results/Results";

const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Student Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/results",
    sidebarName: "Results",
    navbarName: "Results",
    icon: BarChart,
    component: Results
  },
  {
    path: "/notifications",
    sidebarName: "Notifications",
    navbarName: "Notifications",
    icon: NotificationIcon,
    component: NotificationsPage
  },
  // {
  //   path: "/typography",
  //   sidebarName: "Typography",
  //   navbarName: "Typography",
  //   icon: LibraryBooks,
  //   component: Typography
  // },
  // {
  //   path: "/icons",
  //   sidebarName: "Icons",
  //   navbarName: "Icons",
  //   icon: BubbleChart,
  //   component: Icons
  // },
  // {
  //   path: "/maps",
  //   sidebarName: "Maps",
  //   navbarName: "Map",
  //   icon: LocationOn,
  //   component: Maps
  // },
  // {
  //   path: "/notifications",
  //   sidebarName: "Notifications",
  //   navbarName: "Notifications",
  //   icon: Notifications,
  //   component: NotificationsPage
  // },
  {
    path: "/upgrade-to-pro",
    sidebarName: "Log Out",
    navbarName: "Log Out",
    icon: LogOutIcon,
    component: UpgradeToPro
  },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
