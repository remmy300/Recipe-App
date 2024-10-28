import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import { useParams } from "react-router-dom";
import axios from "axios";

const Details = () => {
  const { id } = useParams();
  const {
    recipeDetailsData,
    setRecipeDetailsData,
    favouriteList,
    handleAddToFavourites,
  } = useContext(GlobalContext);

  useEffect(() => {
    const getRecipeDetails = async () => {
      try {
        const response = await axios.get(
          `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
        );

        console.log(response.data);

        setRecipeDetailsData(response.data?.data?.recipe);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    getRecipeDetails();
  }, [id, setRecipeDetailsData]);

  console.log(recipeDetailsData);

  useEffect(() => {
    console.log("current recipe image URL:", recipeDetailsData?.image_url);
  }, [recipeDetailsData]);

  if (!recipeDetailsData) return <div>Loading...</div>;
  return (
    <div className="container mx-auto py-10 grid  grid-cols-1 lg:grid-col-2 gap-10">
      <div className="row-start-2 lg:row-start-auto ">
        <div className="h-96 overflow-hidden rounded-xl group">
          {recipeDetailsData.image_url ? (
            <img
              src={recipeDetailsData.image_url}
              alt={recipeDetailsData?.title}
              className="w-full h-full object-cover block group-hover:scale-105 duration-300"
            />
          ) : (
            <div>Image not available</div>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-sm text-cyan-700 font-medium">
            {recipeDetailsData?.publisher}
          </span>

          <h3>{recipeDetailsData.title}</h3>
          <div>
            <button
              onClick={() => handleAddToFavourites(recipeDetailsData)}
              className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider inline-block shadow-md bg-black text-white"
            >
              {favouriteList &&
              favouriteList.length > 0 &&
              favouriteList.findIndex(
                (item) => item.id == recipeDetailsData?.id
              ) !== -1
                ? "Remove from favourites"
                : "Add to favourites"}
            </button>
          </div>
          <span className="text-2xl font-semibold text-black">
            Ingredients:
          </span>
          <ul className="fles flex-col gap-3">
            {recipeDetailsData?.ingredients.map((ingredient, index) => (
              <li key={index}>
                <span className=" text-medium text-cyan-700 font-medium ">
                  {ingredient.quantity} {ingredient.unit}
                </span>

                <span className="text-2xl font-semibold text-black ">
                  {ingredient.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Details;
