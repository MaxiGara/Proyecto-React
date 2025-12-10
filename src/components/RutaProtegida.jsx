import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

const RutaProtegida = ({ children, requiereAdmin = false }) => {
  const { usuario } = useAuth();

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (requiereAdmin && usuario.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RutaProtegida;