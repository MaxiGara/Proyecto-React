## Veterinaria Online - E-Commerce con Panel Administrador 🐾 ##
Proyecto desarrollado en React, utilizando MockAPI como backend para gestionar productos. Incluye un e-commerce completo con carrito y un panel administrador con funcionalidades CRUD para crear, editar y eliminar productos directamente desde la página.

***************************************************************************

## 🚀 Tecnologías utilizadas ##
✅ React
✅ React Router DOM
✅ Bootstrap 5
✅ Context API
✅ CSS personalizado
✅ MockAPI (para el almacenamiento de productos)

***************************************************************************

## 🧭 Funcionalidades principales ##

## 🛒 E-Commerce ##
Listado de productos provenientes de MockAPI
Vista de productos con imagen, título y precio
Carrito de compras
Contexto global para manejo del carrito
Diseño responsivo
Estética violeta y blanca según requerimiento

***************************************************************************

## 🗂 Panel Administrador ##
Ruta: /admin
Listado de productos con imagen, nombre y precio
Crear producto
Editar producto
Eliminar producto
Actualización automática mediante Context
CRUD completo 100% funcional con MockAPI

***************************************************************************

## 📡 API utilizada ##
Los datos provienen de:

https://6923331809df4a492324a54b.mockapi.io/productos

***************************************************************************

## 🗂 Formato de cada producto ##
json
{
  "id": "1",
  "nombre": "Collar para perro",
  "precio": 2500,
  "categoria": "Perros",
  "descripcion": "Producto de prueba",
  "imagen": "https://url-imagen.com"
}

***************************************************************************

## 🗂 Estructura del proyecto ##
css
src/
  components/
  context/
    CartContext.jsx
    ProductsContext.jsx
    UIContext.jsx
  pages/
    Home.jsx
    Productos.jsx
    AdminProductos.jsx
    CrearProducto.jsx
    EditarProducto.jsx
  routes/
    AppRouter.jsx
  index.css
  main.jsx

***************************************************************************

## 🧱 Instalación y ejecución ##
Clonar el repositorio
bash
git clone https://github.com/tuusuario/tu-repositorio.git
Instalar dependencias
bash
npm install
Iniciar el entorno de desarrollo
bash
npm run dev
Abrir en el navegador
text
http://localhost:5173

***************************************************************************

## 🧭 Uso del Panel Admin ##
Crear un producto
Ingresar a: /admin/crear
Editar un producto
Ruta: /admin/editar/:id
Eliminar un producto
Botón “Eliminar”, con confirmación vía window.confirm.
Todas las acciones se sincronizan con MockAPI.

***************************************************************************

## 🏗 Build para producción ##
bash
npm run build
La carpeta generada /dist puede desplegarse en:

Vercel
Netlify
GitHub Pages
Cualquier servidor estático

## Despliegue recomendado ##
Vercel

Importar el repositorio → seleccionar framework Vite → deploy automático.