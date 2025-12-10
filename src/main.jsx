import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CarritoProvider } from "./context/carritoContext.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import { ProductsProvider } from "./context/productsContext.jsx";
import { UIProvider } from "./context/UIContext.jsx";
import "./styles/custom.scss";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <UIProvider>
        <ProductsProvider>
          <CarritoProvider>
            <App />
          </CarritoProvider>
        </ProductsProvider>
      </UIProvider>
    </AuthProvider>
  </React.StrictMode>
);