import React from 'react'
import { Link } from 'react-router-dom'
import Search from './Search'


const NavBar = ({ currentUser, handleLogout, reSetQuery}) => {
  return (
    <header key={'navBar'} className={'NavBar'}>
      <div className={'Logo'}>
        <Link onClick={reSetQuery} to="/home">Home</Link>
      </div>
      
      <div className={'Menu'}>
        {currentUser ? (
          <>
            <Link to={`/${currentUser.username}`}>Account</Link>
            <Link to="/recipe/new">Add Recipe</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
            <>
              <Link to="/signup">Signup</Link>
              <Link to="/login">Login</Link>
            </>
          )}
      </div>
      
    </header>
  )
}

export default NavBar