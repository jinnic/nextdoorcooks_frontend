import {IS_FETCHING, SET_RECIPES, ADD_RECIPE, UPDATE_RECIPE, DELETE_RECIPE, DELETE_RECIPES_OF_USER} from './types'

const defaultState = {
  recipes: [],
  recipeFetching: false,
  query: ""
}

const reducer = (state = defaultState , action) =>{
  
  switch (action.type) {
    case SET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        recipeFetching: false
      }
    case ADD_RECIPE:
      return {
        ...state,
        recipes: [
          ...state.recipes,
          action.payload
        ],
        recipeFetching: false
      }
    case IS_FETCHING:
      return{
        ...state,
        recipeFetching: action.payload
      }
    case UPDATE_RECIPE:
      return{
        ...state,
        recipes: state.recipes.map(r => {
          if(action.payload.id === r.id){
            return action.payload
          }
          return r
        })
      }
    case DELETE_RECIPE:
      return{
        ...state,
        recipes: state.recipes.filter(r => r.id !== action.payload.id)
      }
    case DELETE_RECIPES_OF_USER:
    debugger
    return{
      ...state,
      recipes: state.recipes.filter(r => r.user.id !== action.payload.id)
    }
    // case "FILTER_BY_VALUE":
    //   return {
    //     ...state,
    //     query: action.payload,
    //   }
    
    // case "RESET_QUERY":
    //   return{
    //     query: ""
    //   }
    default:
      return state
  }
}

export default reducer

