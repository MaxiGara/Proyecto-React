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

    // Validaciones simples
    if (!producto.nombre || !producto.precio) {
      alert("Nombre y precio son obligatorios");
      return;
    }

    try {
      const respuesta = await fetch("https://6923331809df4a492324a54b.mockapi.io/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...producto,
          precio: Number(producto.precio),
        }),
      });

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
      console.error(error);
      alert("Hubo un error al crear el producto");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Crear Producto</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}>

        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={producto.nombre}
          onChange={handleChange}
        />

        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={producto.descripcion}
          onChange={handleChange}
        />

        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={producto.precio}
          onChange={handleChange}
        />

        <input
          type="text"
          name="imagen"
          placeholder="URL de la imagen"
          value={producto.imagen}
          onChange={handleChange}
        />

        <input
          type="text"
          name="categoria"
          placeholder="Categoría"
          value={producto.categoria}
          onChange={handleChange}
        />

        <button type="submit">Crear Producto</button>
      </form>
    </div>
  );
};

export default CrearProducto;