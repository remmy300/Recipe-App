import RecipeItem from "../../Component/Recipe-item";
import { GlobalContext } from "../../context";
import { useContext, useEffect } from "react";

const Favourites = () => {
  const { favouriteList } = useContext(GlobalContext);

  useEffect(() => {
    console.log("Favourite list updated", favouriteList);
  }, [favouriteList]);

  return (
    <div className="py-8 mx-auto container flex flex-wrap justify-center gap-10">
      {favouriteList && favouriteList.length > 0 ? (
        favouriteList.map((item) => <RecipeItem item={item} key={item.id} />)
      ) : (
        <div>
          <p className="font-semibold text-xl lg:text-4xl text-center text-gray-600">
            No favourites yet.Add some recipes!
          </p>
        </div>
      )}
    </div>
  );
};

export default Favourites;
