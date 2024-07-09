import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import HomePage from "./components/pages/HomePage";
import SuperAdminDashboardPage from "./components/pages/SuperAdminDashboardPage";
import AdminDashboardPage from "./components/pages/AdminDashboardPage";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" Component={HomePage} />
                <Route path="/admin" Component={AdminDashboardPage} />
                <Route path="/super-admin" Component={SuperAdminDashboardPage} />
                <Route path="/login" Component={LoginPage} />
                <Route path="/register" Component={RegisterPage} />
            </Routes>
        </Router>
    )
}