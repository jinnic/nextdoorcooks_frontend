import React, { useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addLike, removeLike } from '../../api'
import { averageRatings } from '../Rating/index'
import { UPDATE_RECIPE } from '../../store/recipe/types'

import { makeStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';

import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Fab from '@material-ui/core/Fab';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import FlareIcon from '@material-ui/icons/Flare';

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
  const {name, duration, description, ingredients, instructions, user, ratings, likes} = recipe
  const currentUser = useSelector(state=>state.user.currentUser)
  const users = useSelector(state=>state.user.users)
  
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

  const renderInstructions = ()=>{
    // debugger
    if(instructions !== undefined){
      
      return instructions.map( i => <li key={i.instruction}>{i.instruction}</li>)
    }
  }

  const renderIngredients =()=>{
    if(ingredients !== undefined){
      return ingredients.map( (i,x) => {
        let mesurement = ""
        if (i.measurement !== 'n/a' ){
          mesurement = i.measurement
        }
        return <li key={`${i.name}_${x}`}>{`${i.amount} ${mesurement} of ${i.name}`}</li>
      })
    }
  }
  
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
    }else if (e.target.ariaLabel=== 'username') {

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
        {/* <button className={'LikeBtn'} onClick={handleClick}>♥︎</button>  */}
        {/* <button className={'LikeBtn'} onClick={handleClick}>♡</button> */}
  const renderLikeBtn =()=>{
    return haveLikes() ? 
        <IconButton aria-label="add to favorites" onClick={handleClick} name="like" >
          <BookmarkIcon /><span> {likes.length}</span>
        </IconButton>
        :
        <IconButton aria-label="remove favorites" onClick={handleClick} name="unlike">
          <BookmarkBorderIcon/><span> {likes.length}</span>
        </IconButton>
        
  }

  const renderStars =()=>{
    let stars = [<StarBorderIcon/>,<StarBorderIcon/>,<StarBorderIcon/>,<StarBorderIcon/>,<StarBorderIcon/>]
    return stars.map((s,i)=>{
      if(i < averageRatings(ratings)){
        debugger
        return <StarIcon key={`star_${i}`} />
      }
      return <StarBorderIcon key={`star_${i}`} />
    })
  }
  // if (user) return <h1>USER IS HERE</h1>

  //debugger
  return (
    // <Card key={recipe.name} className={classes.root} onClick={handleClick}>
    <div key={recipe.name} className={"RecipeCard"} onClick={handleClick}> 
     
      { (recipe.items.length > 0) ?
      <>
        {haveLikes() ? 
        <Fab className={classes.fab}  aria-label="add to favorites" onClick={handleClick} name="like" className={'LikeBtn'}>
          <BookmarkIcon />
        </Fab>
        :
        <Fab className={classes.fab} aria-label="add to favorites" onClick={handleClick} name="unlike" className={'LikeBtn'}>
         <BookmarkBorderIcon/>
        </Fab>}
      <div className={'RecipeCardImage'} >
        <img
          className={'RecipeCardImage'}
          src={`${recipe.items[0].image}`}
        />
      </div>
      {/* <CardMedia
        className={classes.media}
        image={`${recipe.items[0].image}`}
      /> */}
      </>
      :
      <img
        className={'RecipeCardImage'}
      />
      }
      <div className={"RecipeCardSubTitle"}>
        <div className={"RedcipeCardContent"}>
          <span className={'Rating'}>
            { ratings.length > 0 ?  <><StarIcon/><span>{averageRatings(ratings)}({ratings.length})</span></> : <><FlareIcon/><span>{'(new)'}</span></>} 
          </span>
          <span className={'Cuisines'}>
            { ( recipe.cuisines.length > 0) ? recipe.cuisines.map(c => <span> {c} </span>) : "" } 
          </span>
          {/* <p className={'Subheader'}>{`${recipe.date}`}</p> */}
        </div>

      </div>
      
      <div className={"RedcipeCardTitle"}>
        <div className={"RedcipeCardContent"}>
       

          <p className={'Header'}>{name.charAt(0).toUpperCase() + name.slice(1)}</p>
          <div className={'Footer'}>
            <span className={'Time'}><HourglassFullIcon/> {duration} min</span>
            <span className={'Subheader'}>
            <Link name={`${user.username}`} to={`/${user.username}`}>{`created by ${user.username.charAt(0).toUpperCase()+user.username.slice(1)}`}</Link>
            </span>
          </div>
          
          {/* <p className={'Subheader'}>{`${recipe.date}`}</p> */}
        </div>
      </div>
      
      {/* <CardHeader
        title={name.charAt(0).toUpperCase() + name.slice(1)}
        subheader={`${recipe.date}`}
        
      /> */}
      {/* avatar={
            <Avatar aria-label="username" className={classes.avatar} >
              {`${user.username[0].toUpperCase()}`}
            </Avatar>
        } */}
    {/* <div className={"RecipeCard"} onClick={handleClick}> */}
     {/* <h4>{name.charAt(0).toUpperCase() + name.slice(1)}</h4> */}
     {/* <h5>Ratings : { ratings === undefined ? 0 : averageRatings(ratings)} ⭐</h5> */}
     {/* <h5>duration : {duration} min</h5> */}
     {/* <p> {description}</p> */}

     {/* <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" noWrap>
        {description}
        </Typography>
      </CardContent> */}
      {/* <CardActions disableSpacing>
      {
        currentUser ? renderLikeBtn() : ''

     }
        <IconButton aria-label="ratings" >
        { ratings.length > 0 ?  renderStars() : <StarBorderIcon/>} 
        </IconButton>
        <h5>{duration} min</h5>
      </CardActions> */}
     {/* <Link name={`${user.username}`} to={`/${user.username}`}>{`created by ${user.username}`}</Link> */}
     {/* <span>{likes.length} likes</span> */}
     {/* {
        currentUser ? renderLikeBtn() : ''

     } */}
     {/* </Card> */}
    </div>
    
  )
}

export default RecipeCard
