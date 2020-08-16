import React from 'react'
import RecipeCard from './RecipeCard'
import { useSelector } from 'react-redux'

const RecipeContainer = ({recipes}) => {
  // const recipes = useSelector(state => state.recipe.recipes)
  // debugger
  
  
  // const filterRecipes = (recipes, query) => {
  //   let outPut = recipes
  //   // if (this.state.selectedGenre !== "All") {
  //   //   outPut = filteredAlbums.filter(album => album.genre === this.state.selectedGenre)
  //   // }
  //   // if (this.props.onlyFavorites) {
  //   //   outPut = filteredAlbums.filter(album => album.favorite)
  //   // }
  //   //debugger
  //   console.log("searchTerm :",query)
  //   if (query !== "" ) {
  //     debugger
  //     outPut = recipes.filter(r => r.name.toLowerCase().includes(query.toLowerCase()))
  //   }
  //   return outPut
  // }
  // const filteredRecipes = filterRecipes(recipes, query)
  const renderRecipes = recipes.map( (recipe,i) => <RecipeCard key={`recipecard_${recipe.name}_${i}`} recipe={recipe}/> ) 
  
  return (
    <div className="RecipeContainer">
     {renderRecipes}
    </div>
  )
}

export default RecipeContainer