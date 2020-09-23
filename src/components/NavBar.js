import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Filter from './Filter'

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const NavBar = ({ currentUser, handleLogout, reSetQuery, query, filterByInput, filterByCusines, removeFilter }) => {
  
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();  
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header key={'navBar'} className={'NavBar'}>
      <div className={"TopMenu"}>
        <div className={'Logo'}>
          <Link onClick={reSetQuery} to="/home">Nextdoor Cooks</Link>
        </div>
        <div key={'nav_menu'} className={'Menu'}>

          {currentUser ? (
            <>          
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              Account
            </Button>
            <Menu
              id="simple-menu"
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
    </header>
  )
}

export default NavBar