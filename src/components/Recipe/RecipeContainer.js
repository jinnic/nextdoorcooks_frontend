import React from 'react'
import RecipeCard from './RecipeCard'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0),
  }
}))

const RecipeContainer = ({recipes}) => {
  const classes = useStyles();
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