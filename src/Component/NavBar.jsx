import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context";
const NavBar = () => {
  const { handleSubmit, searchParam, setSearchParam } =
    useContext(GlobalContext);

  return (
    <nav>
      <div className="flex justify-between items-center py-6 container mx-auto flex-col lg:flex-row gap-5 lg:gap-0">
        <h2 className="font-bold text-2xl">
          <NavLink>Food Recipe</NavLink>
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="search"
            value={searchParam}
            placeholder="Enter items..."
            onChange={(e) => setSearchParam(e.target.value)}
            className="bg-white/70 p-3 px-8 outline-none shadow-lg rounded-full lg:w-96 shadow-red-100 focus:shadow-200"
          />
        </form>
        <ul className="flex gap-5">
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/favourites"}>Favourites</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
