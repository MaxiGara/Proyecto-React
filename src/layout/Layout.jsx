import { Outlet } from "react-router-dom";
import Footer from "./../components/Footer";

const Layout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="container mt-4 flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;