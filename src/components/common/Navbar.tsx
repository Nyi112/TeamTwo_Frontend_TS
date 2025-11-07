/** @format */

import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.js";
import { useState, useEffect } from "react";
import { Building, LogIn, UserPlus, LogOut, User } from "lucide-react";

export default function Navbar() {
  const { username, roles, accessToken, logout } = useAuth();
  const [auth, setAuth] = useState(false);

  // Update auth state when token changes
  useEffect(() => {
    setAuth(!!accessToken);
  }, [accessToken]);

  // Helper: check if user has a specific role
  const hasRole = (role: string): boolean =>
    Array.isArray(roles) && roles.includes(role);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Building className="h-8 w-8 text-blue-600" />
            <Link
              to="/"
              className="ml-2 text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
            >
              Sein Gay Har MMS
            </Link>
          </div>

          {/* Navigation Links - Center */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </Link>

            {auth && (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Dashboard
                </Link>

                <Link
                  to="/bod-dashboard"
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  BOD Dashboard
                </Link>

                {hasRole("ROLE_SUPERADMIN") && (
                  <Link
                    to="/super-admin"
                    className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Super Admin
                  </Link>
                )}

                {hasRole("ROLE_ADMIN") && (
                  <Link
                    to="/admin"
                    className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Admin
                  </Link>
                )}

                {hasRole("ROLE_GUEST") && (
                  <Link
                    to="/user"
                    className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    User
                  </Link>
                )}

                {/* <Link
                  to="/activeContracts"
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Active Contracts
                </Link> */}

                <Link
                  to="/tokenInfo"
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Token Info
                </Link>
              </>
            )}
          </div>

          {/* Right Side - Auth Section */}
          <div className="flex items-center space-x-3">
            {!auth ? (
              <>
                <Link
                  to="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center transition-colors"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md text-sm font-medium flex items-center transition-colors"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Register
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                {/* User Info */}
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-700">
                    Hi, <span className="font-medium">{username}</span>
                  </span>
                </div>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="text-gray-600 hover:text-red-600 bg-transparent border-none cursor-pointer flex items-center text-sm font-medium transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation - Show on small screens */}
        <div className="md:hidden pb-4">
          <div className="flex flex-col space-y-2">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </Link>

            {auth && (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Dashboard
                </Link>

                <Link
                  to="/bod-dashboard"
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  BOD Dashboard
                </Link>

                {hasRole("ROLE_SUPERADMIN") && (
                  <Link
                    to="/super-admin"
                    className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Super Admin
                  </Link>
                )}

                {hasRole("ROLE_ADMIN") && (
                  <Link
                    to="/admin"
                    className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Admin
                  </Link>
                )}

                {hasRole("ROLE_GUEST") && (
                  <Link
                    to="/user"
                    className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    User
                  </Link>
                )}

                <Link
                  to="/students"
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Students
                </Link>

                <Link
                  to="/activeContracts"
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Active Contracts
                </Link>

                <Link
                  to="/tokenInfo"
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Token Info
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
