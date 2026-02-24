import React from "react";
import RecipeCard from "../components/RecipeCard";
import { Link } from "react-router-dom";

const Fav = () => {

    const favourites = JSON.parse(localStorage.getItem('favourites'));

  const renderrecipes = favourites && favourites.map((recipe) => (
    <RecipeCard recipe={recipe} key={recipe.id} />
  ));

  return (
    <div className="flex flex-wrap mt-8">
      {favourites?.length > 0 ? renderrecipes : <h1 className="w-full mt-5 text-center text-2xl font-semibold text-[#757373]">Nothing here! please add from <Link className="text-[#2a73df]" to={'/recipes'}>recipes</Link></h1>}
    </div>
  );
};

export default Fav;
