import StudentDash from "../layouts/StudentPanel/StudentPanel.jsx";
import AdminLogin from "../layouts/Login/AdminLogin.jsx";
import StudentLogin from "../layouts/Login/StudentLogin.jsx";
import FacultyLogin from "../layouts/Login/FacultyLogin";
import Landing from "../layouts/Landing/Landing";
import AdminDash from "../layouts/AdminPanel/AdminPanel.jsx";

const indexRoutes = [
  { path: "/admin/login", component: AdminLogin },
  { path: "/fac/login", component: FacultyLogin },
  { path: "/stud/login", component: StudentLogin },
  { path: "/admin/", component: AdminDash },
  { path: "/student/", component: StudentDash },
  { path: "/", component: Landing }
];

export default indexRoutes;
