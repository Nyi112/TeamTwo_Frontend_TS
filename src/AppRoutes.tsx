/** @format */
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute.js";

import Login from "./pages/auth/Login.js";
import Register from "./pages/auth/Register.js";
import Logout from "./pages/auth/Logout.js";

import Unauthorized from "./pages/Unauthorized.js";
import TokenInfo from "./pages/TokenInfo.js";
import ActiveContracts from "./components/ActiveContracts.js";
import SuperAdminDashboard from "./pages/dashboard/SuperAdminDashboard.js";
import AdminDashboard from "./pages/dashboard/AdminDashboard.js";
import UserDashboard from "./pages/dashboard/UserDashboard.js";
import Dashboard from "./pages/dashboard/Dashboard.js";
import { BODDashboard } from "./pages/dashboard/BODDashboard.js";
import Home from "./pages/Home.js";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/bod-dashboard" element={<BODDashboard />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tokenInfo"
        element={
          <ProtectedRoute>
            <TokenInfo />
          </ProtectedRoute>
        }
      />

      <Route
        path="/activeContracts"
        element={
          <ProtectedRoute>
            <ActiveContracts />
          </ProtectedRoute>
        }
      />

      {/* Role-based dashboards */}
      <Route
        path="/super-admin"
        element={
          <ProtectedRoute allowedRoles={["ROLE_SUPERADMIN"]}>
            <SuperAdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user"
        element={
          <ProtectedRoute allowedRoles={["ROLE_GUEST"]}>
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/logout"
        element={
          <ProtectedRoute>
            <Logout />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
