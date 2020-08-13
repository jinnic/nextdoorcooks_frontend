import React, { useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addLike, removeLike } from '../../api'
import { averageRatings } from '../Rating/index'
import { UPDATE_RECIPE } from '../../store/recipe/types'


const RecipeCard = ({recipe}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const {name, duration, description, ingredients, instructions, user, ratings, likes} = recipe
  const currentUser = useSelector(state=>state.user.currentUser)
  const users = useSelector(state=>state.user.users)
  let like = []
  if(currentUser === null ){
    like = []
  }else{
    like = likes.filter(l => l.user_id === currentUser.id)
  }
  
 
  //console.log("recipe card : ",name)
  // debugger
  const haveLikes =()=>{
    //console.log("USER LIKE THIS RECIPE???", like)
     return like.length === 0 ? false : true
  }

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
  
  const handleClick =(e)=>{
     //debugger
    if(e.currentTarget.tagName === 'BUTTON'){
      e.stopPropagation()
      //update like in recipe
      // 
      const likeObj = {
        user_id: currentUser.id,
        likeable_type: "Recipe",
        likeable_id: recipe.id
      }

      if (e.currentTarget.innerText === "♡"){
        addLike(likeObj)
          .then(recipe => dispatch({type: UPDATE_RECIPE, payload: recipe}))
      }else{
        removeLike(like[0].id)
          .then(recipe => dispatch({type: UPDATE_RECIPE, payload: recipe}))
      }

      
      //console.log("recipe clicked!!!", props.recipe.id)
    }else if (e.target.tagName === 'A') {
      
      let linkedUser = users.find(user => user.username === e.target.name)
      // debugger
      // history.push({
      //   pathname: `/${e.target.name}`,
      // })
    }else{
      let recipeName = recipe.name.replace(/\s/g,'_').toLowerCase()
      history.push({
        pathname: `/recipe/${recipe.id}/${recipeName}`,
        state: {id: recipe.id}
      })
    }
    //debugger
    
  }

  const renderLikeBtn =()=>{
    return haveLikes() ? <button className={'LikeBtn'} onClick={handleClick}>♥︎</button> : <button className={'LikeBtn'} onClick={handleClick}>♡</button>
  }
  // if (user) return <h1>USER IS HERE</h1>

  //debugger
  return (
    <div className={"RecipeCard"} onClick={handleClick}>
     <h4>{name.charAt(0).toUpperCase() + name.slice(1)}</h4>
     <h5>Ratings : { averageRatings(ratings)} ⭐</h5>
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
     {/* <h6>{`created by ${user.username}`}</h6> */}
     <Link name={`${user.username}`} to={`/${user.username}`}>{`created by ${user.username}`}</Link>
     <span>{likes.length} likes</span>
     {
        currentUser ? renderLikeBtn() : ''

     }
    </div>
  )
}

export default RecipeCard
