import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function RutaProtegida({ requiereAdmin = false, children }) {
  const { usuario } = useAuth();

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (requiereAdmin && usuario.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
