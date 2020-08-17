import React, { useState, useEffect } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import SignUp from './SignUp'
import Login from './Login'
import Filter from './Filter'
import NavBar from './NavBar'
import Account from './Account'
import Recipe from './Recipe/Recipe'
import RecipeForm from './Recipe/RecipeForm'
import RecipeContainer from './Recipe/RecipeContainer'
import { getCurrentUser, getRecipes, getCurrentUserFollowees} from '../api/index'
import {setCurrentUser, setProfile, fetchUsers} from '../store/user/actions'
import {SET_CURRENTUSER, SET_PROFILE, RESET_CURRENTUSER, SET_CURRENTUSER_FOLLOWEES} from '../store/user/types'
import {SET_RECIPES, IS_FETCHING} from '../store/recipe/types'


//destructire props and use history for routing
const App =( props )=> {
  const history = props.history
  const dispatch  = useDispatch()

  const fetching = useSelector(state=>state.recipe.recipeFetching)
  const currentUser = useSelector(state => state.user.currentUser)
  const isLoading = useSelector(state => state.user.isLoading)
  const recipes = useSelector(state => state.recipe.recipes)
  const followees = useSelector(state => state.user.followees)

  
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
  const filterByCusines =(e)=>{
    let input = e.target.name;
    dispatch({ type: "SET_SORT", payload: input})
    console.log("in filterByCusines fn : ",input)
  }

  

  const [searchResults, setSearchResults] = useState([]);
  useEffect(()=>{
    let results = recipes
    let queryResult = []
    
    if (query !== "" ) {
      queryResult = recipes.filter(r => r.name.toLowerCase().includes(query.toLowerCase()))
      console.log("QUERY RESULT : ", queryResult)
    }

    if (queryResult.length > 0 && sort !== ""){
       results = queryResult.filter(r => {
        for(let i = 0 ; i <r.cuisines.length; i++){
          if (r.cuisines[i].toLowerCase()===sort.toLowerCase()) return r
        }
      })
    }

    if (queryResult.length === 0 && sort !== ""){
      // results = recipes.filter(r => r.cuisines.includes(sort.toLowerCase()))   
      
      results = recipes.filter(r => {
        for(let i = 0 ; i <r.cuisines.length; i++){
          if (r.cuisines[i].toLowerCase()===sort.toLowerCase()) return r
        }
      })
    
    if (query !== "" && sort !== ""){
      // results = recipes.filter(r => r.cuisines.includes(sort.toLowerCase()))   
      
      let sortResults = recipes.filter(r => {
        for(let i = 0 ; i <r.cuisines.length; i++){
          if (r.cuisines[i].toLowerCase()===sort.toLowerCase()) return r
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
            }else{
              console.log("FOLLOWEE ", data.error)
            }
          })
        // debugger
        // 
        path === "/" ? history.push('/home') :  history.push(path)
        

        // history.push('/home')

      }else{
        console.log(data.error)
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
  }

  if (isLoading || fetching) return <h1>IS LOADING</h1>
  console.log("In App Props : ", props)
    return (
      <>
        <Filter  query={query} handleSetQuery={filterByInput} handleSetSort={filterByCusines} />
        <NavBar currentUser={currentUser} handleLogout={handleLogout} reSetQuery={reSetQuery} />
        <main>
        <div className={'Container'}>
          <Switch>
            <Route path="/signup">
              <SignUp handleLogin={handleLogin} dispatch={dispatch} />
            </Route>
            <Route path="/login">
              <Login handleLogin={handleLogin} />
            </Route>
            <Route path="/recipes/new">
              {currentUser ? <RecipeForm /> : <Redirect to='/' />}
            </Route>
            <Route path={`/recipes/:id/:slug`}>
              {currentUser ? <Recipe /> : <Redirect to='/' />}
            </Route>
            <Route  exact path="/recipes" >
              {currentUser ? <div className={'Row'}><h1 >Welcome, {currentUser.username}</h1></div> : <Redirect to='/' />}
              <h2>Recipes</h2>  
              {searchResults && searchResults.length ? <RecipeContainer recipes={searchResults} />:""}
                  {/* <RecipeContainer recipes={[]} /> */}
            </Route>
            <Route  exact path="/experiances" >
              {currentUser ? <div className={'Row'}><h1 >Welcome, {currentUser.username}</h1></div> : <Redirect to='/' />}
              <h2>Experiances</h2>  
            </Route>
            <Route exact path="/home" >
              {currentUser ? <div className={'Row'}><h1 >Welcome, {currentUser.username}</h1></div> : <Redirect to='/' />}
              <h2>Recipes</h2>  
              {searchResults && searchResults.length ? <RecipeContainer recipes={searchResults} />:""}
              <h2>Experiances</h2> 
                  {/* <RecipeContainer recipes={[]} /> */}
            </Route>
            <Route path='/:slug'> 
              {/* <h1>SLIUUUUUUUUUGGGGGG PAGE</h1> */}
              <Account /> 
            </Route>
            <Route exact path="/" >
              <h1>Please Login or Sign Up</h1>
              {searchResults && searchResults.length ? <RecipeContainer recipes={searchResults} />:""}

              {/* {filterRecipes() && filterRecipes().length ? <RecipeContainer recipes={filterRecipes()}/>: ""} */}
              {/* <RecipeContainer recipes={filterRecipes()} /> */}
            </Route>
            
          </Switch>
        </div>
        </main>
      </>
    );
}

export default withRouter(App);