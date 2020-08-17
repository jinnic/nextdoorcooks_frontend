import React from 'react'
import { Link } from 'react-router-dom'


const NavBar = ({ currentUser, handleLogout, reSetQuery}) => {

  const handleClick =(e)=>{
    e.preventDefault();
    e.stopPropagation();  
    debugger
    reSetQuery(e)
  }
  
  return (
    <header key={'navBar'} className={'NavBar'}>
      <div className={'Logo'}>
        <Link onClick={reSetQuery} to="/home">Home</Link>
      </div>
      
      <div key={'nav_menu'} className={'Menu'}>
      <Link onClick={reSetQuery} to="/recipes">Recipe</Link>
      <Link onClick={reSetQuery} to="/experiances">Experiances</Link>
        {currentUser ? (
          <>          
            <Link to={`/${currentUser.username}`}>Account</Link>
            <Link to="/recipes/new">Add Recipe</Link>
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