/** @format */

import { useEffect, useState } from "react";
import API from "../../api/api.js";

interface DashboardStats {
  activeContracts: number;
  pendingTasks: number;
}

interface UserDashboardDTO {
  username: string;
  email: string;
  roles: string[];
  welcomeMessage: string;
  stats: DashboardStats;
}

export default function UserDashboard() {
  const [dashboard, setDashboard] = useState<UserDashboardDTO | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get<UserDashboardDTO>("/api/user/dashboard");
        setDashboard(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard:", err);
        setError("Failed to load dashboard. Please login again.");
        // Optional: redirect manually if needed
        // window.location.href = "/login";
      }
    };

    fetchDashboard();
  }, []);

  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!dashboard) return <div className="p-8">Loading dashboard...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{dashboard.welcomeMessage}</h1>
      <p>
        <strong>Username:</strong> {dashboard.username}
      </p>
      <p>
        <strong>Email:</strong> {dashboard.email}
      </p>
      <p>
        <strong>Roles:</strong> {dashboard.roles.join(", ")}
      </p>
      <p>
        <strong>Active Contracts:</strong> {dashboard.stats.activeContracts}
      </p>
      <p>
        <strong>Pending Tasks:</strong> {dashboard.stats.pendingTasks}
      </p>
    </div>
  );
}
