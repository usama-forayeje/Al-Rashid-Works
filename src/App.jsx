import { Route, Routes } from "react-router";
import DashboardLayout from "./layout/dashBoardLayout";
import HomeDashboard from "./pages/dashboard/home/Index";
import LogInPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import Private from "./pages/auth/private";
import HomePage from "./pages/frontend/home";
import {
  AllUser,
  CreateCategory,
  CreateMaster,
  CreateOrder,
  CreateWorkers,
  IndexOrder,
  IndexWorkers,
} from "./pages";

function App() {
  return (
    <>
      <Routes>
        {/* Default Home Route */}
        <Route path="/" element={<HomePage />} />{" "}
        {/* Add a default route for "/" */}
        {/* Auth Routes */}
        <Route path="login" element={<LogInPage />} />
        <Route path="register" element={<RegisterPage />} />
        {/* Private Route Wrapper */}
        <Route element={<Private />}>
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<HomeDashboard />} />
            <Route path="create-order" element={<CreateOrder />} />
            <Route path="index-order" element={<IndexOrder />} />

            <Route path="create-master" element={<CreateMaster />} />

            <Route path="create-workers" element={<CreateWorkers />} />
            <Route path="index-workers" element={<IndexWorkers />} />

            <Route path="create-category" element={<CreateCategory />} />

            <Route path="users/all" element={<AllUser />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
