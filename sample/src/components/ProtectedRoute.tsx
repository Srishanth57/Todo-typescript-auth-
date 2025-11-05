import React from "react";
import { Navigate } from "react-router";
import Cookie from "js-cookie";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = Cookie.get("jwt_token");

  if (!token) {
    // Use Navigate(v6) instead of Redirect (v5)
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
