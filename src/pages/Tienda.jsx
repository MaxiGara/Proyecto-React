import { useContext, useState, useMemo } from "react";
import Producto from "../components/Producto.jsx";
import { CarritoContext } from "../context/carritoContext.jsx";
import { ProductsContext } from "../context/productsContext.jsx";

const Tienda = () => {
  const { productos, cargando, error } = useContext(ProductsContext);
  const { agregarAlCarrito } = useContext(CarritoContext);

  // ESTADOS DEL FILTRO
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  // PAGINACIÓN
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 8;

  // Generar lista de categorías únicas
  const categorias = useMemo(() => {
    const uniqueCats = new Set(productos.map((p) => p.categoria));
    return Array.from(uniqueCats);
  }, [productos]);

  // FILTRO AVANZADO (nombre + categoría)
  const productosFiltrados = useMemo(() => {
    return productos.filter((p) => {
      const coincideNombre = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
      const coincideCategoria = categoriaSeleccionada
        ? p.categoria === categoriaSeleccionada
        : true;

      return coincideNombre && coincideCategoria;
    });
  }, [productos, busqueda, categoriaSeleccionada]);

  // PAGINACIÓN
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const inicio = (paginaActual - 1) * productosPorPagina;
  const productosPagina = productosFiltrados.slice(inicio, inicio + productosPorPagina);

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p>Error al cargar productos.</p>;

  return (
    <div className="container mt-4">

      {/* TÍTULO */}
      <h2 className="fw-bold mb-4 text-center" style={{ color: "#7A4DF0" }}>
        Catálogo de Productos Veterinarios
      </h2>

      {/* FILTROS */}
      <div className="row g-3 mb-4">

        {/* BUSQUEDA */}
        <div className="col-md-6">
          <input
            type="text"
            className="form-control shadow-sm"
            placeholder="Buscar por nombre..."
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              setPaginaActual(1);
            }}
            style={{ borderColor: "#7A4DF0" }}
          />
        </div>

        {/* CATEGORÍA */}
        <div className="col-md-6">
          <select
            className="form-select shadow-sm"
            value={categoriaSeleccionada}
            onChange={(e) => {
              setCategoriaSeleccionada(e.target.value);
              setPaginaActual(1);
            }}
            style={{ borderColor: "#7A4DF0" }}
          >
            <option value="">Todas las categorías</option>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* GRID DE PRODUCTOS */}
      <div className="row">
        {productosPagina.length > 0 ? (
          productosPagina.map((producto) => (
            <Producto 
              key={producto.id} 
              producto={producto}
              agregarAlCarrito={agregarAlCarrito}
            />
          ))
        ) : (
          <p className="text-center mt-5 fs-5">No se encontraron productos</p>
        )}
      </div>

      {/* PAGINACIÓN */}
      <nav className="mt-4">
        <ul className="pagination justify-content-center">

          {/* ANTERIOR */}
          <li className={`page-item ${paginaActual === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              style={{ borderColor: "#7A4DF0", color: "#7A4DF0" }}
              onClick={() => setPaginaActual((prev) => prev - 1)}
            >
              Anterior
            </button>
          </li>

          {/* NÚMEROS */}
          {Array.from({ length: totalPaginas }, (_, i) => (
            <li
              key={i + 1}
              className={`page-item ${paginaActual === i + 1 ? "active" : ""}`}
            >
              <button
                className="page-link"
                style={{
                  borderColor: "#7A4DF0",
                  background: paginaActual === i + 1 ? "#7A4DF0" : "white",
                  color: paginaActual === i + 1 ? "white" : "#7A4DF0",
                }}
                onClick={() => setPaginaActual(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}

          {/* SIGUIENTE */}
          <li className={`page-item ${paginaActual === totalPaginas ? "disabled" : ""}`}>
            <button
              className="page-link"
              style={{ borderColor: "#7A4DF0", color: "#7A4DF0" }}
              onClick={() => setPaginaActual((prev) => prev + 1)}
            >
              Siguiente
            </button>
          </li>

        </ul>
      </nav>

    </div>
  );
};

export default Tienda;