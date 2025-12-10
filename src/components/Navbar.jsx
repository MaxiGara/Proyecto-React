import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useCarrito } from "../context/carritoContext";
import { FaShoppingCart, FaSignInAlt, FaSignOutAlt, FaStore, FaTools } from "react-icons/fa";

export default function Navbar() {
  const { usuario, logout } = useAuth();
  const { carrito } = useCarrito();

  const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" role="navigation">
      <div className="container">

        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <FaStore /> VetyShop
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-1" to="/tienda">
                <FaStore /> Productos
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link d-flex align-items-center gap-2 position-relative"
                to="/carrito"
              >
                <FaShoppingCart />
                Carrito
                {totalItems > 0 && (
                  <span className="badge bg-primary ms-1">{totalItems}</span>
                )}
              </Link>
            </li>

            {/* Entrada al panel admin */}
            {usuario?.role === "admin" && (
              <li className="nav-item">
                <Link
                  className="nav-link d-flex align-items-center gap-1 text-warning"
                  to="/admin"
                >
                  <FaTools /> Admin
                </Link>
              </li>
            )}

            {/* Login / Logout */}
            {!usuario ? (
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center gap-1" to="/login">
                  <FaSignInAlt /> Login
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <button
                  className="btn btn-danger btn-sm ms-3 d-flex align-items-center gap-1"
                  onClick={logout}
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