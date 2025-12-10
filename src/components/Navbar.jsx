import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { FaShoppingCart, FaSignInAlt, FaSignOutAlt, FaStore } from "react-icons/fa";

export default function Navbar() {
  const { usuario, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" role="navigation">
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <FaStore /> VetShop
        </Link>

        {/* BOTÓN HAMBURGUESA */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenedor del menú */}
        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav ms-auto">

            {/* Productos */}
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-1" to="/tienda">
                <FaStore /> Productos
              </Link>
            </li>

            {/* Carrito (solo si hay usuario) */}
            {usuario && (
              <li className="nav-item">
                <Link
                  className="nav-link d-flex align-items-center gap-1"
                  to="/carrito"
                  aria-label="Ir al carrito"
                >
                  <FaShoppingCart /> Carrito
                </Link>
              </li>
            )}

            {/* Login / Logout */}
            {!usuario ? (
              <li className="nav-item">
                <Link
                  className="nav-link d-flex align-items-center gap-1"
                  to="/login"
                  aria-label="Iniciar sesión"
                >
                  <FaSignInAlt /> Login
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <button
                  className="btn btn-danger btn-sm ms-3 d-flex align-items-center gap-1"
                  onClick={logout}
                  aria-label="Cerrar sesión"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            )}
          </ul>
        </div>

      </div>
    </nav>
  );
}
