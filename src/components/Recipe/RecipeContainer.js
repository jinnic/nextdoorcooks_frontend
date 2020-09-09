import React from 'react'
import RecipeCard from './RecipeCard'


const RecipeContainer = ({recipes}) => {
  console.log("RECIPE CONTAINDER : ", recipes)
  const renderRecipes = recipes.map( (recipe,i) => 
                  <RecipeCard key={`recipecard_${recipe.name}_${i}`} recipe={recipe}/>
  ) 
  return (
    <div className={'RecipeContainer'}>
     {renderRecipes} 
    </div>
  )
}

export default RecipeContainer