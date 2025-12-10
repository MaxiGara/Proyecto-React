import { useUI } from "../../context/UIContext";

const GlobalError = () => {
  const { error, clearError } = useUI();

  if (!error) return null;

  return (
    <div className="position-fixed top-0 start-50 translate-middle-x mt-3" style={{ zIndex: 9999 }}>
      <div className="alert alert-danger alert-dismissible fade show" role="alert">
        {error}
        <button type="button" className="btn-close" onClick={clearError}></button>
      </div>
    </div>
  );
};

export default GlobalError;