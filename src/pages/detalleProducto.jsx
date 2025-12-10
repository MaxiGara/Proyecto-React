import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CarritoContext } from "../context/carritoContext";

const DetalleProducto = () => {
  const { id } = useParams();
  const { agregarAlCarrito } = useContext(CarritoContext);

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let abort = false;
    const obtenerProducto = async () => {
      try {
        setCargando(true);
        setError(false);

        const respuesta = await fetch(
          `https://6923331809df4a492324a54b.mockapi.io/productos/${id}`
        );

        if (!respuesta.ok) throw new Error("Producto no encontrado");

        const data = await respuesta.json();
        if (!abort) setProducto(data);
      } catch (err) {
        if (!abort) setError(true);
        console.error("Error al obtener producto:", err);
      } finally {
        if (!abort) setCargando(false);
      }
    };

    obtenerProducto();
    return () => {
      abort = true;
    };
  }, [id]);

  if (cargando) return <p>Cargando producto...</p>;
  if (error || !producto) return <p>Error al cargar el producto.</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <img
        src={producto.imagen}
        alt={producto.nombre}
        style={{ maxWidth: "300px", width: "100%" }}
      />
      <h2>{producto.nombre}</h2>
      <p>{producto.descripcion}</p>
      <p>
        <strong>${producto.precio}</strong>
      </p>

      <button onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</button>
    </div>
  );
};

export default DetalleProducto;