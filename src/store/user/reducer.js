import {SET_USERS, ADD_TO_USERS, UPDATE_USERS,
       SET_CURRENTUSER, SET_CURRENTUSER_FOLLOWEES, ADD_CURRENTUSER_FOLLOWEES, REMOVE_CURRENTUSER_FOLLOWEES, 
       SET_PROFILE, RESET_CURRENTUSER, 
       UPDATE_USER, DELETE_USER} from './types'

const defaultState = {
  currentUser: null,
  followees: [],
  isLoading: true,
  users: [],
  userProfile: {
      avatar: "",
      bio: '',
      location: ''
  }
}

const reducer = (state = defaultState , action) =>{
  
  switch (action.type) {
    case SET_CURRENTUSER:
      return {
        ...state,
        currentUser: action.payload,
        users: state.users.map(u => {
          if(action.payload.id === u.id){
            return action.payload
          }
          return u
        })
      }
    case SET_CURRENTUSER_FOLLOWEES:
    return {
      ...state,
      isLoading: false,
      followees: action.payload
      
    }
    case SET_USERS:
      return {
        ...state,
        users: action.payload

      }
    case ADD_TO_USERS:
    return{
      ...state,
      users: [
          ...state.users,
          action.payload
        ]
    }
    case UPDATE_USERS:
    return{
      ...state,
      users: state.users.map(u => {
        if(action.payload.id === u.id){
          return action.payload
        }
        return u
      })
    }
    case SET_PROFILE:
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          avatar: action.payload.avatar,
          bio: action.payload.bio,
          location: action.payload.location
        }
      }
    case UPDATE_USER:
      // debugger
      return {
        ...state,
        
        userProfile: {
          ...state.userProfile,
          ...action.payload
        }
      }
    case DELETE_USER:
    // debugger
    return {
      ...state,
        currentUser: null,
        users: state.users.filter(u => u.id !== action.payload.id)
    }
    case ADD_CURRENTUSER_FOLLOWEES:
      return{
        ...state,
        followees: [
          ...state.followees,
          action.payload
        ]
      }
    case REMOVE_CURRENTUSER_FOLLOWEES:
    return{
      ...state,
      followees: state.followees.filter(f => f.id !== action.payload.id)
    }
    case RESET_CURRENTUSER:
      return{
        ...state,
        currentUser: null
      }
    default:
      return state
  }
}

export default reducer