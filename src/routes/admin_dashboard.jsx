// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import LogOutIcon from "@material-ui/icons/ExitToApp";
import BarChart from "@material-ui/icons/BarChart"
import NotificationIcon from "@material-ui/icons/QuestionAnswer"
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import Person from "@material-ui/icons/Person";
import School from "@material-ui/icons/School";
import Report from "@material-ui/icons/Assignment";

// core components/views
import DashboardPage from "../views/Admin/AdminDashboard/AdminDashboard.jsx";
import StudentManage from "../views/Admin/StudentManage/StudentManage.jsx";
import QuestionManage from "../views/Admin/QuestionManage/QuestionManage.jsx";
import NotificationManage from "../views/Admin/NotificationManager/NotificationManager.jsx";
import FacultyManage from "../views/Admin/FacultyManage/FacultyManage.jsx";
import DeptManage from "../views/Admin/DeptManage/DeptManage"
import ReportGen from "../views/Admin/ReportGen/ReportGen"
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
    component: QuestionManage
  },
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
    icon: Person,
    component: DeptManage
  },
  {
    path: "/admin/notification_management",
    sidebarName: "Notification",
    navbarName: "Notitfication",
    icon: NotificationIcon,
    component: NotificationManage
  },
  {
    path: "/admin/report_generation",
    sidebarName: "Report",
    navbarName: "Report",
    icon: Report,
    component: ReportGen
  },
  {
    path: "/admin/upgrade-to-pro",
    sidebarName: "Log Out",
    navbarName: "Log Out",
    icon: LogOutIcon,
    component: ReportGen
  },
  { redirect: true, path: "/admin", to: "/admin/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
