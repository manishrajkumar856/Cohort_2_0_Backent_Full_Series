import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { recipecontext } from "../context/RecipeContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateRecipie = () => {
  const { register, handleSubmit, reset } = useForm();
  const { data, setdata } = useContext(recipecontext);
  const navigate = useNavigate();

  // Create new recipe
  const SubmitHandler = (recipe) => {
    recipe.id = nanoid();
    const copydata = [recipe, ...data];
    setdata(copydata);

    localStorage.setItem("recipes", JSON.stringify(copydata)); // Set recipe to local storage 
    
    toast.success("New recipe created!");
    reset();
    navigate("/recipes"); // value -1 -> It means return back where you come from
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-5">
      <h1 className="text-3xl font-semibold">Create new recipe</h1>
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
        {/* <small className="w-full text-sm text-red-400">
          This is how the error will be shown
        </small> */}

        <input
          className="block mt-2 w-full border border-[#87878795] px-5 py-2 rounded bg-[#3231312d]"
          {...register("title")}
          type="text"
          placeholder="Recipe Title"
        />
        {/* <small className="w-full text-sm text-red-400">
          This is how the error will be shown
        </small> */}

        <input
          className="block mt-2 w-full border border-[#87878795] px-5 py-2 rounded bg-[#3231312d]"
          {...register("chef")}
          type="text"
          placeholder="Chef name"
        />
        {/* <small className="w-full text-sm text-red-400">
          This is how the error will be shown
        </small> */}

        <textarea
          className="block mt-2 w-full border border-[#87878795] px-5 py-2 rounded bg-[#3231312d]"
          {...register("description")}
          placeholder="//start from here"
        ></textarea>
        {/* <small className="w-full text-sm text-red-400">
          This is how the error will be shown
        </small> */}

        <textarea
          className="block mt-2 w-full border border-[#87878795] px-5 py-2 rounded bg-[#3231312d]"
          {...register("ingredients")}
          placeholder="//write ingredients seperated by comma"
        ></textarea>
        {/* <small className="w-full text-sm text-red-400">
          This is how the error will be shown
        </small> */}

        <textarea
          className="block mt-2 w-full border border-[#87878795] px-5 py-2 rounded bg-[#3231312d]"
          {...register("instruction")}
          placeholder="//write instructions seperated by comma"
        ></textarea>
        {/* <small className="w-full text-sm text-red-400">
          This is how the error will be shown
        </small> */}

        <select
          className="block mt-2 w-full border border-[#87878795] px-5 py-2 rounded bg-[#3231312d]"
          {...register("category")}
          placeholder="//write instructions seperated by comma"
        >
          <option value="Dinner">Dinner</option>
          <option value="Lunch">Lunch</option>
          <option value="Break Fast">Break Fast</option>
          <option value="Snacks">Snacks</option>
        </select>

        <button className="block mt-5 bg-[#32b672] rounded px-8 py-2">
          Save Recipe
        </button>
      </form>
    </div>
  );
};

export default CreateRecipie;
