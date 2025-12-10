import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUI } from "../../context/UIContext";

const ProductosAdmin = () => {
  const [productos, setProductos] = useState([]);
  const { setLoading, setError } = useUI();

  const fetchProductos = async () => {
    try {
      setLoading(true);

      const resp = await fetch("https://6923331809df4a492324a54b.mockapi.io/productos");
      if (!resp.ok) throw new Error("No se pudieron cargar los productos");

      const data = await resp.json();
      setProductos(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const eliminarProducto = async (id) => {
    const confirmar = confirm("¿Seguro que deseas eliminar este producto?");
    if (!confirmar) return;

    try {
      setLoading(true);

      const resp = await fetch(`https://6923331809df4a492324a54b.mockapi.io/productos/${id}`, {
        method: "DELETE",
      });

      if (!resp.ok) throw new Error("No se pudo eliminar el producto");

      setProductos((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Administrar Productos</h2>
        <Link className="btn btn-primary" to="/admin/crear">
          + Crear Producto
        </Link>
      </div>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Título</th>
            <th>Precio</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>
                <img src={p.image} alt={p.title} width={60} />
              </td>
              <td>{p.title}</td>
              <td>${p.price}</td>
              <td>
                <div className="d-flex gap-2">
                  <Link
                    to={`/admin/editar/${p.id}`}
                    className="btn btn-warning btn-sm"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => eliminarProducto(p.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductosAdmin;