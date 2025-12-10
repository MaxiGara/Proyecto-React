import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useCarrito } from "../context/carritoContext";
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

export default function Producto({ producto }) {
  const { agregarAlCarrito } = useCarrito();
  const [showDetails, setShowDetails] = useState(false);

  const handleAgregar = () => {
    agregarAlCarrito(producto);
    toast.success("Producto agregado");
  };

  return (
    <div className="col-md-4 mb-4">
      <Card>
        <Img src={producto.imagen} alt={producto.nombre} />

        <div className="card-body">
          <Title>{producto.nombre}</Title>
          <Price>${producto.precio}</Price>

          {/* Botón de desplegable */}
          <ToggleBtn onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? "Ocultar detalles" : "Ver detalles"}
          </ToggleBtn>

          {/* Contenido expandible */}
          <Details show={showDetails}>
            <p>{producto.descripcion}</p>
            <p><strong>Categoría:</strong> {producto.categoria}</p>
          </Details>

          {/* Link a página del producto */}
          <OutlinedVioleta to={`/producto/${producto.id}`}>
            Ver página del producto
          </OutlinedVioleta>

          {/* Botón agregar */}
          <BtnVioleta onClick={handleAgregar} className="d-flex justify-content-center align-items-center gap-2">
            <FaCartPlus />
            Agregar al carrito
          </BtnVioleta>
        </div>
      </Card>
    </div>
  );
}