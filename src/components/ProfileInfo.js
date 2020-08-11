import React from 'react'

import { useSelector} from 'react-redux'



const ProfileInfo =({handleEdit})=> {
  
  const {username, avatar, bio, location} = useSelector(state => state.user.currentUser)

  const handleClick =()=>{
    handleEdit(true)
  }

  return(
    <div className={"UserInfo"}>
          
          <h1>{username}'s Profile</h1>

          <h3>Location : {location}</h3>
          
          <h3>Profile Image</h3>
          <img src={ avatar === null || avatar.length === 0  ?  "https://cdn.iconscout.com/icon/free/png-512/account-profile-avatar-man-circle-round-user-30452.png" : avatar} alt={username} />

          <h3>Bio : {bio} </h3>
          <button onClick={handleClick}>edit profile</button>
    </div>
  )
}

export default ProfileInfo