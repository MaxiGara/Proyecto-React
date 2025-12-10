import { useState } from "react";

const CrearProducto = () => {
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: "",
    categoria: "",
  });

  const handleChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!producto.nombre || !producto.precio) {
      alert("Nombre y precio son obligatorios");
      return;
    }

    try {
      const respuesta = await fetch(
        "https://6923331809df4a492324a54b.mockapi.io/productos",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...producto,
            precio: Number(producto.precio),
          }),
        }
      );

      if (!respuesta.ok) throw new Error("Error al crear el producto");

      alert("Producto creado exitosamente");

      setProducto({
        nombre: "",
        descripcion: "",
        precio: "",
        imagen: "",
        categoria: "",
      });
    } catch (error) {
      alert("Hubo un error al crear el producto");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Crear Producto</h2>

      <form
        onSubmit={handleSubmit}
        className="mt-3"
        style={{ maxWidth: "400px" }}
      >
        <input
          type="text"
          name="nombre"
          className="form-control mb-2"
          placeholder="Nombre"
          value={producto.nombre}
          onChange={handleChange}
        />

        <input
          type="text"
          name="descripcion"
          className="form-control mb-2"
          placeholder="Descripción"
          value={producto.descripcion}
          onChange={handleChange}
        />

        <input
          type="number"
          name="precio"
          className="form-control mb-2"
          placeholder="Precio"
          value={producto.precio}
          onChange={handleChange}
        />

        <input
          type="text"
          name="imagen"
          className="form-control mb-2"
          placeholder="URL de imagen"
          value={producto.imagen}
          onChange={handleChange}
        />

        <input
          type="text"
          name="categoria"
          className="form-control mb-3"
          placeholder="Categoría"
          value={producto.categoria}
          onChange={handleChange}
        />

        <button className="btn btn-success w-100">Crear Producto</button>
      </form>
    </div>
  );
};

export default CrearProducto;