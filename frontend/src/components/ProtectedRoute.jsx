import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  return localStorage.getItem("isLoggedIn") ? children : <Navigate to="/" />;
}