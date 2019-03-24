// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import NotificationIcon from "@material-ui/icons/QuestionAnswer";
// core components/views
import DashboardPage from "../views/Faculty/Dashboard/Dashboard.jsx";

import FacultyManage from "../views/Faculty/FacultyManage/FacultyManage";
import QuizManage from "../views/Faculty/QuizManage/QuizManage";
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
    icon: Person,
    component: FacultyManage
  },
  {
    path: "/faculty/questions",
    sidebarName: "Questions",
    navbarName: "Questions",
    icon: NotificationIcon,
    component: FacultyManage
  },
  {
    path: "/faculty/quiz",
    sidebarName: "Quiz",
    navbarName: "Quiz",
    icon: NotificationIcon,
    component: QuizManage
  },
  {
    redirect: true,
    path: "/faculty",
    to: "/faculty/dashboard",
    navbarName: "Redirect"
  }
];

export default dashboardRoutes;
