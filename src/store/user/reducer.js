import {SET_USERS, SET_CURRENTUSER, SET_CURRENTUSER_FOLLOWEES, ADD_CURRENTUSER_FOLLOWEES, REMOVE_CURRENTUSER_FOLLOWEES, SET_PROFILE, RESET_CURRENTUSER, UPDATE_USER} from './types'

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
        currentUser: action.payload
        
      }
    case SET_CURRENTUSER_FOLLOWEES:
    return {
      ...state,
      followees: action.payload
      
    }
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
        isLoading: false
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