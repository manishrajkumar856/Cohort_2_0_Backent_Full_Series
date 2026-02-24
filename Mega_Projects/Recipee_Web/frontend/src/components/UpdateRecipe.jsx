import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { recipecontext } from "../context/RecipeContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateRecipe = ({setIsOpenForm, recipe}) => {

    const {data, setdata} = useContext(recipecontext);
    const {id} = useParams();
    const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm({defaultValues: {
    id: recipe?.id,
    title: recipe?.title,
    image: recipe?.image,
    chef: recipe?.chef,
    description: recipe?.description,
    category: recipe?.category,
  }});


  // Handle Update
  const SubmitHandler = (formData) => {
    
    const getRecipeIndex = data.findIndex(rec => rec.id.toString() === id.toString() );
    data[getRecipeIndex] = formData;
    setdata(data);
    localStorage.setItem("recipes", JSON.stringify(data)); // Set recipe to local storage 
    toast.success("Recipe Updated Successfully!");
    navigate('/recipes');

  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[#161616c2] backdrop-blur-2xl flex flex-col items-center justify-center gap-5">
      
      <div onClick={()=> setIsOpenForm(false)} className="hover:bg-[#4b393937] cursor-pointer hover:border font-bold text-2xl border-[#9b81811f] w-12 h-12 flex items-center justify-center rounded-full ease-in duration-200 absolute right-20 top-10">
        <RxCross1 />
      </div>

      <h1 className="text-3xl font-semibold">Update Recipe</h1>
      <form
        className="min-w-120 flex flex-col justify-center items-center gap-3"
        onSubmit={handleSubmit(SubmitHandler)}
      >
        <input
          className="block mt-2 w-full border border-[#87878795] px-5 py-2 rounded bg-[#3231312d]"
          {...register("image")}
          type="url"
          placeholder="Enter Image Url"
        />
        {/* <small className="text-sm text-red-400">
          This is how the error will be shown
        </small> */}

        <input
          className="block mt-2 w-full border border-[#87878795] px-5 py-2 rounded bg-[#3231312d]"
          {...register("title")}
          type="text"
          placeholder="Recipe Title"
        />
        {/* <small className="text-sm text-red-400">
          This is how the error will be shown
        </small> */}

        <input
          className="block mt-2 w-full border border-[#87878795] px-5 py-2 rounded bg-[#3231312d]"
          {...register("chef")}
          type="text"
          placeholder="Chef name"
        />
        {/* <small className="text-sm text-red-400">
          This is how the error will be shown
        </small> */}

        <textarea
          className="block mt-2 w-full border border-[#87878795] px-5 py-2 rounded bg-[#3231312d]"
          {...register("description")}
          placeholder="//start from here"
        ></textarea>
        {/* <small className="text-sm text-red-400">
          This is how the error will be shown
        </small> */}

        <textarea
          className="block mt-2 w-full border border-[#87878795] px-5 py-2 rounded bg-[#3231312d]"
          {...register("ingredients")}
          placeholder="//write ingredients seperated by comma"
        ></textarea>
        {/* <small className="text-sm text-red-400">
          This is how the error will be shown
        </small> */}

        <textarea
          className="block mt-2 w-full border border-[#87878795] px-5 py-2 rounded bg-[#3231312d]"
          {...register("instruction")}
          placeholder="//write instructions seperated by comma"
        ></textarea>
        {/* <small className="text-sm text-red-400">
          This is how the error will be shown
        </small> */}

        <select
          className="block mt-2 w-full border border-[#87878795] px-5 py-2 rounded bg-[#3231312d]"
          {...register("category")}
          placeholder="//write instructions seperated by comma"
        >
          <option >Category</option>
          <option value="Dinner">Dinner</option>
          <option value="Lunch">Lunch</option>
          <option value="Break Fast">Break Fast</option>
          <option value="Snacks">Snacks</option>
        </select>

        <div className="w-full flex items-center justify-center">
          <button className="block mt-5 cursor-pointer bg-[#396ad4] rounded px-4 py-2">
            Update Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateRecipe;
