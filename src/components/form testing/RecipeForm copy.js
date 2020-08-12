import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {ADD_RECIPE} from '../../store/recipe/types'
import {addRecipe} from '../../api'


const RecipeForm =()=> {
  const [state, setState] = useState({
    name: "",
    duration: 0,
    description: "",
   })
   const selectIngredients = () =>{
    return ingredState.ingredients.map((item, i) => {
      return(
        <option key={`ingredient_${item.i}`} value={item.name}>{item.name}</option>
      )
    })
  }
  const selectIngredientAmount = (name) =>{
    // debugger
    let ingrediant = ingredState.ingredients.find(ingred => ingred.name === name )
    return <input
              type="number"
              name="amount"
              value={0}
              max={ingrediant.amout}
              onChange={e=>handleInstruction(e)}
            />
    }
  const renderIngredientAmount =(ingrediant)=>{
    
  }
  const [instructState, setInstructions] = useState({
    instructions: [
      {
        step:0,
        instruction: "",
        ingredients: []
      }
    ]
  })
  const handleInstruction = (e, i) =>{
    // console.log(e, i);
    
    let key = e.target.name
    let instructions = [...instructState.instructions];
    if(key === "ingredients"){
      instructions[i][key] = { name: e.target.value }
      setInstructions({ instructions });
      selectIngredientAmount(e.target.value)
    }else{
      instructions[i][key] = e.target.value
      setInstructions({ instructions });
    }
    

    // debugger
    // selectIngredientAmount()
  }

  const addInstructions =()=>{
    setInstructions((prevState) => ({
      instructions: [
        ...prevState.instructions, 
        {
          step:0,
          instruction: "",
          ingredients: []
        }
      ]
    }))
  }

  const removeInstruction =(i) =>{
    console.log(i)
    let instructions = [...instructState.instructions];
    instructions.splice(i, 1);
    // setIngredients({ ingredients });
  }

  const renderInstruction = () =>{
    return instructState.instructions.map((item, i)=>{
      item.step = i+1
      return(
        <div key={`instruction_${i}`}>
          <h5>{`step ${item.step}`}</h5>
          <label>instruction</label>
          <textarea
            name="instruction"
            value={item.instruction}
            onChange={e=>handleInstruction(e,i)}
          />

          <label>Ingredients</label>
          <select name="ingredients" value={item.ingredients.name} onChange={e=>handleInstruction(e,i)}>
            {selectIngredients()}
          </select>
          <input
              type="button"
              value="remove"
              onClick={()=>removeInstruction(i)}
            />
        </div>
      )
    })
  }

  const measurements = ['n/a', 'teaspoon', 'tablespoon', 'oz', 'cup', 'lb']
  const [ingredState, setIngredients] = useState({
    ingredients: [
      {
        name: "", 
        amount: 0,
        measurement:""
      }
    ]
  })


  const renderIngredient = () =>{
    return ingredState.ingredients.map((item, i)=> {
      return(
        <div key={i}>
          <label>Name</label>
          <textarea
            name="name"
            value={item.name}
            onChange={e=>handleIngredient(e,i)}
          />

          <label>Amount</label>
          <input
            type="number"
            name="amount"
            value={item.amount}
            onChange={e=>handleIngredient(e,i)}
          />

          <label>Measurement</label>
          <select name="measurement" value={item.measurement} onChange={e=>handleIngredient(e,i)}>
            {renderMesurements()}
            {/* {selectIngredientAmount()} */}
          </select>
          <input
              type="button"
              value="remove"
              onClick={()=>removeIngrediant(i)}
            />
        </div>
      )
    })
  }

  const renderMesurements = () =>{
    return measurements.map((item) => {
      return(
        <option key={item} value={item}>{item}</option>
      )
    })
  }

  const handleIngredient = (e, i) =>{
    console.log(e, i);
    let key = e.target.name
    let ingredients = [...ingredState.ingredients];
    ingredients[i][key] = e.target.value
    setIngredients({ ingredients });
  }

  const addIngredient = () =>{
    setIngredients((prevState) => ({
      ingredients: [
        ...prevState.ingredients, 
        {
          name: "", 
          amount: 0,
          measurement:"n/a"
        }
      ]
    }));
  }

  const removeIngrediant =(i) =>{
    console.log(i)
    let ingredients = [...ingredState.ingredients];
    ingredients.splice(i, 1);
    setIngredients({ ingredients });
  }
  const {name, duration, description, instructions} = state
  // const { username } = useSelector(state=>state.user.currentUser)
  // const dispatch = useDispatch()
  
  const handleChange = (e, i)=> {
    // debugger
    if(e.target.name.split('_')[0] === 'instruction'){
      // let key = e.target.name.split('_')[1]
      // setState({
      //   ...state,
      //   ingredients:[
      //     ingredient:{
      //       ...state.ingredient,
      //       [key]: e.target.value
      //     }
      //   ],
        
      // })
    }else{
      setState({
        ...state,
        [e.target.name]: e.target.value
      })
    }
    
    // values[i].value = e.target.value;
    // setFields(values);
    console.log( e.target.name, e.target.value);
    
  }

  // const handleAdd = () => {
  //   const values = [...fields];
  //   values.push({ value: null });
  //   setFields(values);
  // }

  // const handleRemove = (i) => {
  //   const values = [...fields];
  //   values.splice(i, 1);
  //   setFields(values);
  // }
  
  const handleSubmit = e => {
    e.preventDefault()
    // make a fetch request to edit the current user
    debugger
    const recipe = {

    }
    addRecipe(recipe)
      .then(console.log)
    // then update that user in state in our App component
  }
  
  console.log("ingredState", instructState);
    return (
      <form onSubmit={handleSubmit}>
        <h1>ADD NEW RECIPE</h1>

        <label>Name</label>
        <input
          type="text"
          name="name"
          autoComplete="off"
          value={name}
          onChange={handleChange}
        />
  <br/>      
        <label>Duration in MIN</label>
        <input
          type="number"
          name="duration"
          value={duration}
          onChange={handleChange}
        />
  <br/>
        <label>Description</label>
        <textarea
          name="description"
          value={description}
          onChange={handleChange}
        />
  <br/>
        <h5>Ingredients</h5>
        <br/>
        {renderIngredient()}
        <input type="button" value="add ingrediant" onClick={addIngredient} />
  <br/>
  <br/>
        <label>Instructions</label>
        {renderInstruction()}
        <input type="button" value="add instructions" onClick={addInstructions} />

  <br/>
        <input type="submit" value="Update" />
      </form>
    )
}

export default RecipeForm