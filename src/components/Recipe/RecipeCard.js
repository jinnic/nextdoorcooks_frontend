import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addLike, removeLike } from '../../api'
import { averageRatings } from '../Rating/index'
import { UPDATE_RECIPE } from '../../store/recipe/types'

import { makeStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors';

import { FaStar } from 'react-icons/fa'
import Fab from '@material-ui/core/Fab';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';


const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
    minWidth: 50,
    position: 'relative',
  },
  media: {
    height: 300,
    // paddingTop: '100%', // 16:9 '56.25%'
    borderRadius: 15,
    border: '1px solid rgba(0, 0, 0, 0.2)',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
  small: {
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
  fab: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    color: red[500],
  },
}))


const RecipeCard = ({recipe}) => {
  const classes = useStyles();
  const history = useHistory()
  const dispatch = useDispatch()
  const {name, user, ratings, likes} = recipe
  const currentUser = useSelector(state=>state.user.currentUser)
  // const users = useSelector(state=>state.user.users)
  
  let like = []
  if(currentUser === null || likes === undefined){
    like = []
  }else{
    // console.log("RECIPE CARD LIKES : ",likes, recipe.id)
    // console.log("RECIPE CARD RECIPE : ",recipe)
    like = likes.filter(l => l.user_id === currentUser.id)
  }
  
 
  //console.log("recipe card : ",name)
  // debugger
  const haveLikes =()=>{
    //console.log("USER LIKE THIS RECIPE???", like)
     return like.length === 0 ? false : true
  }

  // const renderInstructions = ()=>{
  //   // debugger
  //   if(instructions !== undefined){  
  //     return instructions.map( i => <li key={i.instruction}>{i.instruction}</li>)
  //   }
  // }

  // const renderIngredients =()=>{
  //   if(ingredients !== undefined){
  //     return ingredients.map( (i,x) => {
  //       let mesurement = ""
  //       if (i.measurement !== 'n/a' ){
  //         mesurement = i.measurement
  //       }
  //       return <li key={`${i.name}_${x}`}>{`${i.amount} ${mesurement} of ${i.name}`}</li>
  //     })
  //   }
  // }
  
  const handleClick =(e)=>{
    
    if(e.currentTarget.tagName === 'BUTTON'){
      e.stopPropagation()
      //update like in recipe
      // 
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
      }

      
      //console.log("recipe clicked!!!", props.recipe.id)
    }else if (e.target.name === 'userlink') {

      history.push({
        pathname: `/${user.username}`,
      })
    }else{
      let recipeName = recipe.name.replace(/\s/g,'_').toLowerCase()
      history.push({
        pathname: `/recipes/${recipe.id}/${recipeName}`
      })
    }
    //debugger
    
  }

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

  return (
    <div key={recipe.name} className={"RecipeCard"} onClick={handleClick}> 
     
      { (recipe.items.length > 0) ?
      <>
        {haveLikes() ? 
        <Fab className={classes.fab +' LikeBtn'}  aria-label="add to favorites" onClick={handleClick} name="like">
          <BookmarkIcon />
        </Fab>
        :
        <Fab className={classes.fab+' LikeBtn'} aria-label="add to favorites" onClick={handleClick} name="unlike">
         <BookmarkBorderIcon/>
        </Fab>}
      <div className={'RecipeCardImage'} >
        <img
          alt={`${recipe.name}`}
          className={'RecipeCardImage'}
          src={`${recipe.items[0].image}`}
        />
      </div>
      </>
      :
      <img
        alt={'empty'}
        className={'RecipeCardImage'}
      />
      }
      <div className={"RedcipeCardTitle"}>
          <p className={'Header'}>{name.charAt(0).toUpperCase() + name.slice(1)}</p>
          <span className={'Subheader'}>
            <Link name={'userlink'} to={`/${user.username}`}>{`- by ${user.username.charAt(0).toUpperCase()+user.username.slice(1)}`}</Link>
            </span>
      </div>
      <div className={'Cuisines'}>
            { ( recipe.cuisines.length > 0) ? recipe.cuisines.map(c => <span key={c}> {c} </span>) : "" } 
          </div>
      <div className={'Star'}>
          {renderStars()}
          <h5>{ratings.length} ratings</h5>
      </div>
      <div className={"RecipeTag"}>
          
          
      </div>
    </div>
    
  )
}

export default RecipeCard
