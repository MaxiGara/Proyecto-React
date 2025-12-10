import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import Inicio from "./pages/Inicio";
import Tienda from "./pages/Tienda";
import Navbar from "./components/Navbar";
import Carrito from "./pages/carritoPage";
import DetalleProducto from "./pages/detalleProducto";

import CrearProducto from "./pages/crearProducto";
import EditarProducto from "./pages/editarProducto";
import ProductosAdmin from "./pages/adminProductos";

import Login from "./pages/Login";
import RutaProtegida from "./components/RutaProtegida";

import GlobalLoader from "./components/UI/globalLoader";
import GlobalError from "./components/UI/globalError";

function App() {
  return (
    <>
      <GlobalLoader />
      <GlobalError />

      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Inicio />} />
            <Route path="tienda" element={<Tienda />} />
            <Route path="producto/:id" element={<DetalleProducto />} />
            <Route path="login" element={<Login />} />
            <Route path="carrito" element={<Carrito />} />

            {/* ADMIN */}
            <Route
              path="admin"
              element={
                <RutaProtegida requiereAdmin={true}>
                  <ProductosAdmin />
                </RutaProtegida>
              }
            />

            <Route
              path="admin/crear"
              element={
                <RutaProtegida requiereAdmin={true}>
                  <CrearProducto />
                </RutaProtegida>
              }
            />

            <Route
              path="admin/editar/:id"
              element={
                <RutaProtegida requiereAdmin={true}>
                  <EditarProducto />
                </RutaProtegida>
              }
            />
          </Route>
        </Routes>

      </Router>
    </>
  );
}

export default App;
