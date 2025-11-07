/** @format */

import { useEffect, useState, type JSX } from "react";
import API from "../../api/api.js";

// Interfaces
interface RoleDTO {
  id: number;
  name: string;
}

interface UserDTO {
  id: number;
  username: string;
  email: string;
  roles: RoleDTO[];
}

type SelectedRoles = Record<string, string>; // username → selected role name

export default function SuperAdminDashboard(): JSX.Element {
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [roles, setRoles] = useState<RoleDTO[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<SelectedRoles>({});

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  // Fetch all users
  const fetchUsers = async (): Promise<void> => {
    try {
      const res = await API.get<UserDTO[]>("/api/super/all-users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // Fetch all roles
  const fetchRoles = async (): Promise<void> => {
    try {
      const res = await API.get<RoleDTO[]>("/api/super/all-roles");
      setRoles(res.data);
    } catch (err) {
      console.error("Error fetching roles:", err);
    }
  };

  // Handle dropdown change
  const handleRoleChange = (username: string, roleName: string): void => {
    setSelectedRoles((prev) => ({
      ...prev,
      [username]: roleName,
    }));
  };

  // Assign selected role to user
  const assignRole = async (username: string): Promise<void> => {
    const newRole = selectedRoles[username];
    if (!newRole) return alert("Please select a role.");

    try {
      await API.put(`/api/super/assign-role/${username}`, [newRole]);
      alert(`Role updated for ${username}`);
      fetchUsers();
    } catch (err) {
      console.error("Error assigning role:", err);
      alert("Failed to assign role");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">👑 Super Admin Dashboard</h1>

      <table className="min-w-full border border-gray-300 rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Username</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Current Roles</th>
            <th className="p-3 text-left">Assign New Role</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="p-3">{u.username}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3">
                {(u.roles || []).map((r) => r.name).join(", ")}
              </td>
              <td className="p-3">
                <select
                  value={selectedRoles[u.username] || ""}
                  onChange={(e) => handleRoleChange(u.username, e.target.value)}
                  className="border border-gray-300 rounded p-1"
                >
                  <option value="">Select role</option>
                  {roles.map((r) => (
                    <option key={r.id} value={r.name}>
                      {r.name.replace("ROLE_", "")}
                    </option>
                  ))}
                </select>
              </td>
              <td className="p-3">
                <button
                  onClick={() => assignRole(u.username)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Assign
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
