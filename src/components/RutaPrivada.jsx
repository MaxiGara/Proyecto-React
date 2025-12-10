import { useContext } from "react";
import { AuthContext } from "../context/authContext.jsx";
import { Navigate } from "react-router-dom";

const RutaPrivada = ({ children }) => {
  const { usuario } = useContext(AuthContext);

  if (!usuario) return <Navigate to="/login" />;

  return children;
};

export default RutaPrivada;