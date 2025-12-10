import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="container mt-4">
      <Outlet />
    </main>
  );
};

export default Layout;