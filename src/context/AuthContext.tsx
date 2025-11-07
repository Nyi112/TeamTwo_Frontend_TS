/** @format */

import { createContext, useContext, useState, type ReactNode } from "react";
import {
  saveAuthData,
  clearAuthData,
  getUsername,
  getAccessToken,
  getRefreshToken,
  getRoles,
} from "../auth.js";

interface AuthData {
  username: string;
  accessToken: string;
  refreshToken: string;
  roles: string[];
}

interface AuthContextType {
  username: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  roles: string[];
  login: (data: AuthData) => void;
  logout: () => void;
}

const defaultAuth: AuthContextType = {
  username: getUsername(),
  accessToken: getAccessToken(),
  refreshToken: getRefreshToken(),
  roles: getRoles(),
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuth);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState<string | null>(getUsername());
  const [accessToken, setAccessToken] = useState<string | null>(
    getAccessToken()
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    getRefreshToken()
  );
  const [roles, setRoles] = useState<string[]>(getRoles());

  const login = ({ username, accessToken, refreshToken, roles }: AuthData) => {
    setUsername(username);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setRoles(roles);
    saveAuthData({ username, accessToken, refreshToken, roles });
  };

  const logout = () => {
    setUsername(null);
    setAccessToken(null);
    setRefreshToken(null);
    setRoles([]);
    clearAuthData();
  };

  return (
    <AuthContext.Provider
      value={{ username, accessToken, refreshToken, roles, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  return useContext(AuthContext);
}
