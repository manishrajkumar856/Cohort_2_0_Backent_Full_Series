import { Children, createContext, useEffect, useState } from "react"

export const recipecontext = createContext(null);

const RecipeContext = ({children}) => {

    const [data, setdata] = useState([]);

    useEffect(()=> {
      setdata(JSON.parse(localStorage.getItem('recipes')) || []);
    }, []);

  return (
    <recipecontext.Provider value={{data, setdata}}>
        {children}
    </recipecontext.Provider>
  )
}

export default RecipeContext