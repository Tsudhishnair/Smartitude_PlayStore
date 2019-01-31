import StudentDash from "layouts/Dashboard/Dashboard.jsx";
import Login from "layouts/Login/Login.jsx"
import AdminDash from "layouts/Admin_Dashboard/AdminDashboard.jsx"

const indexRoutes = [{path: "/login", component: Login},{path: "/admin", component: AdminDash},{ path: "/", component: StudentDash },];

export default indexRoutes;
