
const defaultState = {
  query: "",
  sort: []
}

const reducer = (state = defaultState , action) =>{
  
  switch (action.type) {
    case "SET_QUERY":
      return {
        ...state,
        query: action.payload
      }
    
    case "RESET_QUERY":
      return{
        ...state,
        query: ""
      }
    case "SET_SORT":
    return{
       ...state,
       sort: [
         ...state.sort,
         action.payload
       ]
      }
    case "REMOVE_SORT":
    return{
      ...state,
      sort: state.sort.filter(s => s !== action.payload)
    }
    case "RESET_SORT":
    return{
      ...state,
       sort: []
    }
    default:
      return state
  }
}

export default reducer

