import React from "react";
import { Navigate } from "react-router-dom";
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");
  if (!token && userRole !== "Admin") {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default AdminRoute;
