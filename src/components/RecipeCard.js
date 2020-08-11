import React from 'react'
import { useHistory } from 'react-router-dom'

const RecipeCard = (props) => {
  const history = useHistory()
  const {id, name, duration, description, ingredients, instructions, user, ratings, likes} = props.recipe
  console.log("recipe card : ",name)
  // debugger
  const renderInstructions = ()=>{
    // debugger
    if(instructions !== undefined){
      
      return instructions.map( i => <li key={i.instruction}>{i.instruction}</li>)
    }
  }

  const renderIngredients =()=>{
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
  
  const handleClick =()=>{
    console.log("recipe clicked!!!", props.recipe.id)
    //debugger
    history.push({
      pathname: `/recipe/${props.recipe.name.replace(/\s/g,'')}`,
      state: {id: props.recipe.id}
    })
  }
  
  return (
    <div className={"RecipeCard"} onClick={handleClick}>
     <h4>{name.charAt(0).toUpperCase() + name.slice(1)}</h4>
     <h5>duration : {duration} min</h5>
     <p>{description}</p>
     <h5>ingredients</h5>
     <ul>
      {renderIngredients()}
     </ul>
     <h5>instructions</h5>
     <ul>
     {renderInstructions()}
     </ul>
     <h6>{`created by ${user.username}`}</h6>
    </div>
  )
}

export default RecipeCard
