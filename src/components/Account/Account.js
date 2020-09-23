import React, {useState} from 'react'
import ProfileForm from './ProfileForm'
import ProfileInfo from './ProfileInfo'
import PageForm from './PageForm'
import PageInfo from './PageInfo'
import RecipeCard from '../Recipe/RecipeCard'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useHistory, Redirect } from 'react-router-dom'
import {RESET_CURRENTUSER, DELETE_USER} from '../../store/user/types'
import {DELETE_RECIPES_OF_USER} from '../../store/recipe/types'
import {deleteUser} from '../../api'


const Account =()=> {
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()
  const userPath = location.pathname.split('/')[1]
  const [editUserInfo,setEditUserInfo] = useState(false)
  const [editPageInfo,setEditPageInfo] = useState(false)
  const recipes = useSelector(state => state.recipe.recipes)
  const users = useSelector(state => state.user.users)
  const currentUser = useSelector(state => state.user.currentUser)
  let recipeOwner = {}

  if(users){
    recipeOwner = users.find(user => user.username === userPath) 
    // debugger
    if(recipeOwner === undefined) {
      return <Redirect to='/home' />
    }
  }
  
  const handleEdit=(status)=>{
    setEditUserInfo(status)
    console.log(editUserInfo)
  } 

  const handlePageEdit=(status)=>{
    setEditPageInfo(status)
    console.log(editUserInfo)
  }
  
  const handleLogout = () => {
    // remove the userId from localstorage
    // localStorage.clear()
    localStorage.removeItem("token")
    dispatch({type: RESET_CURRENTUSER})
  }
  

  const handleDelete=(e)=>{
    console.log("clicked delete")
    // setEditUserInfo(false)
    window.confirm('Are you sure you wish to delete your account?') ? onConfirm("confirm") : onCancel("cancel")

  } 
  const onConfirm=(a)=>{
    console.log(a)
    deleteUser(currentUser)
      .then( r => {
        dispatch({type: DELETE_USER, payload: r})
        dispatch({type: DELETE_RECIPES_OF_USER, payload: r})
      })
    //log out
    handleLogout()
    history.push('/')
  }

  const onCancel=(a)=>{
    console.log(a)
  }
  const renderRecipeCards=()=>{
    const filteredRecipes = recipes.filter(r => r.user.id === recipeOwner.id)
    return filteredRecipes.map( recipe => <RecipeCard className={"RecipeCard"} key={recipe.id} recipe={recipe}/> ) 
  }

    return (
      <>{ users ?  
        <>
        <div className={'Account'}>
          { editUserInfo ? <ProfileForm handleEdit={handleEdit}/> : <ProfileInfo handleEdit={handleEdit} recipeOwner={recipeOwner} handleDelete={handleDelete}/>  }
            <div className={"AccountProfile"}>
              { editPageInfo ? <PageForm handlePageEdit={handlePageEdit}/> 
                : <PageInfo handleEdit={handlePageEdit} recipeOwner={recipeOwner}/>
              }
              <div class="RecipeUnderline">
                <h4>Recipes</h4>
              </div>
              <div className={"AccountRecipes"}>                      
                  {renderRecipeCards()}
              </div>
            </div>
        </div>
          
        </>
        : 
          <Redirect to='/' />
        }
      </>
    )
}

export default Account