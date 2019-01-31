import StudentDash from "../layouts/StudentPanel/StudentPanel.jsx";
import Login from "../layouts/Login/Login.jsx"
import AdminDash from "../layouts/AdminPanel/AdminPanel.jsx"

const indexRoutes = [{path: "/login", component: Login},{path: "/admin", component: AdminDash},{ path: "/", component: StudentDash },];

export default indexRoutes;
