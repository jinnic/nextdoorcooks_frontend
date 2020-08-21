import React from 'react'
import RecipeCard from './RecipeCard'


const RecipeContainer = ({recipes}) => {
  console.log("RECIPE CONTAINDER : ", recipes)
  const renderRecipes = recipes.map( (recipe,i) => 
                // <Grid 
                // item 
                // xs={12} sm={6} md={3} lg={3} xl={2} 
                // key={`grid_${recipe.name}_${i}`}>
                  <RecipeCard key={`recipecard_${recipe.name}_${i}`} recipe={recipe}/>
                // </Grid> 
  ) 
  // {renderRecipes}
  return (
    <div className={'RecipeContainer'}>
    {/* <Grid 
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={3}> */}
     {renderRecipes} 
    {/* </Grid> */}
    </div>
  )
}

export default RecipeContainer