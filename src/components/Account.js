import React, {useState} from 'react'
import ProfileForm from './ProfileForm'
import ProfileInfo from './ProfileInfo'
import RecipeCard from './Recipe/RecipeCard'
import { useSelector, useDispatch } from 'react-redux'

import {UPDATE_USER, SET_CURRENTUSER} from '../store/user/types'
import {updateUser} from '../api'


const Account =()=> {
  const [editUserInfo,setEditUserInfo] = useState(false)
  
  const handleEdit=(status)=>{
    setEditUserInfo(status)
    console.log(editUserInfo)
  } 
  const recipes = useSelector(state => state.recipe.recipes)
  const currentUser = useSelector(state => state.user.currentUser)
  const renderRecipeCards=()=>{
    const filteredRecipes = recipes.filter(r => r.user.id === currentUser.id)
    return filteredRecipes.map( recipe => <RecipeCard className={"RecipeCard"} key={recipe.id} recipe={recipe}/> ) 
  }

  const renderExperianceCards=()=>{
    // const filteredExperiances = experiances.filter(ex => ex.user.id === currentUser.id)
    // return filteredExperiances.map( ex => <ExperianceCard className={"ExperianceCard"} key={ex.id} name={ex.name}/> ) 
  }
    return (
      <>
        <div className={'Row'}>
        {editUserInfo ? <ProfileForm handleEdit={handleEdit}/> : <ProfileInfo handleEdit={handleEdit}/>  }
        <div className={"Account"}>
          
          <div className={"AccountInfo"}>
            <h2>Your Page Title</h2>
            <h3>About</h3>
            <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            <h3>Interested In</h3>
            <p>tag1, tag2 tag3</p>
          </div>
          <h2>Recipes</h2>
          <div className={"RecipeContainer"}>                      
              {renderRecipeCards()}
          </div>

          <div className={"ExperianceContainer"}>
            <h2>Experiances</h2>
            <div className={"Experiances"}>
              {renderExperianceCards()}
            </div>
          </div>
        </div>
        </div>
      </>
    )
}

export default Account