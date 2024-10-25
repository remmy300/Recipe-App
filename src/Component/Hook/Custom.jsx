import { useContext } from "react";
import { GlobalContext } from "../../context";
const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (context === undefined) {
    throw new Error("useGlobalContext must be within a GlobalContextProvider");
  }
  return context;
};

export default useGlobalContext;
