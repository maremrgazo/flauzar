import { createContext, useContext, useState, ReactNode } from "react";

// Define the context type
interface GlobalContextType {
  globalString: string;
  setGlobalString: (value: string) => void;
}

// Create context with default values
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Provider component
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [globalString, setGlobalString] = useState<string>("main");

  return (
    <GlobalContext.Provider value={{ globalString, setGlobalString }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
