import React, { useEffect } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import SignUp from './SignUp'
import Login from './Login'
import NavBar from './NavBar'
import Profile from './Profile'
import RecipeForm from './RecipeForm'
import UserContainer from './UserContainer'
import RecipeContainer from './RecipeContainer'
import { getCurrentUser, getRecipes} from '../api/index'
import {setCurrentUser, setProfile, fetchUsers} from '../store/user/actions'
import {SET_CURRENTUSER, SET_PROFILE, RESET_CURRENTUSER} from '../store/user/types'
import {SET_RECIPES} from '../store/recipe/types'

//destructire props and use history for routing
const App =( {history} )=> {


  const currentUser = useSelector(state => state.user.currentUser)
  const users = useSelector(state => state.user.users)
  const stateData = useSelector(state => {
    return{
      currentUser: state.user.currentUser,
      users: state.user.users,
      userProfile: state.user.userProfile
    }
  })
  const dispatch  = useDispatch()
  
  
  //fetch initial data : currentUser and users
  useEffect(() => {
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
        history.push('/home')

      }else{
        console.log(data.error)
      }
    })

    dispatch(fetchUsers())

    getRecipes()
      .then(recipes => dispatch({type: SET_RECIPES, payload: recipes }))
    
  },[dispatch])
  
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


  
    console.log("In App, state:", stateData)
    return (
      <>
        <NavBar currentUser={currentUser} handleLogout={handleLogout} />
        <main>
          <Switch>
            <Route path="/signup">
              <SignUp handleLogin={handleLogin} />
            </Route>
            <Route path="/login">
              <Login handleLogin={handleLogin} />
            </Route>
            <Route path="/profile">
              {currentUser ? <Profile /> : <Redirect to='/' />}
            </Route>
            <Route path="/recipe/new">
              {currentUser ? <RecipeForm /> : <Redirect to='/' />}
            </Route>
            <Route path="/home">
              {currentUser ? <h1>Welcome, {currentUser.username}</h1> : <Redirect to='/' />}
              <UserContainer users={users}/>
              <RecipeContainer />
            </Route>
            <Route path="/">
              <h1>Please Login or Sign Up</h1>
              <RecipeContainer />
            </Route>
          </Switch>
        </main>
      </>
    );
}

export default withRouter(App);