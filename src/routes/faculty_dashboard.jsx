// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import PlaylistAdd from "@material-ui/icons/PlaylistAdd";
import FeaturedPlayList from "@material-ui/icons/FeaturedPlayList";
import PlaylistAddCheck from "@material-ui/icons/PlaylistAddCheck";
import PlaylistPlay from "@material-ui/icons/PlaylistPlay";
// core components/views
import DashboardPage from "../views/Faculty/Dashboard/Dashboard.jsx";

import QuestionManage from "../views/Faculty/ApprovedQuestionsManage/ApprovedQuestionsManage";
import ApproveQuestion from "../views/Faculty/ApproveQuestion/ApproveQuestion";
import AddQues from "../views/Faculty/AddQuestion/AddQuestion";
import MyQuestionsManage from "../views/Faculty/MyQuestionsManage/MyQuestionsManage";

const dashboardRoutes = [
  {
    path: "/faculty/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Faculty Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/faculty/my_questions",
    sidebarName: "My Questions",
    navbarName: "My Questions",
    icon: FeaturedPlayList,
    component: MyQuestionsManage
  },
  {
    path: "/faculty/approved_questions",
    sidebarName: "Approved Questions",
    navbarName: "Approved Questions",
    icon: PlaylistPlay,
    component: QuestionManage
  },
  {
    path: "/faculty/awaiting_questions",
    sidebarName: "Awaiting Approval",
    navbarName: "Awaiting Approval",
    icon: PlaylistAddCheck,
    component: ApproveQuestion
  },
  {
    path: "/faculty/add_new_question",
    sidebarName: "Add Question",
    navbarName: "Add Question",
    icon: PlaylistAdd,
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
