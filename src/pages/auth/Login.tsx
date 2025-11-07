/** @format */

import { useState, type FormEvent, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.js"; // make sure extension matches
import API from "../../api/api.js"; // make sure extension matches

// Interface for login response from backend
interface LoginResponse {
  username: string;
  token: string; // access token
  refreshToken: string;
  roles: string[]; // single role
}

export default function Login(): JSX.Element {
  const [username, setUsername] = useState<string>("");
  const [passwordHash, setPassword] = useState<string>("");
  const [msg, setMsg] = useState<string>("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await API.post<LoginResponse>("/api/auth/login", {
        username,
        passwordHash,
      });

      console.log("Login response:", res.data);

      const {
        username: user,
        token: accessToken,
        refreshToken,
        roles,
      } = res.data;

      if (user && accessToken && refreshToken && roles?.length > 0) {
        // Save user info in context
        login({ username: user, accessToken, refreshToken, roles });

        // Redirect based on role string
        if (roles.includes("ROLE_SUPERADMIN")) navigate("/super-admin");
        else if (roles.includes("ROLE_ADMIN")) navigate("/admin");
        else navigate("/user");
      } else {
        setMsg("Login failed! Invalid response.");
      }
    } catch (err: any) {
      console.error("Login error:", err?.response || err);
      setMsg("Login failed! Please check credentials or server.");
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={passwordHash}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          required
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
      {msg && <p style={{ marginTop: "10px", color: "red" }}>{msg}</p>}
    </div>
  );
}
