// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import NotificationIcon from "@material-ui/icons/QuestionAnswer";
import BubbleChart from "@material-ui/icons/BubbleChart";
import Person from "@material-ui/icons/Person";
import School from "@material-ui/icons/School";
import Account from "@material-ui/icons/AccountBalance";
// core components/views
import DashboardPage from "../views/Admin/AdminDashboard/AdminDashboard.jsx";
import StudentManage from "../views/Admin/StudentManage/StudentManage.jsx";
import QuizManage from "../views/Admin/QuizManage/QuizManage";
import NotificationManage from "../views/Admin/NotificationManager/MessageManager.jsx";
import FacultyManage from "../views/Admin/FacultyManage/FacultyManage.jsx";
import DeptManage from "../views/Admin/DeptManage/DeptManage";
import CategoryManagement from "../views/Admin/CategoryManagement/CategoryManagement.jsx";

const dashboardRoutes = [
  {
    path: "/admin/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Admin Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/admin/student_management",
    sidebarName: "Student",
    navbarName: "Student",
    icon: School,
    component: StudentManage
  },
  {
    path: "/admin/faculty_management",
    sidebarName: "Faculty",
    navbarName: "Faculty",
    icon: Person,
    component: FacultyManage
  },
  {
    path: "/admin/quiz_management",
    sidebarName: "Quiz",
    navbarName: "Quiz",
    icon: NotificationIcon,
    component: QuizManage
  },
  // TODO: Question Management section yet to be completed
  // {
  //   path: "/admin/question_management",
  //   sidebarName: "Questions",
  //   navbarName: "Questions",
  //   icon: Message,
  //   component: QuestionManage
  // },
  {
    path: "/admin/category_management",
    sidebarName: "Category",
    navbarName: "Category",
    icon: BubbleChart,
    component: CategoryManagement
  },

  {
    path: "/admin/dept_management",
    sidebarName: "Department",
    navbarName: "Department",
    icon: Account,
    component: DeptManage
  },
  {
    path: "/admin/notification_management",
    sidebarName: "Notification",
    navbarName: "Notitfication",
    icon: NotificationIcon,
    component: NotificationManage
  },
  // Hiden only for evaluation purpose required to do the work after evaluation
  // ----------------------------------------------------------------------------------------------
  // {
  //   path: "/admin/report_generation",
  //   sidebarName: "Report",
  //   navbarName: "Report",
  //   icon: Report,
  //   component: ReportGen
  // },
  //-----------------------------------------------------------------------------------------------------
  // {
  //   path: "/admin/log-out",
  //   sidebarName: "Log Out",
  //   navbarName: "Log Out",
  //   icon: LogOutIcon,
  //   component: ReportGen
  // },
  // {
  //   path: "/admin/log-out",
  //   sidebarName: "Log Out",
  //   navbarName: "Log Out",
  //   icon: LogOutIcon,
  //   component: MessageDialog
  // },
  {
    redirect: true,
    path: "/admin",
    to: "/admin/dashboard",
    navbarName: "Redirect"
  }
];

export default dashboardRoutes;
