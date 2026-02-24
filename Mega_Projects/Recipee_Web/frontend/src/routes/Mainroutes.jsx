import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Recipes from '../pages/Recipes'
import CreateRecipie from '../pages/CreateRecipie'
import SingleRecipe from '../pages/SingleRecipe'
import PageNotFound from '../pages/PageNotFound'
import Fav from '../pages/Fav'
import Signup from '../auth/Signup'
import Login from '../auth/Login'

const Mainroutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup /> } />
        <Route path='/login' element={<Login />} />
        <Route path='/recipes' element={<Recipes />} />
        <Route path='/create-recipe' element={<CreateRecipie />} />
        <Route path='/recipe/details/:id' element={<SingleRecipe />} />,
        <Route path='/fav' element={<Fav />} />
        <Route path='*' element={<PageNotFound />} />
    </Routes>
  )
}

export default Mainroutes