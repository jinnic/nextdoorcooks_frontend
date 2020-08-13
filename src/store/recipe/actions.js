import { SET_RECIPES} from './types'
import { getRecipes } from '../../api'

export const fetchRecipes = () =>{
  return function(dispatch){
    getRecipes()
      .then(data => {
        // check for errors (could also check the status code of the response)
        console.log("DONE Fetched RECIPES")
        if (!data.error) {
          // and set users array in state
          
          dispatch({type: SET_RECIPES, payload: data })
        }else{
          console.log(data.error)
        }
      })
  }
}