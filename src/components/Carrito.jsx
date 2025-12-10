import { useContext } from "react";
import { CarritoContext } from "../context/carritoContext";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

export default function Carrito() {
  const { carrito, eliminarDelCarrito, vaciarCarrito, total } = useContext(CarritoContext);

  const handleEliminar = (id) => {
    eliminarDelCarrito(id);
    toast.info("Producto eliminado");
  };

  const handleVaciar = () => {
    vaciarCarrito();
    toast.warn("Carrito vaciado");
  };

  return (
    <div className="container mt-4">
      <Helmet>
        <title>Carrito — VetShop</title>
      </Helmet>

      <h2 className="fw-bold text-primary">Carrito</h2>

      {carrito.length === 0 ? (
        <p>Carrito vacío 🛒</p>
      ) : (
        <>
          <ul className="list-group mt-3">
            {carrito.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  {item.nombre} x {item.cantidad}
                  <div className="text-muted small">${item.precio}</div>
                </div>

                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleEliminar(item.id)}
                  aria-label="Eliminar producto"
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-3">
            <h4>Total: <strong>${total}</strong></h4>

            <button className="btn btn-danger mt-2" onClick={handleVaciar} aria-label="Vaciar carrito">
              Vaciar carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
}
