import React from 'react'
import { follow, unfollow } from '../api'
import { useSelector, useDispatch} from 'react-redux'
import {ADD_CURRENTUSER_FOLLOWEES, REMOVE_CURRENTUSER_FOLLOWEES} from '../store/user/types'
import { RiUserFollowLine, RiUserUnfollowLine } from 'react-icons/ri'



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
      <button className={'Btn wide'} name='unfollow' onClick={handleFollow}>Following <RiUserUnfollowLine key={`follow`} size={20}/></button> :
      <button className={'Btn wide'} name='follow' onClick={handleFollow}>Follow <RiUserFollowLine key={`follow`} size={20}/></button> 
    
  }
  const renderButtons=()=>{
    return currentUser.id === id ? 
    <>
        <button className={'Btn wide'} onClick={handleClick}>edit profile</button>
        <button className={'Btn wide'} name ='delete' onClick={handleClick}>delete account</button>
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
  console.log(followees)
  return(
    <div className={"UserInfo"}>
       <div className={'RecipeBtn'}>
          {renderButtons()}
       </div>
          <div className={'Avatar'}>
            <img src={avatar} alt="Avatar"/> 
            
            <div className={'Info'}>
            <h4>{username.charAt(0).toUpperCase()+username.slice(1)}</h4>
            <h5>{location}</h5>
            </div>
          </div>
          <p>{bio} </p>
          <div className={'FollowLists'}>
                
          </div>
    </div>
  )

}

export default ProfileInfo