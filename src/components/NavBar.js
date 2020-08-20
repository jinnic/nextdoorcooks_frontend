import React, {useState} from 'react'
import { Link, useLocation } from 'react-router-dom'
import Filter from './Filter'

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const NavBar = ({ currentUser, handleLogout, reSetQuery, query, filterByInput, filterByCusines, removeFilter }) => {
  
  const [anchorEl, setAnchorEl] = useState(null);
  // const path = useLocation().pathname
  // const [showFilter, setShowFilter] = useState(true)
  // if(path === "/home" || path === "/"){
  //   setShowFilter(true)
  // }else{
  //   setShowFilter(false)
  // }
  const handleClick = (e) => {
    // e.preventDefault();
    // e.stopPropagation();  
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header key={'navBar'} className={'NavBar'}>
      <div className={"TopMenu"}>
        <div className={'Logo'}>
          <Link onClick={reSetQuery} to="/home">Home</Link>
        </div>
        {/* <div className={'ToggleButtons'}>
          <Link onClick={reSetQuery} to="/recipes">Recipe</Link>
          <Link onClick={reSetQuery} to="/experiances">Experiances</Link>
        </div> */}
        <div key={'nav_menu'} className={'Menu'}>

          {currentUser ? (
            <>          
            <Button aria-controls="account-menu" aria-haspopup="true" onClick={handleClick}>
              Account
            </Button>
            <Menu
              id="account-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link to={`/${currentUser.username}`}>Account</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/recipes/saved">Bookmarked Recipe</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/recipes/new">Add Recipe</Link>
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
              {/* <Link to={`/${currentUser.username}`}>Account</Link>
              <Link to="/recipes/new">Add Recipe</Link>
              <button onClick={handleLogout}>Logout</button> */}
            </>
          ) : (
              <>
                <Link to="/signup">Signup</Link>
                <Link to="/login">Login</Link>
              </>
            )}
        </div>
      </div>
      <Filter className={'Filter'} query={query} handleSetQuery={filterByInput} handleSetSort={filterByCusines} removeFilter={removeFilter} />
      {/* showFilter ? <Filter className={'Filter'} query={query} handleSetQuery={filterByInput} handleSetSort={filterByCusines} removeFilter={removeFilter} /> : ''} */}
    </header>
  )
}

export default NavBar