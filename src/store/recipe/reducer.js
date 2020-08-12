import {SET_RECIPES, ADD_RECIPE, UPDATE_RECIPE, DELETE_RECIPE} from './types'

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
    default:
      return state
  }
}

export default reducer

