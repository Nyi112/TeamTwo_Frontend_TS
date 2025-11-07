/** @format */

import { useEffect, useState, type JSX, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.js";
import { isTokenExpired } from "../../auth.js";
import { tryRefreshToken } from "../../api/api.js";

// Props interface
interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[]; // Optional roles that are allowed to access this route
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps): JSX.Element {
  const { accessToken, roles } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (!accessToken) {
        setIsAuth(false);
        setLoading(false);
        return;
      }

      if (isTokenExpired(accessToken)) {
        const refreshed = await tryRefreshToken();
        setIsAuth(refreshed);
      } else {
        setIsAuth(true);
      }

      setLoading(false);
    };

    checkAuth();
  }, [accessToken]);

  if (loading) return <div>Loading...</div>;

  // Ensure userRoles is always an array of strings
  const userRoles: string[] = Array.isArray(roles)
    ? roles
    : roles
    ? [roles]
    : [];

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.some((r) => userRoles.includes(r))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
