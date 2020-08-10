import React from 'react'
import RecipeCard from './RecipeCard'
import { useSelector } from 'react-redux'

const RecipeContainer = () => {
  const recipes = useSelector(state => state.recipe.recipes)
  const renderRecipes = recipes.map( recipe => <RecipeCard key={recipe.id} name={recipe.name}/> ) 
  
  return (
    <>
     {renderRecipes}
    </>
  )
}

export default RecipeContainer