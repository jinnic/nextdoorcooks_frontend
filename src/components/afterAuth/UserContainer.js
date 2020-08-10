import React from 'react'
import UserCard from './UserCard'

const UserContainer = ({ users }) => {
  
  const renderUserCard = users.map( user => <UserCard key={user.username} name={user.username}/> ) 
  
  return (
    <>
     {renderUserCard}
    </>
  )
}

export default UserContainer