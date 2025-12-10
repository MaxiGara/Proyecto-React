import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUI } from "../context/UIContext";

const EditarProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { setLoading, setError } = useUI();

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        setLoading(true);

        const response = await fetch(`https://6923331809df4a492324a54b.mockapi.io/productos/${id}`);

        if (!response.ok) {
          throw new Error("No se pudo cargar el producto");
        }

        const data = await response.json();
        setForm(data);
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

      const response = await fetch(`https://6923331809df4a492324a54b.mockapi.io/productos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el producto");
      }

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

      <form onSubmit={handleSubmit} className="mt-3">

        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            name="description"
            rows="3"
            value={form.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">URL de Imagen</label>
          <input
            type="text"
            className="form-control"
            name="image"
            value={form.image}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-primary">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditarProducto;