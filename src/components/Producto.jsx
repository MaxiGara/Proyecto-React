import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useCarrito } from "../context/carritoContext";
import { ProductsContext } from "../context/productsContext";
import { toast } from "react-toastify";
import { FaCartPlus } from "react-icons/fa";

const Card = styled.div`
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.12);
  transition: transform 0.2s ease-in-out;
  border: 1px solid #eee;
  background: white;

  &:hover {
    transform: scale(1.03);
  }
`;

const Img = styled.img`
  width: 100%;
  height: 220px;
  object-fit: contain;
  padding: 10px;
  border-bottom: 1px solid #eee;
`;

const Title = styled.h5`
  color: #6a1b9a;
  font-weight: 600;
`;

const Price = styled.p`
  color: #6a1b9a;
  font-size: 1.2rem;
  font-weight: bold;
`;

const ToggleBtn = styled.button`
  width: 100%;
  border: 1px solid #6a1b9a;
  background: white;
  padding: 8px;
  border-radius: 10px;
  color: #6a1b9a;
  margin-bottom: 10px;
  transition: 0.2s;

  &:hover {
    background: #6a1b9a;
    color: white;
  }
`;

const BtnVioleta = styled.button`
  background: #6a1b9a;
  color: white;
  border: none;
  border-radius: 10px;
  width: 100%;
  padding: 10px;
  transition: 0.2s;

  &:hover {
    background: #b39ddb;
  }
`;

const OutlinedVioleta = styled(Link)`
  display: block;
  width: 100%;
  border: 1px solid #6a1b9a;
  text-align: center;
  padding: 8px;
  border-radius: 10px;
  color: #6a1b9a;
  margin-bottom: 10px;
  text-decoration: none;
  transition: 0.2s;

  &:hover {
    background: #6a1b9a;
    color: white;
  }
`;

const Details = styled.div`
  margin-top: 10px;
  text-align: left;
  font-size: 0.9rem;
  color: #555;
  padding: 5px 0;
  opacity: ${(props) => (props.show ? "1" : "0")};
  max-height: ${(props) => (props.show ? "500px" : "0")};
  overflow: hidden;
  transition: all 0.3s ease;
`;

export default function Producto({ producto, esAdmin }) {
  const { agregarAlCarrito, carrito } = useCarrito();
  const { eliminarProducto } = useContext(ProductsContext);
  const [showDetails, setShowDetails] = useState(false);

  const itemEnCarrito = carrito.find((p) => p.id === producto.id);
  const cantidad = itemEnCarrito?.cantidad || 0;

  const handleAgregar = () => {
    agregarAlCarrito(producto);
    toast.success("Producto agregado");
  };

  const handleEliminar = async () => {
    if (!confirm("¿Seguro que deseas eliminar este producto?")) return;

    await eliminarProducto(producto.id);
    toast.success("Producto eliminado");
  };

  return (
    <div className="col-md-4 mb-4">
      <Card>
        <Img src={producto.imagen} alt={producto.nombre} />

        <div className="card-body">
          <Title>{producto.nombre}</Title>
          <Price>${producto.precio}</Price>

          <ToggleBtn onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? "Ocultar detalles" : "Ver detalles"}
          </ToggleBtn>

          <Details show={showDetails}>
            <p>{producto.descripcion}</p>
            <p>
              <strong>Categoría:</strong> {producto.categoria}
            </p>
          </Details>

          <OutlinedVioleta to={`/producto/${producto.id}`}>
            Ver página del producto
          </OutlinedVioleta>

          <BtnVioleta
            onClick={handleAgregar}
            className="d-flex justify-content-center align-items-center gap-2"
          >
            <FaCartPlus />
            Agregar al carrito
            {cantidad > 0 && <span>({cantidad})</span>}
          </BtnVioleta>

          {/* --- BOTONES PARA ADMIN --- */}
          {esAdmin && (
            <div className="d-flex justify-content-between mt-3">
              <Link
                to={`/admin/editar/${producto.id}`}
                className="btn btn-warning w-50 me-2"
              >
                Editar
              </Link>

              <button
                onClick={handleEliminar}
                className="btn btn-danger w-50"
              >
                Eliminar
              </button>
            </div>
          )}

        </div>
      </Card>
    </div>
  );
}