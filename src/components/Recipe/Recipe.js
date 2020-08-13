import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import RecipeEditForm from './RecipeEditForm'
import {deleteRecipe, addLike, removeLike, addRating, updateRating } from '../../api/index'
import {DELETE_RECIPE, UPDATE_RECIPE} from '../../store/recipe/types'
import StarRating from '../Rating/StarRating'
import { averageRatings } from '../Rating/index'


const Recipe = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.currentUser)
  const recipes = useSelector(state => state.recipe.recipes)
  const [editRecipe,setEditRecipe] = useState(false)
  // debugger
  const location = useLocation()
  const history = useHistory()
  const recipe_id = location.state.id
  const recipe = recipes.find(r=> r.id === recipe_id)
  const {name, duration, description, ingredients, instructions, user, ratings, likes} = recipe

  
  
  const rating = ratings.filter(r => r.user_id === currentUser.id)
  const [newRating, setRating] = useState(null)
  const [newComment, setComment] = useState("")
  const like = likes.filter(l => l.user_id === currentUser.id)
  const haveLikes =()=>{
    //console.log("USER LIKE THIS RECIPE???", like)
     return like.length === 0 ? false : true
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

  const renderInstructions = ()=>{
    if(instructions !== undefined){
      return instructions.map( i => <li key={i.instruction}>{i.instruction}</li>)
    }
  }

  const renderComments = ()=>{
    if(ratings !== null ){
       let comments = ratings.filter( r => r.comment !== null && r.comment !== "")
       return comments.map(c => <li key={c.comment}>{c.comment}</li>)
    }
  }

  const handleClick =(e)=>{
    console.log(e.target.name)
    if(e.target.name === 'edit'){
      //load edit form
      setEditRecipe(true)
    }else if(e.target.name === 'delete'){
      deleteRecipe(recipe)
      .then( r => dispatch({type: DELETE_RECIPE, payload: r}))
      history.goBack()
    }else if(e.target.name === 'like'){
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
        console.log("removed like")
      }
    }else if(e.target.name === 'back'){
      history.goBack()
      //history.push(`/${currentUser.username}`);
      //debugger
    }
  }
  useEffect(() => {
    if(rating.length !== 0){
      //means have rating already
      if(rating[0].stars !== null){
        setRating(rating[0].stars)
      }
      if(rating[0].comment !== null){
        setComment(rating[0].comment)
      }
    } 
  }, [])

  const handleStarClick = (value) =>{
    setRating(value)

    if(rating.length === 0){
      console.log("add rating !!")
      const ratingObj = {
        stars: value,
        comment: newComment,
        rateable_type: "Recipe",
        rateable_id: recipe.id,
        user_id: currentUser.id
      }
  
      addRating(ratingObj)
        //.then(console.log)
        .then(recipe => dispatch({type: UPDATE_RECIPE, payload: recipe}))
    }else{
      console.log("update rating !!", newRating)
      const ratingObj = {
        ...rating[0],
        stars: value,
        comment: newComment
      }
      updateRating(ratingObj)
      .then(recipe => dispatch({type: UPDATE_RECIPE, payload: recipe}))
    }
  }

  const handleSubmit =(e) =>{
    e.preventDefault()
    if(rating.length === 0){
      console.log("add rating !!")
      const ratingObj = {
        stars: newRating,
        comment: newComment,
        rateable_type: "Recipe",
        rateable_id: recipe.id,
        user_id: currentUser.id
      }
  
      addRating(ratingObj)
        .then(recipe => dispatch({type: UPDATE_RECIPE, payload: recipe}))

    }else{
      console.log("add comments")
      const ratingObj = {
        ...rating[0],
        stars: newRating,
        comment: newComment
      }
      updateRating(ratingObj)
      .then(recipe => dispatch({type: UPDATE_RECIPE, payload: recipe}))
    }
    
  }

  const handleChange = e =>{
    setComment( e.target.value)
  }

  console.log(rating.comment)
  return (
    <>
      {editRecipe ?     <RecipeEditForm recipe={recipe} setEditRecipe={setEditRecipe}/> :
          <>
          {
            currentUser.id === user.id ? 
            <div className={'Row'}>
              <div>
                <button name={'edit'} onClick={handleClick}>edit </button>
                <button name={'delete'} onClick={handleClick}>delete </button>
                <button name={'back'} onClick={handleClick}>back </button>
              </div>  
              { 
                haveLikes() ? 
                <div>
                    <span>{likes.length}</span>
                    <button name='like' className={'LikeBtn'} onClick={handleClick}>♥︎</button> 
                </div>
                : 
                <div>
                    <span>{likes.length}</span>
                    <button name='like' className={'LikeBtn'} onClick={handleClick}>♡</button>
                </div>
              }
            </div> 

            : 

            <div className={'Row'}>
              <button name={'back'} onClick={handleClick}>back</button>
              { 
                haveLikes() ? 
                <div>
                    <span>{likes.length}</span>
                    <button name='like' className={'LikeBtn'} onClick={handleClick}>♥︎</button> 
                </div>
                : 
                <div>
                    <span>{likes.length}</span>
                    <button name='like' className={'LikeBtn'} onClick={handleClick}>♡</button>
                </div>
              }
            </div>
          } 

            
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

            <div className={'Row'}>
              <div className={'RaitingList'}>
              <h5>Ratings : {averageRatings(ratings)} ⭐</h5>
              <StarRating rating={newRating} handleStarClick={handleStarClick}/>
              <form onSubmit={handleSubmit}>
                <label>
                  comment:
                  <input type="text" name="comment" value={newComment} onChange={handleChange}/>
                </label>
                <input type="submit" value="Submit" />
              </form>
              <ul>
              {renderComments()}
              </ul>
              </div>
            </div>
          </>
        }
    </>
  )
}

export default Recipe