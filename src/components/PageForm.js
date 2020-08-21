import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SET_CURRENTUSER} from '../store/user/types'
import {updateUser} from '../api'


const PageForm =({handlePageEdit})=> {
  const currentUser = useSelector(state=>state.user.currentUser)

  const [pageInfo,setPageInfo] = useState({
    title: currentUser.title,
    about: currentUser.about
  })
  const [nameFieldCounter,setNameCounter] = useState(0)

  const dispatch = useDispatch()

  const handleChange = e => {
    e.persist()
    if(e.target.name === 'title'){
      setNameCounter(e.target.value.length)
    }
    // debugger
    setPageInfo((preState)=>{
      return{...preState,
      [e.target.name]: e.target.value}
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    // make a fetch request to edit the current user
    const userObj={
      ...currentUser,
      ...pageInfo
    }
    updateUser(userObj)
      .then(newUser => {
        dispatch({type: SET_CURRENTUSER, payload: newUser })
      })
    
    // then update that user in state in our App component
    handlePageEdit(false)
  }

  const handleCancle =e=>{
    handlePageEdit(false)
  }

  console.log(pageInfo)
  return(
      <form className={"PageForm"} onSubmit={handleSubmit}>
          <label htmlFor='name'>Give Your Page a title*</label>
          <input
            type="text"
            name="title"
            placeholder="Busan style Korean Snacks"
            value={pageInfo.title}
            onChange={handleChange}
          />
          <span>{nameFieldCounter}/40</span>
        
        <label>Write about your collection of recipes*</label>
        <textarea
          name="about"
          rows="3"
          value={pageInfo.about}
          onChange={handleChange}
          placeholder="Sharing my family recipes with bit of twist."
        />
        <input className={'SubmitBtn'} type="submit" value="Update" />
        <input className={'CancleBtn'}  type="button" value="Cancle" onClick={handleCancle}/>
    </form>
  )
}

export default PageForm