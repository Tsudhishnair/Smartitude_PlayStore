// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import BarChart from "@material-ui/icons/BarChart";
import NotificationIcon from "@material-ui/icons/QuestionAnswer";
// core components/views
import DashboardPage from "../views/Student/Dashboard/StudentDashboard.jsx";
import NotificationsPage from "../views/Student/Notifications/Notifications.jsx";
import Results from "../views/Student/Results/Results.jsx";
import PreQuizInfo from "../views/Student/QuizPanel/PreQuizInfo";
import CustomQuizSetup from "../views/Student/QuizPanel/CustomQuizSetup";
import AssignedQuizzes from "../views/Student/QuizPanel/AssignedQuizzes";
import QuizAnswer from "../views/Student/QuizPanel/QuizAnswer.jsx";

const dashboardRoutes = [
  {
    path: "/student/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Student Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/student/results",
    sidebarName: "Results",
    navbarName: "Results",
    icon: BarChart,
    component: Results
  },
  {
    path: "/student/notifications",
    sidebarName: "Notifications",
    navbarName: "Notifications",
    icon: NotificationIcon,
    component: NotificationsPage
  },
  {
    redirect: true,
    path: "/student/start_quiz",
    subRoute: true,
    component: PreQuizInfo
  },
  {
    redirect: true,
    path: "/student/quiz",
    subRoute: true,
    component: QuizAnswer
  },
  
  {
    redirect: true,
    path: "/student/custom_quiz_setup",
    subRoute: true,
    component: CustomQuizSetup
  },
  {
    redirect: true,
    path: "/student/assigned_quizzes",
    subRoute: true,
    component: AssignedQuizzes
  },
  {
    redirect: true,
    path: "/student",
    to: "/student/dashboard"
  }
];

export default dashboardRoutes;
