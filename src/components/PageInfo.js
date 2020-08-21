import React from 'react'
import { useSelector} from 'react-redux'



const PageInfo =({handleEdit, handleDelete, recipeOwner})=> {
  const currentUser = useSelector(state => state.user.currentUser)
  const {id, username, title, about}= recipeOwner
  
  const handleClick =(e)=>{
   e.target.name === 'delete' ? handleDelete(e) : handleEdit(true)

  }
      
 
  const renderButtons=()=>{
    return currentUser.id === id ? 
    <div className={'RecipeBtn Right'}>
      <button className={'Btn wide'} onClick={handleClick}>edit page</button>
    </div>
    : ''
  }
  
  return(
    <div className={"AccountInfo"}>
      {renderButtons()}
      <h3>{title !== null || title === "" ? title : `${username.charAt(0).toUpperCase()+currentUser.username.slice(1)}'s page`}</h3> 
      <p>
      {about !== null || about === "" ? about : "yet to come!"}
      </p>
    </div>
  )
}

export default PageInfo