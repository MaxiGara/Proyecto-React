import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminProductos = () => {
  const [productos, setProductos] = useState([]);

  const cargarProductos = async () => {
    const resp = await fetch("https://6923331809df4a492324a54b.mockapi.io/productos");
    const data = await resp.json();
    setProductos(data);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const eliminarProducto = async (id) => {
    const confirmar = confirm("¿Seguro que deseas eliminar este producto?");
    if (!confirmar) return;

    try {
      const resp = await fetch(`https://6923331809df4a492324a54b.mockapi.io/productos/${id}`, {
        method: "DELETE",
      });

      if (!resp.ok) throw new Error("Error al eliminar");

      alert("Producto eliminado");

      // Actualiza la lista sin recargar
      setProductos(productos.filter((p) => p.id !== id));
    } catch (err) {
      alert("No se pudo eliminar el producto");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Administrar Productos</h2>

      <Link to="/crear-producto">➕ Crear nuevo producto</Link>

      {productos.map((p) => (
        <div
          key={p.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginTop: "10px",
          }}
        >
          <img src={p.imagen} width={60} />
          <h3>{p.nombre}</h3>
          <p>${p.precio}</p>
          <p>Categoría: {p.categoria}</p>

          <Link to={`/editar-producto/${p.id}`}>
            ✏️ Editar
          </Link>

          <button
            style={{ marginLeft: "10px" }}
            onClick={() => eliminarProducto(p.id)}
          >
            🗑️ Eliminar
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminProductos;