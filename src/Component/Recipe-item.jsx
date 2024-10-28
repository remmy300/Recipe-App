import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const RecipeItem = ({ item }) => {
  return (
    <>
      <div className="flex flex-col w-80 overflow-hidden border-2 rounded-2xl p-5 bg-white/75 shadow-xl gap-5 border-white ">
        <div className="flex items-center  rounded-xl overflow-hidden h-40 justify-center">
          <img
            src={item?.image_url}
            alt="recipe-item"
            className="w-full block"
          />
        </div>
        <div>
          <span className="font-medium text-cyan-200 text-m">
            {item?.publisher}
          </span>
          <h3 className="font-bold text-black text-2xl">{item?.title}</h3>

          <Link
            to={`/recipe-item/${item.id}`}
            className="p-3 mt-5 px-8 rounded-lg uppercase font-medium tracking-wider inline-block shadow-md bg-black text-white"
          >
            Recipe details
          </Link>
        </div>
      </div>
      <div />
    </>
  );
};

RecipeItem.propTypes = {
  item: PropTypes.shape({
    image_url: PropTypes.string.isRequired,
    publisher: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
};

export default RecipeItem;
