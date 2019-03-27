// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import AddComment from "@material-ui/icons/AddComment";
import PlaylistAdd from "@material-ui/icons/PlaylistAddCheck";
import NotificationIcon from "@material-ui/icons/QuestionAnswer";
// core components/views
import DashboardPage from "../views/Faculty/Dashboard/Dashboard.jsx";

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
    path: "/faculty/questions",
    sidebarName: "Manage Questions",
    navbarName: "Manage Questions",
    icon: NotificationIcon,
    component: QuestionManage
  },
  {
    path: "/faculty/approve_questions",
    sidebarName: "Approve Questions",
    navbarName: "Approve Questions",
    icon: PlaylistAdd,
    component: QuestionManage
  },
  {
    path: "/faculty/add_new_question",
    sidebarName: "Add Question",
    navbarName: "Add Question",
    icon: AddComment,
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
