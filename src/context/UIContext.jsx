import { createContext, useContext, useState } from "react";

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const clearError = () => setError("");

  return (
    <UIContext.Provider value={{ loading, setLoading, error, setError, clearError }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);