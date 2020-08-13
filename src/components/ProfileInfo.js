import React from 'react'
import { follow, unfollow } from '../api'
import { useSelector, useDispatch} from 'react-redux'
import {ADD_CURRENTUSER_FOLLOWEES, REMOVE_CURRENTUSER_FOLLOWEES} from '../store/user/types'



const ProfileInfo =({handleEdit, handleDelete, recipeOwner})=> {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.currentUser)
  const followees = useSelector(state => state.user.followees)
  const {id, username, avatar, bio, location}= recipeOwner
  
  const handleClick =(e)=>{
   e.target.name === 'delete' ? handleDelete(e) : handleEdit(true)

  }

  let followed = followees.find(f => f.id === id)
  const renderFollowBtn = () =>{
    return followed ? 
      <button name='unfollow' onClick={handleFollow}>unfollow</button> :
      <button name='follow' onClick={handleFollow}>follow</button> 
    
  }
  const renderButtons=()=>{
    return currentUser.id === id ? 
    <>
      <button onClick={handleClick}>edit profile</button>
      <button name ='delete' onClick={handleClick}>DELETE ACCOUNT</button>
    </>
    :
    renderFollowBtn()
  }

  const handleFollow =(e)=>{
    console.log('want to follow this user! ', username)

    if(e.target.name === 'follow'){
      follow(recipeOwner.id)
      .then(data => {
        if (!data.error) {
          dispatch({type: ADD_CURRENTUSER_FOLLOWEES, payload: data })
        }else{
          console.log("FOLLOWEE ", data.error)
        }
      })
    }else{
      unfollow(recipeOwner.id)
      .then(data => {
        if (!data.error) {
          dispatch({type: REMOVE_CURRENTUSER_FOLLOWEES, payload: data })
        }else{
          console.log("FOLLOWEE ", data.error)
        }
      })
    }
    
  }
  
  return(
    <div className={"UserInfo"}>
          {renderButtons()}
          <h1>{username}'s Profile</h1>

          <h3>Location : {location}</h3>
          
          <h3>Profile Image</h3>
          <img src={ avatar === null || avatar.length === 0  ?  "https://cdn.iconscout.com/icon/free/png-512/account-profile-avatar-man-circle-round-user-30452.png" : avatar} alt={username} />

          <h3>Bio : {bio} </h3>
    </div>
  )
}

export default ProfileInfo