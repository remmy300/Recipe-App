import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const GlobalContext = createContext();

const Context = ({ children }) => {
  const [searchParam, setSearchParam] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [error, setError] = useState(null);
  const [favouriteList, setFavouriteList] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);

  const fetchRecipes = async (query) => {
    if (!query) return;

    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`
      );

      const fetchedRecipes = response.data?.data?.recipes;
      setRecipes(fetchedRecipes);
      localStorage.setItem("recipes", JSON.stringify(fetchedRecipes));
      setIsError(false);
    } catch (err) {
      console.error("Error fetching recipes:", err);
      setIsError(true);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Load from local storage or default
  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem("recipes"));
    if (storedRecipes && storedRecipes.length > 0) {
      setRecipes(storedRecipes);
    } else {
      fetchRecipes("pizza");
    }
  }, []);

  // ⏱️ Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchParam);
    }, 500); // 500ms delay

    return () => clearTimeout(handler); // clear if user types again
  }, [searchParam]);

  // Fetch with debounced term
  useEffect(() => {
    if (debouncedSearch.trim() !== "") {
      fetchRecipes(debouncedSearch);
    }
  }, [debouncedSearch]);

  const handleAddToFavourites = (getCurrentItem) => {
    if (!getCurrentItem || !getCurrentItem.id) return;

    const cpyFavourites = [...favouriteList];
    const index = cpyFavourites.findIndex(
      (item) => item.id === getCurrentItem.id
    );

    if (index === -1) {
      cpyFavourites.push(getCurrentItem);
    } else {
      cpyFavourites.splice(index, 1);
    }

    setFavouriteList(cpyFavourites);
  };

  return (
    <GlobalContext.Provider
      value={{
        setRecipeDetailsData,
        recipeDetailsData,
        handleAddToFavourites,
        searchParam,
        setSearchParam,
        favouriteList,
        isLoading,
        isError,
        recipes,
        error,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

Context.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Context;
