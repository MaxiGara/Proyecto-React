import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductsContext } from "../context/productsContext";

const ProductosAdmin = () => {
  const { productos, eliminarProducto } = useContext(ProductsContext);

  const handleDelete = async (id) => {
    const confirmar = confirm("¿Seguro que deseas eliminar este producto?");
    if (!confirmar) return;

    await eliminarProducto(id);
    alert("Producto eliminado");
  };

  return (
    <div className="container py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">Administrar Productos</h2>
        <Link className="btn btn-success" to="/admin/crear">
          ➕ Crear nuevo producto
        </Link>
      </div>

      {/* Lista de productos */}
      <div className="row">
        {productos.map((p) => (
          <div className="col-md-4 mb-4" key={p.id}>
            <div className="card h-100 shadow-sm">

              <img
                src={p.imagen}
                className="card-img-top"
                style={{ height: "180px", objectFit: "contain" }}
                alt={p.nombre}
              />

              <div className="card-body">
                <h5 className="card-title">{p.nombre}</h5>
                <p className="card-text mb-1">💲 Precio: ${p.precio}</p>
                <p className="card-text">📦 Categoría: {p.categoria}</p>

                {p.descripcion && (
                  <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                    {p.descripcion.substring(0, 60)}...
                  </p>
                )}
              </div>

              <div className="card-footer d-flex justify-content-between">
                <Link className="btn btn-warning btn-sm" to={`/admin/editar/${p.id}`}>
                  ✏️ Editar
                </Link>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(p.id)}
                >
                  🗑️ Eliminar
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ProductosAdmin;