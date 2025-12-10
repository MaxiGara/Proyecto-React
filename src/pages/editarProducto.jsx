import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUI } from "../context/UIContext";

const EditarProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { setLoading, setError } = useUI();

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: "",
    categoria: "",
  });

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://6923331809df4a492324a54b.mockapi.io/productos/${id}`
        );

        if (!response.ok) throw new Error("No se pudo cargar el producto");

        const data = await response.json();

        setForm({
          nombre: data.nombre,
          descripcion: data.descripcion,
          precio: data.precio,
          imagen: data.imagen,
          categoria: data.categoria,
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id, setLoading, setError]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        `https://6923331809df4a492324a54b.mockapi.io/productos/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            precio: Number(form.precio),
          }),
        }
      );

      if (!res.ok) throw new Error("Error al actualizar el producto");

      navigate("/admin");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Editar Producto</h2>

      <form onSubmit={handleSubmit} className="mt-3" style={{ maxWidth: "400px" }}>

        <label className="form-label">Nombre</label>
        <input
          type="text"
          className="form-control mb-2"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />

        <label className="form-label">Precio</label>
        <input
          type="number"
          className="form-control mb-2"
          name="precio"
          value={form.precio}
          onChange={handleChange}
          required
        />

        <label className="form-label">Descripción</label>
        <textarea
          className="form-control mb-2"
          name="descripcion"
          rows="3"
          value={form.descripcion}
          onChange={handleChange}
        ></textarea>

        <label className="form-label">URL de Imagen</label>
        <input
          type="text"
          className="form-control mb-2"
          name="imagen"
          value={form.imagen}
          onChange={handleChange}
        />

        <label className="form-label">Categoría</label>
        <input
          type="text"
          className="form-control mb-3"
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
        />

        <button className="btn btn-primary w-100">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditarProducto;