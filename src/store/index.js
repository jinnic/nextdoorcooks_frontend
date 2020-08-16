import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import userReducer from './user/reducer'
import recipeReducer from './recipe/reducer'
import searchReducer from './search/reducer'
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  user: userReducer,
  recipe: recipeReducer,
  search: searchReducer
})
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store