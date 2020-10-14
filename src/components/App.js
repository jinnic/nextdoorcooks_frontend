import React, { useState, useEffect } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import SignUp from './SignUp'
import Login from './Login'
import NavBar from './NavBar'
import Account from './Account/Account'
import Recipe from './Recipe/Recipe'
import RecipeForm from './Recipe/RecipeForm'
import RecipeContainer from './Recipe/RecipeContainer'
import { getCurrentUser, getRecipes, getCurrentUserFollowees} from '../api/index'
import {setCurrentUser, setProfile, fetchUsers} from '../store/user/actions'
import {SET_CURRENTUSER, SET_PROFILE, RESET_CURRENTUSER, SET_CURRENTUSER_FOLLOWEES} from '../store/user/types'
import {SET_RECIPES, IS_FETCHING} from '../store/recipe/types'

// style - material-ui
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
}));

//destructire props and use history for routing
const App =( props )=> {
  //style 
  const classes = useStyles();
  // const [open, setOpen] = React.useState(true);

  const history = props.history
  const dispatch  = useDispatch()

  const fetching = useSelector(state=>state.recipe.recipeFetching)
  const currentUser = useSelector(state => state.user.currentUser)
  // const isLoading = useSelector(state => state.user.isLoading)
  const recipes = useSelector(state => state.recipe.recipes)
  
  const query = useSelector(state => state.search.query)
  const filterByInput=(e)=>{
    let input = e.target.value;
    dispatch({ type: "SET_QUERY", payload: input})
    console.log("in filter by input fn : ",query)
  }
  
  const reSetQuery = (e) =>{
    let click = e.target.pathname

    if(click === "/home" || click === "/recipes" || click === "/experiances" ){
      dispatch({ type: "RESET_QUERY"})
      dispatch({ type: "RESET_SORT"})
    }
  }

  const sort = useSelector(state=> state.search.sort)
  
  const addFilter =(input)=>{
    // let input = e.target.name;
    dispatch({ type: "SET_SORT", payload: input})
    console.log("in filterByCusines fn : ",input)
  }

  const removeFilter =(input)=>{
    // let input = e.target.name;
    dispatch({ type: "REMOVE_SORT", payload: input})
    console.log("in removeFilter fn : ",input)
  }

  const [searchResults, setSearchResults] = useState([]);
 
  useEffect(()=>{
    let results = recipes
    let queryResult = []
    
    if (query !== "" ) {
      results = recipes.filter(r => r.name.toLowerCase().includes(query.toLowerCase()))
      console.log("QUERY RESULT : ", queryResult)
    }

    if (queryResult.length > 0 && sort.length > 0 ){
      results = results.filter(r => {
        for(let i = 0 ; i <r.cuisines.length; i++){
          for(let j = 0 ; j <sort.length; j++){
            if (r.cuisines[i].toLowerCase()===sort[j].toLowerCase()) return r
          }
        }
      })
    }

    if (queryResult.length === 0 && sort.length > 0){
      // results = recipes.filter(r => r.cuisines.includes(sort.toLowerCase()))   
      
      results = recipes.filter(r => {
        for(let i = 0 ; i <r.cuisines.length; i++){
          if (r.cuisines[i].toLowerCase()===sort[0].toLowerCase()) return r
        }
      })
    
    if (query !== "" && sort !== ""){
      // results = recipes.filter(r => r.cuisines.includes(sort.toLowerCase()))   
      
      let sortResults = recipes.filter(r => {
        for(let i = 0 ; i <r.cuisines.length; i++){
          for(let j = 0 ; j <sort.length; j++){
            if (r.cuisines[i].toLowerCase()===sort[j].toLowerCase()) return r
          }
        }
      })

      results = sortResults.filter(r => r.name.toLowerCase().includes(query.toLowerCase()))
    }

      
      console.log("SORT RESULT : ", results)
    }

    setSearchResults(results);

    
    
  },[query, recipes, sort])
  
  useEffect(()=>{
    dispatch({type:IS_FETCHING, payload: true})
    getRecipes()
      .then(recipes => dispatch({type: SET_RECIPES, payload: recipes }))
    dispatch(fetchUsers())
    getCurrentUser()
    .then(data => {
      // check for errors (could also check the status code of the response)
      if (!data.error) {
        // and set current user in state
        // handleLogin(data)
        const currentUserAction = setCurrentUser(data)
        const setProfileAction = setProfile(data)
        dispatch(currentUserAction)
        dispatch(setProfileAction)
        // debugger
        const path = history.location.pathname
        getCurrentUserFollowees(data.id)
          .then(data => {
            if (!data.error) {
              dispatch({type: SET_CURRENTUSER_FOLLOWEES, payload: data })
              console.log("FOLLOWEE ", data)
            }else{
              console.log("FOLLOWEE ERROR", data.error)
            }
          })
        // debugger
        // 
        path === "/" ? history.push('/home') :  history.push(path)
        

        // history.push('/home')

      }else{
        console.log('no current user',data.error)
        history.push('/home')
      }
    })
    
  }, [])

  
  // log user in when component mounts
  const handleLogin = currentUser => {
    // set current user,
    // set profile of current user
    // then redirect to home page
    dispatch({type: SET_CURRENTUSER, payload: currentUser })
    dispatch({type: SET_PROFILE, payload:  currentUser})
    history.push('/home')

    // set current user, then redirect to home page
    // this.setState({ currentUser }, () => {
    //   history.push('/home')
    // })
  }

  const handleLogout = () => {
    // remove the userId from localstorage
    // localStorage.clear()
    localStorage.removeItem("token")
    dispatch({type: RESET_CURRENTUSER})
    history.push('/')
  }

  const [likedRecipes, setLikedRecipes] = useState([]);
  useEffect(() => {
    if(currentUser && recipes){
      let liked = []
      for(let i = 0; i< recipes.length; i++){
        for(let j = 0; j< recipes[i].likes.length; j++){
          if(recipes[i].likes[j].user_id === currentUser.id){
            liked.push(recipes[i])
          }
        }    
      }
      console.log("LIKED RECIPES : ", liked)
      setLikedRecipes(liked)
    }
  }, [recipes, currentUser])

  return (
      <>
        <Backdrop className={classes.backdrop} open={fetching} >
              <CircularProgress color="inherit" />
        </Backdrop>
        <NavBar currentUser={currentUser} handleLogout={handleLogout} reSetQuery={reSetQuery} query={query} filterByInput={filterByInput} filterByCusines={addFilter} removeFilter={removeFilter} />
        <main>
        <div className={'Container'}>
          <Switch>
            <Route exact path="/signup">
              <SignUp handleLogin={handleLogin} dispatch={dispatch} />
            </Route>
            <Route exact path="/login">
              <Login handleLogin={handleLogin} />
            </Route>
            <Route exact path="/recipes/new">
              {currentUser ? <RecipeForm /> : <Redirect to='/' />}
            </Route>
            <Route exact path="/recipes/saved">
              {currentUser ? <div className={'Row'}><h1 >Bookmarked Recipes</h1></div> : <Redirect to='/' />}
              {currentUser && recipes ? <RecipeContainer recipes={likedRecipes} /> : ""}
            </Route>
            <Route path={`/recipes/:id/:slug`}>
              {currentUser ? <Recipe /> : <Redirect to='/' />}
            </Route>
            <Route  exact path="/recipes" >
              {currentUser ? <h2>Recipes</h2> : <Redirect to='/' />}
              {searchResults && searchResults.length ? <RecipeContainer recipes={searchResults} />:""}
            </Route>
            <Route  exact path="/experiances" >
              {currentUser ? <div className={'Row'}><h1 >{currentUser.username.charAt(0).toUpperCase()+currentUser.username.slice(1)}, what are you cooking today?</h1></div> : <Redirect to='/' />}
              <h2>Experiances</h2>  
            </Route>
            <Route exact path="/home" >
              {currentUser ? <div className={'Row'}><h1 >{currentUser.username.charAt(0).toUpperCase()+currentUser.username.slice(1)}, what are you cooking today?</h1></div> : <Redirect to='/' />}
              {searchResults && searchResults.length ? <RecipeContainer recipes={searchResults} />:""}
            </Route>
            <Route path='/:slug'> 
              <Account /> 
            </Route>
            <Route exact path="/" >
              <h1>Welcome, Sign up and share your recipes</h1>
              {searchResults && searchResults.length ? <RecipeContainer recipes={searchResults} />:""}
            </Route>
            
          </Switch>
        </div>
        </main>
      </>
    );
}

export default withRouter(App);