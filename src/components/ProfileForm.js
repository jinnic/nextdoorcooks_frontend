import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {UPDATE_USER, SET_CURRENTUSER} from '../store/user/types'
import {updateUser} from '../api'


const ProfileForm =({ handleEdit})=> {
  const userProfile = useSelector(state => state.user.userProfile)
  const {avatar, bio, location} = useSelector(state => state.user.userProfile)
  const { username } = useSelector(state=>state.user.currentUser)

  const dispatch = useDispatch()

  const handleChange = e => {
    dispatch({type: UPDATE_USER, payload:  { [e.target.name]: e.target.value } })
  }

  const handleSubmit = e => {
    e.preventDefault()
    // make a fetch request to edit the current user
    updateUser(userProfile)
      .then(newUser => dispatch({type: SET_CURRENTUSER, payload: newUser }))
    // then update that user in state in our App component
    handleEdit(false)
  }


  return(
      <form className={"UserInfo"} onSubmit={handleSubmit}>
          <h1>{username}'s Profile</h1>

          <label>Location</label>
          <input
            type="text"
            name="location"
            autoComplete="off"
            value={location}
            onChange={handleChange}
          />
          <label>Profile Image</label>
          <input
            type="text"
            name="avatar"
            autoComplete="off"
            value={avatar}
            onChange={handleChange}
          />
          <img src={ avatar === null || avatar.length === 0  ?  "https://cdn.iconscout.com/icon/free/png-512/account-profile-avatar-man-circle-round-user-30452.png" : avatar} alt={username} />

          <label>Bio</label>
          <textarea
            name="bio"
            value={bio}
            onChange={handleChange}
          />

          <input type="submit" value="Update" />
        </form>
  )
}

export default ProfileForm