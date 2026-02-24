import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-center items-center gap-x-10 text-[1.1em] font-normal'>
        <NavLink className={(e) => e.isActive ? "text-red-300": ""} to="/" >
            Home
        </NavLink>
        <NavLink className={(e) => e.isActive ? "text-red-300" : ""} to="/recipes" >
             Recipes
        </NavLink>
        <NavLink className={(e) => `${e.isActive ? "text-red-300": ""}`} to="/create-recipe"  >
            Create Recipe
        </NavLink>
        <NavLink className={(e) => e.isActive ? "text-red-300" : ""} to="/fav" >
            Favourites
        </NavLink>
    </div>
  )
}

export default Navbar