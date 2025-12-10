import { createContext, useState, useEffect, useContext } from "react";

export const CarritoContext = createContext(null);

export const CarritoProvider = ({ children }) => {

  const [carrito, setCarrito] = useState(() => {
    try {
      const raw = localStorage.getItem("carrito_vetshop");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("carrito_vetshop", JSON.stringify(carrito));
    } catch {}
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    if (!producto || !producto.id) {
      console.warn("Producto inválido", producto);
      return;
    }

    setCarrito((prev) => {
      const exists = prev.find((p) => p.id === producto.id);
      if (exists) {
        return prev.map((p) =>
          p.id === producto.id
            ? { ...p, cantidad: (p.cantidad || 1) + 1 }
            : p
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const eliminarDelCarrito = (id) =>
    setCarrito((prev) => prev.filter((p) => p.id !== id));

  const vaciarCarrito = () => setCarrito([]);

  const total = carrito.reduce(
    (acc, p) => acc + Number(p.precio || 0) * (p.cantidad || 1),
    0
  );

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        total,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => {
  return useContext(CarritoContext);
};