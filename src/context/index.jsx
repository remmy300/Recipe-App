import { createContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const GlobalContext = createContext();

const Context = ({ children }) => {
  const [searchParam, setSearchParam] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);

      const response = await axios.get(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );

      setRecipes(response.data.data.recipes);

      setIsError(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsError(true);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
    setSearchParam("");
  };

  console.log("Fetched recipes:", recipes);

  return (
    <div>
      <GlobalContext.Provider
        value={{
          searchParam,
          setSearchParam,
          handleSubmit,
          isLoading,
          isError,
          recipes,
          error,
        }}
      >
        {children}
      </GlobalContext.Provider>
    </div>
  );
};

Context.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Context;
