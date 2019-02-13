import StudentDash from "../layouts/StudentPanel/StudentPanel.jsx";
import Login from "../layouts/Login/Login.jsx"
import Landing from "../layouts/Landing/Landing"
import AdminDash from "../layouts/AdminPanel/AdminPanel.jsx"

const indexRoutes = [{path: "/home", component: Landing},{path: "/login", component: Login},{path: "/admin/", component: AdminDash},{ path: "/student/", component: StudentDash },];

export default indexRoutes;
