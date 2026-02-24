import React, { useContext, useEffect, useState } from "react";
import { recipecontext } from "../context/RecipeContext";
import { useNavigate, useParams } from "react-router-dom";
import { PiChefHatBold } from "react-icons/pi";
import UpdateRecipe from "../components/UpdateRecipe";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";

const SingleRecipe = () => {
  const { data, setdata } = useContext(recipecontext);
  const { id } = useParams();
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isFav, setIsFav] = useState(false);

  const navigate = useNavigate();

  const recipe = data.find((recipe) => id.toString() === recipe.id.toString());
  console.log(recipe);

  
  // Update form handler
  const handleOpenUpdateForm = ()=>{
    if(isOpenForm){
        setIsOpenForm(false);
    }
    else{
        setIsOpenForm(true);
    }
  }


  // Delete Recipe Handler
  const deleteHandler = ()=>{
    const newData = data.filter((rec)=> rec.id.toString() !== id);
    localStorage.setItem("recipes", JSON.stringify(newData)); // Set recipe to local storage 
    setdata(newData);
    toast.success("Recipe Deleted Successfully!");
    navigate('/recipes')
  }


  // *********************** Handle Favourites *********************
  const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem('favourites')) || [])

  const handleAddFav = ()=>{
    const copydata = [...favourites];
    copydata.push(recipe);
    setFavourites(copydata);
    localStorage.setItem('favourites', JSON.stringify(copydata));
  }

  const handleRemoveFav = ()=>{
    const newFav = favourites.filter((fav)=> fav.id !== recipe.id);
    setFavourites(newFav);
    localStorage.setItem('favourites', JSON.stringify(newFav));
  }

  useEffect(()=>{
    console.log("Mounted ->");
    return ()=>{
        console.log("Unmounted! <-")
    }
  }, [favourites]);

  //******************************************************************

  if(!recipe){
    return <div>Loading...</div>
  }

  return <div className="w-full mt-8">
    <div className="w-full flex gap-3">
        <div className="w-1/2 flex px-5 py-3  flex-col items-start justify-start gap-2 bg-red-20">
            <h1 className="text-5xl font-bold">{recipe.title}</h1>
            <small className="text-2xl font-semibold text-[#d02424] flex items-center justify-center gap-1"><PiChefHatBold /> {recipe.chef}</small>
            <h3 className="text-xl text-[#e0e0df] font-normal">Category : - <small className="font-semibold text-xl text-[#2488cf]">{recipe.category}</small></h3>
            <p className="text-[1.2em] font-normal">{recipe.description}</p>
        
            <div className="mt-10 w-full flex justify-start items-center gap-5">
                <button onClick={handleOpenUpdateForm} className=" active:scale-95 text-[1em] cursor-pointer font-medium px-8 py-2 rounded bg-[#339fd5]">Update</button>
                <button onClick={deleteHandler} className=" active:scale-95 text-[1em] cursor-pointer font-medium px-8 py-2 rounded bg-[#8e0a0a]">Delete</button>
            </div>

            {
                isOpenForm && <UpdateRecipe setIsOpenForm={setIsOpenForm} recipe={recipe} />
            }

            <div className="w-full flex justify-end items-center mt-3">
                {
                    favourites?.find((fav)=> fav.id === recipe.id) ?
                    <div onClick={handleRemoveFav} className="flex items-center justify-center gap-2 text-[1em] font-normal cursor-pointer text-[#ef8080]">Remove from favourite <FaBookmark className="text-2xl text-[#eb1515]" /></div>
                    :
                    <div onClick={handleAddFav} className="flex items-center justify-center gap-2 text-[1em] font-normal cursor-pointer text-[#ef8080]">Add to Favourite <CiBookmark className="text-2xl text-[#eb1515]" /></div>
                }
            </div>

        </div>
        <div className="w-1/2 flex justify-center bg-amber-">
            <img className="max-w-100 h-full object-cover" src={recipe.image} alt="" />
        </div>
    </div>
  </div>;
};

export default SingleRecipe;
