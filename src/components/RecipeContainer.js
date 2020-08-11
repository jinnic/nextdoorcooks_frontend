import React from 'react'
import RecipeCard from './RecipeCard'
import { useSelector } from 'react-redux'

const RecipeContainer = () => {
  const recipes = useSelector(state => state.recipe.recipes)
  const renderRecipes = recipes.map( recipe => <RecipeCard key={`recipecard_${recipe.name}`} recipe={recipe}/> ) 
  
  return (
    <>
     {renderRecipes}
    </>
  )
}

export default RecipeContainer