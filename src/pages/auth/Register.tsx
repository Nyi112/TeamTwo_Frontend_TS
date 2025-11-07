/** @format */

import { useState, type FormEvent, type JSX } from "react";
import API from "../../api/api.js";

interface RegisterResponse {
  username: string;
  email: string;
  fullName: string;
  password: string;
  // add other fields returned by backend if needed
}

export default function Register(): JSX.Element {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleRegister = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setMsg("");
    setSuccess(false);

    try {
      const res = await API.post<RegisterResponse>("/api/auth/register", {
        username,
        email,
        fullName,
        password,
      });

      setSuccess(true);
      setMsg(
        `User registered successfully, ${res.data.username}. Please check your email (${email}) for confirmation.`
      );

      // Clear form
      setUsername("");
      setEmail("");
      setFullName("");
      setPassword("");
    } catch (err: any) {
      console.error(err);

      // Axios error typing
      const errorMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Registration failed! Please try again.";

      setSuccess(false);
      setMsg(errorMsg);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <br />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Register</button>
      </form>
      {msg && (
        <p style={{ color: success ? "green" : "red", marginTop: "10px" }}>
          {msg}
        </p>
      )}
    </div>
  );
}
