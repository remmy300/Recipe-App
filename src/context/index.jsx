import { createContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const GlobalContext = createContext();

const Context = ({ children }) => {
  const [searchParam, setSearchParam] = useState("");

  //   Query to fetch data based on serchparam

  const {
    data: recipes,
    refetch,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["recipes", searchParam],
    queryFn: async () => {
      const response = await axios.get(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );
      console.log("Fetched Data:", response.data);

      return response.data;
    },

    enabled: false, //disable automatic fetch  trigger on submit
    staleTime: 0, //ensure the data is always considered stale
  });

  //submit handler to refetch data based on search

  const handleSubmit = (event) => {
    event.preventDefault();
    refetch({ force: true }); //force a fresh fetch
  };

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
