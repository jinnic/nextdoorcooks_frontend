import { SET_CURRENTUSER, SET_PROFILE, SET_USERS} from './types'
import { getUsers } from '../../api'

export const setCurrentUser = (data) =>{
  return{
    type: SET_CURRENTUSER,
    payload: data 
  }
}

export const setProfile = (data) =>{
  return{
    type: SET_PROFILE,
    payload: data 
  }
}

// thunky action
export const fetchUsers = () =>{
  return function(dispatch){
    getUsers()
      .then(data => {
        // check for errors (could also check the status code of the response)
        if (!data.error) {
          // and set users array in state
          dispatch({type: SET_USERS, payload: data })
        }else{
          console.log(data.error)
        }
      })
  }
}