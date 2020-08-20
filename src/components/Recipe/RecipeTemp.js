import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import RecipeEditForm from './RecipeEditForm'
import {deleteRecipe, addLike, removeLike, addRating, updateRating } from '../../api/index'
import {DELETE_RECIPE, UPDATE_RECIPE} from '../../store/recipe/types'
import StarRating from '../Rating/StarRating'
import { averageRatings } from '../Rating/index'
import { FaStar } from 'react-icons/fa'

import Fab from '@material-ui/core/Fab';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { makeStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors';
const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    color: red[500],
  },
}))

const Recipe = () => {
  const classes = useStyles();




  const isLoading = useSelector(state => state.user.isLoading)
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.currentUser)
  const recipes = useSelector(state => state.recipe.recipes)
  const users = useSelector(state => state.user.users)
  const [editRecipe,setEditRecipe] = useState(false)
  
  const location = useLocation()
  const history = useHistory()
  console.log(location,history, recipes)
  const recipe_id = parseInt(location.pathname.split('/')[2])
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
      const categories = [...new Set(ingredients.map(i => i.category))]
      let a = {}
      for(let i = 0; i < categories.length; i++){
        var c = categories[i]
        a[c]=ingredients.filter(i => i.category === c)
      }
      // debugger
      categories.forEach(c => ingredients.map(i => i.category === c))
      // debugger
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
      return instructions.map( i => <><span>Step {i.step}</span><li key={i.instruction}>{i.instruction}</li></>)
    }
  }

  const renderCommentStars =(rate)=>{
    
    const [activeColor, inactiveColor] = ["#ffc107","#e4e5e9"]
    let stars= [<FaStar key={`r_star_1`} color={inactiveColor} size={20}/> ,<FaStar key={`r_star_2`} color={inactiveColor} size={20}/> ,<FaStar key={`r_star_3`} color={inactiveColor} size={20}/> ,<FaStar key={`r_star_4`} color={inactiveColor} size={20}/> ,<FaStar key={`r_star_5`} color={inactiveColor} size={20}/> ]
    return stars.map((star, i) =>{
      let count = i+1
      if(count <= rate){
        return <FaStar ckey={`r_star_${i}`} color={activeColor} size={20}/> 
      }
      return star
    })
  }

  const renderComments = ()=>{
    if(ratings !== null ){
       let comments = ratings.filter( r => r.comment !== null && r.comment !== "")
       
       return comments.map(r => {
         let [commentUser] = users.filter(u=> u.id=== r.user_id)
        return(  <li key={r.comment}>
            <div className={'Avatar'}>
              <img src={ commentUser.avatar} alt="Avatar"/> 
              {renderCommentStars(r.stars)}
              <span className={'Comment'}>{r.comment}</span>
            </div>
          </li>)
        })
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
    }else if(e.currentTarget.tagName === 'BUTTON'){
      const likeObj = {
        user_id: currentUser.id,
        likeable_type: "Recipe",
        likeable_id: recipe.id
      }
      if (e.currentTarget.name === "unlike"){
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
 
  const renderStars =()=>{
    const [activeColor, inactiveColor] = ["#ffc107","#e4e5e9"]
    const avg = averageRatings(ratings)
    let stars= [<FaStar key={`r_star_1`} color={inactiveColor} size={20}/> ,<FaStar key={`r_star_2`} color={inactiveColor} size={20}/> ,<FaStar key={`r_star_3`} color={inactiveColor} size={20}/> ,<FaStar key={`r_star_4`} color={inactiveColor} size={20}/> ,<FaStar key={`r_star_5`} color={inactiveColor} size={20}/> ]
    return stars.map((star, i) =>{
      let count = i+1
      if(count <= avg){
        return <FaStar key={`r_star_${i}`} color={activeColor} size={20}/> 
      }
      return star
    })
  }
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
  const renderImages = ()=>{
    if(recipe.items[0].image !== null){
      return <img src={recipe.items[0].image}/>
    }else{
      return <video src={recipe.items[0].video} controls/>
    }
  }
  const handleChange = e =>{
    setComment( e.target.value)
  }
  if (isLoading) return <h1>IS LOADING</h1>

  console.log(rating.comment)
  return (
    <>
      {editRecipe ?     <RecipeEditForm recipe={recipe} setEditRecipe={setEditRecipe}/> :
          <>
          {
            currentUser.id === user.id ? 
            <div className={'RecipeBtn'}>
              <div>
                <button className={'Btn'}  name={'back'} onClick={handleClick}>back </button>
                <button className={'Btn'} name={'edit'} onClick={handleClick}>edit </button>
                <button className={'Btn'}  name={'delete'} onClick={handleClick}>delete </button>
              </div>  
            </div> 

            : 

            <div className={'RecipeBtn'}>
              <button className={'Btn'}  name={'back'} onClick={handleClick}>back </button>
            </div>
          } 
          <div className={'Recipe'}>
           <div className={'Left'}>
              <div className={'Time'}>
              <span ><AccessTimeIcon /></span>
              <span>{duration} min</span>
              <span>|</span>
              <span>  {ingredients.length} ingredients</span>
              </div>
              <p>{description}</p>

              <div className={'RecipeUnderline'}>
                <h4>Ingredients</h4>
              </div>
              <div className={'IngredientsList'}>
                <ul>
                  {renderIngredients()}
                </ul>
              </div>
              

           </div>
          {/* end of left */}

           <div className={'Right'}>
            <h3>{name}</h3>
            <div className={'Avatar'}><img src={ user.avatar} alt="Avatar"/> <a href={`http://localhost:3001/${user.username}`}>{`- by ${user.username}`}</a></div>
            <div className={'RatingBookmark'}>
            <div className={'Star'}>
              {renderStars()}
              <h5>{ratings.length} rated</h5>
            </div>
              
              
              { 
                  haveLikes() ? 
                  <Fab className={classes.fab}  aria-label="add to favorites" onClick={handleClick} name="like" className={'LikeBtn'}>
                    <BookmarkIcon />
                  </Fab>
                  :
                  <Fab className={classes.fab} aria-label="add to favorites" onClick={handleClick} name="unlike" className={'LikeBtn'}>
                  <BookmarkBorderIcon/>
                  </Fab>
                }
            </div>
            
              <div className={'Image'}>
              {recipe.items.length > 0 ? 
                renderImages()
              :
              <img src='https://cdnp.iconscout.com/photo/premium/thumb/vintage-food-background-1696185-1438016.jpg'/>

              }
              </div>
              <div className={'RecipeUnderline'}>
                  <h4>Directions</h4>
              </div>
              <div className={'InstructionsList'}>
                  <ul>
                  {renderInstructions()}
                  </ul>
              </div>
              
              <div className={'Row'}>
                <div className={'RaitingList'}>
                  <div className={'Avatar'}>
                    <img src={ user.avatar} alt="Avatar"/>
                    <StarRating rating={newRating} handleStarClick={handleStarClick}/>
                    <form onSubmit={handleSubmit}>
                      <input type="text" name="comment" value={newComment} onChange={handleChange}/>
                      <input type="submit" value="Comment" />
                    </form>
                  </div>
                  
                  <hr class="solid"></hr>
                  <ul>
                  {renderComments()}
                  </ul>
                </div>
              </div>
           </div>
           {/* end of Right */}
           </div>
          </>
        }
    </>
  )
}

export default Recipe