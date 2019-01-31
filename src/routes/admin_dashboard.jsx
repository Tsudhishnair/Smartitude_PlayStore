// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import LogOutIcon from "@material-ui/icons/ExitToApp";
import BarChart from "@material-ui/icons/BarChart"
import NotificationIcon from "@material-ui/icons/QuestionAnswer"
import LibraryBooks from "@material-ui/icons/LibraryBooks";
// import ContentPaste from "@material-ui/icons/ContentPaste";

// core components/views
import DashboardPage from "../views/Admin/AdminDashboard/AdminDashboard.jsx";
import LogOut from "views/Login/Login.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import Results from "../views/Results/Results";
import Typography from "views/Typography/Typography.jsx";
import StudentManage from "../views/Admin/StudentManage/StudentManage.jsx";
import QuestionManage from "../views/Admin/QuestionManage/QuestionManage.jsx";
import FacultyManage from "../views/Admin/FacultyManage/FacultyManage.jsx";



const dashboardRoutes = [
  {
    path: "/admin_dashboard",
    sidebarName: "Dashboard",
    navbarName: "Admin Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/student_management",
    sidebarName: "Student Management",
    navbarName: "Student Management",
    icon: BarChart,
    component: StudentManage
  },
  {
    path: "/question_management",
    sidebarName: "Question Management",
    navbarName: "Question Management",
    icon: NotificationIcon,
    component: QuestionManage
  },
  {
    path: "/faculty_management",
    sidebarName: "Faculty Management",
    navbarName: "Faculty Management",
    icon: LibraryBooks,
    component: FacultyManage
  },
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
    component: LogOut
  },
  { redirect: true, path: "/admin", to: "/admin_dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
