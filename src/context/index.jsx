import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const GlobalContext = createContext();

const Context = ({ children }) => {
  const [searchParam, setSearchParam] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [error, setError] = useState(null);
  const [favouriteList, setFavouriteList] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);

  useEffect(() => {
    //load recipes from local storage on mount
    const stroredRecipes = JSON.parse(localStorage.getItem("recipes"));
    setRecipes(stroredRecipes);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);

      const response = await axios.get(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );

      setRecipes(response.data?.data?.recipes);
      //save to local storage
      localStorage.setItem(
        "recipes",
        JSON.stringify(response.data?.data?.recipes)
      );

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

  const handleAddToFavourites = (getCurrentItem) => {
    console.log("item passed to handleAddFavourite", getCurrentItem);
    if (!getCurrentItem || !getCurrentItem.id) {
      console.error(
        "Invalid item passed to handleAddToFavourites",
        getCurrentItem
      );
      return;
    }
    const cpyFavourites = [...favouriteList];
    const index = cpyFavourites.findIndex(
      (item) => item.id === getCurrentItem.id
    );

    if (index === -1) {
      cpyFavourites.push(getCurrentItem);
    } else {
      cpyFavourites.splice(index, 1); //removing item at the index
    }

    setFavouriteList(cpyFavourites);

    console.log("Updated faourite list:", cpyFavourites);
  };

  return (
    <div>
      <GlobalContext.Provider
        value={{
          setRecipeDetailsData,
          recipeDetailsData,
          handleAddToFavourites,
          searchParam,
          setSearchParam,
          handleSubmit,
          favouriteList,
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
