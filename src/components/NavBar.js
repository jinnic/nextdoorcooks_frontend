import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const NavBar = ({ handleLogout }) => {
  const currentUser = useSelector(state => state.user.currentUser)
  return (
    <header className={'NavBar'}>
      <div className={'Logo'}>
        <Link to="/home">Home</Link>
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