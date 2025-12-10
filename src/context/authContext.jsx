import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem("vetshop_user");
    if (raw) setUsuario(JSON.parse(raw));
  }, []);

  const login = ({ email, password }) => {
    if (email === "admin@admin.com" && password === "1234") {
      const userData = { nombre: "Admin", role: "admin" };
      setUsuario(userData);
      localStorage.setItem("vetshop_user", JSON.stringify(userData));
      return { ok: true };
    }

    return { ok: false, mensaje: "Credenciales incorrectas" };
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("vetshop_user");
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
