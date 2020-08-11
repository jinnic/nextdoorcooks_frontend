import {SET_RECIPES, ADD_RECIPE, UPDATE_RECIPE} from './types'

const defaultState = {
  recipes: []
}

const reducer = (state = defaultState , action) =>{
  
  switch (action.type) {
    case SET_RECIPES:
      return {
        ...state,
        recipes: action.payload
      }
    case ADD_RECIPE:
      return {
        ...state,
        recipes: [
          ...state.recipes,
          action.payload
        ]
      }
    case UPDATE_RECIPE:
      return{
        ...state,
        recipes: [
          ...state.recipes,
          action.payload
        ]
      }
    default:
      return state
  }
}

export default reducer