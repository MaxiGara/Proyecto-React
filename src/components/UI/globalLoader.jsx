import { useUI } from "../../context/UIContext";

const GlobalLoader = () => {
  const { loading } = useUI();

  if (!loading) return null;

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50" style={{ zIndex: 9999 }}>
      <div className="spinner-border text-light" role="status"></div>
    </div>
  );
};

export default GlobalLoader;