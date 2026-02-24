import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full h-full mt-20">
      <div className="w-full h-full flex flex-row gap-5">
        <div className="w-1/2 h-full bg-amber flex flex-col items-start justify-center">
          <h2 className="text-6xl font-bold text-[#f8f8f8]">Cook <br/><span className="text-[#c13333]">at Home</span></h2>
          <h4 className="text-2xl inline-block mt-8 font-normal pb-2 px-1 text-[#3a88db] border-b-2 border-b-[#297ec3]">Easy recipes for family cooking</h4>

          <div className="mt-3 mb-8">
            <p className="text-[1em] font-normal text-[#a6bbcd]">Discover delicious, easy-to-make recipes for every occasion. From quick breakfasts to tasty dinners and mouth-watering desserts, we bring you step-by-step guides to make cooking simple and enjoyable.</p>
          </div>

          <Link to={"/recipes"} className="hover:bg-[#297ec3] duration-200 ease-in active:scale-95 text-xl px-8 font-medium rounded-2xl py-2 bg-[#598fcd]">Explore Recipes</Link>
        </div>
        <div className="w-1/2 h-full bg-amber flex items-center justify-center">
          <img
            className="w-full max-w-140 h-120 object-cover rounded-2xl"
            src="./food1.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
