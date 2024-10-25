import { useContext } from "react";
import { GlobalContext } from "../../context";
import RecipeItem from "../../Component/Recipe-item";

const Home = () => {
  const { recipes, isLoading, isError, error } = useContext(GlobalContext);

  if (isLoading)
    return (
      <p className="font-semibold text-xl text-gray-600 text-center">
        Loading...Please Wait.
      </p>
    );

  if (isError) return <p>Error:{error.message}</p>;
  return (
    <>
      <div className="py-8 mx-auto container flex flex-wrap justify-center gap-10">
        {recipes && recipes.length > 0 ? (
          recipes.map((item) => <RecipeItem item={item} key={item.id} />)
        ) : (
          <div>
            <p className="font-semibold text-xl lg:text-4xl text-center text-gray-600">
              Please Type Something.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
