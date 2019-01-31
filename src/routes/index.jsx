import StudentDash from "../layouts/StudentPanel/StudentPanel.jsx";
import Login from "../layouts/Login/Login.jsx"
import AdminDash from "../layouts/AdminPanel/AdminPanel.jsx"

const indexRoutes = [{path: "/login", component: Login},{path: "/", component: AdminDash},{ path: "/student", component: StudentDash },];

export default indexRoutes;
