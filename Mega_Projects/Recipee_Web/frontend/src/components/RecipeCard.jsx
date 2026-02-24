import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const {
    id,
    image,
    title,
    chef,
    description,
    ingredients,
    instructions,
    category,
  } = recipe;

  console.log(
    id,
    image,
    title,
    chef,
    description,
    instructions,
    ingredients,
    category,
  );

  return (
    <Link to={`/recipe/details/${id}`} className="hover:scale-105 ease-in duration-200 mr-3 mb-3 block w-[23vw] rouded overflow-hidden shadow">
      <img className="w-full h-[25vh] object-cover" src={image} alt="" />
      <h1 className="px-2 mt-2 font-bold">{title}</h1>
      <small className="px-2 text-red-400">{chef}</small>
      <p className="px-2 pb-3">
        {description.slice(0, 100)}...{" "}
        <small className="text-blue-400">more</small>
      </p>
    </Link>
  );
};

export default RecipeCard;
