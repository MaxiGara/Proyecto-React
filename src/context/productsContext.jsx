import { createContext, useState, useEffect } from "react";

export const ProductsContext = createContext();

const API_URL = "https://6923331809df4a492324a54b.mockapi.io/productos";

export const ProductsProvider = ({ children }) => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // Estado de búsqueda
    const [searchTerm, setSearchTerm] = useState("");

    // Obtener productos
    const obtenerProductos = async () => {
        try {
            setCargando(true);
            const res = await fetch(API_URL);

            if (!res.ok) throw new Error("Error al cargar productos");

            const data = await res.json();
            setProductos(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        obtenerProductos();
    }, []);

    // Crear producto (POST)
    const crearProducto = async (productoNuevo) => {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productoNuevo),
        });

        const data = await res.json();
        setProductos((prev) => [...prev, data]);
    };

    // Editar (PUT)
    const editarProducto = async (id, productoEditado) => {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productoEditado),
        });

        const data = await res.json();

        setProductos((prev) =>
            prev.map((p) => (p.id === id ? data : p))
        );
    };

    // Eliminar (DELETE)
    const eliminarProducto = async (id) => {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });

        setProductos((prev) => prev.filter((p) => p.id !== id));
    };

    // Filtrar productos
    const filteredProducts = productos.filter((p) =>
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <ProductsContext.Provider
            value={{
                productos,
                filteredProducts,
                cargando,
                error,
                searchTerm,
                setSearchTerm,
                crearProducto,
                editarProducto,
                eliminarProducto,
            }}
        >
            {children}
        </ProductsContext.Provider>
    );
};