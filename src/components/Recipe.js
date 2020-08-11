import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import RecipeForm from './RecipeEditForm'


const Recipe = (props) => {
  const currentUser = useSelector(state => state.user.currentUser)
  const recipes = useSelector(state => state.recipe.recipes)
  // debugger
  const location = useLocation()
  const recipe_id = location.state.id
  const recipe = recipes.find(r=> r.id === recipe_id)
  const {id, name, duration, description, ingredients, instructions, user, ratings, likes} = recipe

  const renderIngredients =()=>{
    let ingredients = recipe.ingredients
    if(ingredients !== undefined){
      return ingredients.map( i => {
        let mesurement = ""
        if (i.measurement !== 'n/a' ){
          mesurement = i.measurement
        }
        return <li key={i.name}>{`${i.amount} ${mesurement} of ${i.name}`}</li>
      })
    }
  }

  const renderInstructions = ()=>{
    let instructions = recipe.instructions
    if(instructions !== undefined){
      
      return instructions.map( i => <li key={i.instruction}>{i.instruction}</li>)
    }
  }

  const handleClick =()=>{
    console.log('lets edit recipe!!')
  }
  // console.log(props.location)
  return (
    <div className={'RecipeContainer'}>
      {currentUser.id === user.id ? <div className={'Row'}><button onClick={handleClick}>edit </button><button onClick={handleClick}>delete </button></div> : null} 
      <div className={'Row'}>
        <div className={'Info'}>
          <h3>{name}</h3>
          <h5>{`created by ${user.username}`}</h5>
          <h1>{ingredients.length} ingredients | {duration} min</h1>
          <h5>Description</h5>
          <p>{description}</p>
        </div>
        <div className={'Image'}>
          <img src='https://cdnp.iconscout.com/photo/premium/thumb/vintage-food-background-1696185-1438016.jpg'/>
        </div>
      </div>

      <div className={'Row'}>
        <div className={'IngredientsList'}>
          <h5>ingredients</h5>
          <ul>
            {renderIngredients()}
          </ul>
        </div>
      </div>

      <div className={'Row'}>
        <div className={'InstructionsList'}>
        <h5>Instructions</h5>
          <ul>
          {renderInstructions()}
          </ul>
        </div>
      </div>
    <RecipeForm recipe={recipe}/>
    </div>
  )
}

export default Recipe