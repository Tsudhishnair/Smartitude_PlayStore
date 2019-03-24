// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import NotificationIcon from "@material-ui/icons/QuestionAnswer";
// core components/views
import DashboardPage from "../views/Faculty/Dashboard/Dashboard.jsx";

import FacultyManage from "../views/Faculty/FacultyManage/FacultyManage";
import QuizManage from "../views/Faculty/QuestionManage/QuestionManage";
import QuestionManage from "../views/Faculty/QuestionManage/QuestionManage";
import AddQues from "../views/Faculty/AddQuestion/AddQuestion";
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
    sidebarName: "Manage Questions",
    navbarName: "Manage Questions",
    icon: NotificationIcon,
    component: QuestionManage
  },
  {
    path: "/faculty/addques",
    sidebarName: "AddQuestion",
    navbarName: "AddQuestion",
    icon: NotificationIcon,
    component: AddQues
  },
  {
    redirect: true,
    path: "/faculty",
    to: "/faculty/dashboard",
    navbarName: "Redirect"
  }
];

export default dashboardRoutes;
