import { Route, Routes } from "react-router";
import DashboardLayout from "./layout/dashBoardLayout";
import HomeDashboard from "./pages/dashboard/home/Index";
import LogInPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';
import Private from './pages/auth/private';
import HomePage from "./pages/frontend/home";

function App() {
  return (
    <>
      <Routes>
        {/* Default Home Route */}
        <Route path="/" element={<HomePage />} /> {/* Add a default route for "/" */}

        {/* Auth Routes */}
        <Route path="login" element={<LogInPage />} />
        <Route path="register" element={<RegisterPage />} />

        {/* Private Route Wrapper */}
        <Route element={<Private />}>
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<HomeDashboard />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;