import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import {ADD_RECIPE, IS_FETCHING} from '../../store/recipe/types'
import {addRecipe} from '../../api'
import {updateImageDisplay} from './File'

const RecipeForm =(props)=> {
  const currentUser = useSelector(state=>state.user.currentUser)
  const dispatch = useDispatch()
  const history = useHistory()

  const [infoState, setInfoState] = useState({
    name: "",
    duration: 0,
    description: "",
    cuisines: [""]
   })
  const {name, duration, description} = infoState
  
  const [ingredState, setIngredients] = useState({
    ingredients: [
        { 
          category: "",
          name: "", 
          amount: 0,
          measurement:"n/a"
        }
      
    ]
  })
  const measurements = ['n/a', 'drop','pinch', 'dash','teaspoon','tablespoon', 'ounce', 'pounds', 'cup', 'pint', 'quart', 'gallon']

  const [instructState, setInstructions] = useState({
    instructions: [
      {
        step:0,
        instruction: "",
        ingredients: {...ingredState.ingredients[0]}
        //  [{...ingredState.ingredients[0]}]
      }
    ]
  })

  const addInstructions =()=>{
    setInstructions((prevState) => ({
      instructions: [
        ...prevState.instructions, 
        {
          step:0,
          instruction: "",
          ingredients: {...ingredState.ingredients[0]}
        }
      ]
    }))
  }

  const selectIngredients = () =>{
    return ingredState.ingredients.map((item, i) => {
      return(
        <option key={`ingredient_select_${i}`} value={item.name}>{item.name}</option>
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
              max={ingrediant.amount}
              onChange={e=>handleInstruction(e)}
            />
    }
  const renderIngredientAmount =(ingrediant)=>{
    
  }
  
  const handleInstruction = (e, i) =>{
    // console.log(e, i);
    
    let key = e.target.name
    let instructions = [...instructState.instructions];
    
    
    if(key === "ingredients"){
      debugger
      let ingrediant = ingredState.ingredients.find(ingred => ingred.name === e.target.value )
      instructions[i][key] = {...ingrediant}
      setInstructions({ instructions });
      // selectIngredientAmount(e.target.value)
    }else{
      instructions[i][key] = e.target.value
      setInstructions({ instructions });
    }
    

    // debugger
    // selectIngredientAmount()
  }

  
  const removeInstruction =(i) =>{
    console.log(i)
    let instructions = [...instructState.instructions];
    instructions.splice(i, 1);
    setInstructions({ instructions });
  }

  const renderInstruction = () =>{
    return instructState.instructions.map((item, i)=>{
      item.step = i+1
      return(
        <div className={'Instruction'} key={`instruction_${i}`}>
          {/* <h5>{`step ${item.step}`}</h5> */}
            <input
              className={'RemoveBtn'}
              type="button"
              value="X"
              onClick={()=>removeInstruction(i)}
            />
          <label >{`step ${item.step}`}</label>
          <textarea
            rows="3"
            name="instruction"
            value={item.instruction}
            onChange={e=>handleInstruction(e,i)}
          />

          {/* <label>Ingredients</label>
          <select name="ingredients" value={item.ingredients.name} onChange={e=>handleInstruction(e,i)} multiple>
            {selectIngredients()}
          </select> */}
        </div>
      )
    })
  }
  const category_types = ['Sauce', 'Marinate', 'Main']

  const renderIngredient = () =>{
    return ingredState.ingredients.map((item, i)=> {
      return(
        <div className={'Ingrediant'} key={`ingredient_${i}`}>
          <input
            className={'RemoveBtn'}
            type="button"
            value="X"
            onClick={()=>removeIngrediant(i)}
          />
          <label>Category</label>
          <input
            list="category_list"
            name="category"
            value={item.category}
            onChange={e=>handleIngredient(e,i)}
          />
          <datalist id="category_list">
            {category_types.map(category => <option value={category} key={category}/>)}
          </datalist>

          <label>Name</label>
          <input
            type="text"
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
          <label>Measurement
            <div >
            <select  name="measurement" value={item.measurement} onChange={e=>handleIngredient(e,i)}>
              {renderMesurements()}
              {/* {selectIngredientAmount()} */}
            </select>
            </div>
          </label>
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
          category: "",
          name: "", 
          amount: 0,
          measurement:"n/a"
        }
      ]
    }));
    let instructions = [...instructState.instructions];
    instructions[0]['ingredients'] = {...ingredState.ingredients[0]}
    setInstructions({ instructions });
  }

  const removeIngrediant =(i) =>{
    console.log(i)
    let ingredients = [...ingredState.ingredients];
    ingredients.splice(i, 1);
    setIngredients({ ingredients });
  }
  
  const [nameFieldCounter,setNameCounter] = useState(0)
  const handleChange = (e, i)=> {
    // debugger
    if(e.target.name === 'name'){
      setNameCounter(e.target.value.length)
    }
    if(e.target.name.split('_')[0] === 'instruction'){
      // let key = e.target.name.split('_')[1]
      // setInfoState({
      //   ...state,
      //   ingredients:[
      //     ingredient:{
      //       ...state.ingredient,
      //       [key]: e.target.value
      //     }
      //   ],
      // })
    }else if(e.target.name ==='myCusine'){
      setInfoState({
        ...infoState,
        cuisines: infoState.cuisines.map((val, index)=>{
          if(index === i){
            return e.target.value
          }
          return val
        })
      })
      
    }else{
      setInfoState({
        ...infoState,
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
  // 


  const handleSubmit = e => {
    e.preventDefault()
    const form = new FormData()
    fileState.items.forEach((item,i) => {
      form.append(`items[${i}]`, item)
    })
    form.append("imageable_type", "Recipe")
    // make a fetch request to edit the current user
    const recipe = {
      ...infoState,
      ...ingredState,
      ...instructState,
      user_id: currentUser.id
    }
    debugger
    console.log(recipe)
    form.append("recipe", JSON.stringify(recipe))
   
    // debugger
    // addRecipe(form)
    //   .then(recipe => dispatch({type: ADD_RECIPE, payload: recipe}))
    // console.log("want to redirect : ", props)
    dispatch({type: IS_FETCHING, payload: true})
    fetch("http://localhost:3000/recipes", {
                method: "POST",
                body: form
          })
            .then(r => r.json())
            .then(data => dispatch({type: ADD_RECIPE, payload: data}))
            history.push(`/${currentUser.username}`)
    
    
    /*const form = new FormData()
    fileState.items.forEach((item,i) => {
      form.append(`items[${i}]`, item)
    })
    form.append("imageable_type", "Recipe")
    // make a fetch request to edit the current user
    const recipe = {
      ...infoState,
      ...ingredState,
      ...instructState,
      user_id: currentUser.id
    }

    form.append("recipe", JSON.stringify(recipe))
   
    // debugger
    addRecipe(form)
      .then(recipe => dispatch({type: ADD_RECIPE, payload: recipe}))
    console.log("want to redirect : ", props)
    history.push(`/${currentUser.username}`)*/
  }

  //could be array
  const [fileState, setFileState] = useState({
    items: [],
    caption: ""
   })
  const handleFileUpload = (e)=>{
    const input = document.querySelector('#FileBtn');
    const preview = document.querySelector('.FilePreview');
    updateImageDisplay(preview,input)
    
    console.log(e.target.files)
    e.persist()

    //for multiple file
    let  f = e.target.files
    let items = []
    Object.keys(f).forEach(i => items.push(f[i]))
    console.log(items)
    setFileState((prevState) => ({
      ...prevState,
      items: items
    }))
    // let  items = e.target.files[0]
    // setFileState((prevState) => ({
    //     ...prevState,
    //     items: items
    //   }))

    
    // console.log("items : ", items)
    // debugger
    // e.target.files.map(file => {
    //   return({
    //     [file.type.split('/')[0]] : e.target.files[0]
    //   })
      
    // })

    
    // [e.target.files[0].type.split('/')[0]] : e.target.files[0]
  }
  const cusine_types = ['African', 'American', 'British', 'Cajun', 'Caribbean',
                        'Chinese', 'Eastern', 'European', 'French', 
                        'German','Greek', 'Indian','Irish','Italian','Japanese',
                        'Jewish','Korean','Latin American','Mediterranean',
                        'Mexican','Middle Eastern','Nordic','Southern','Spanish',
                        'Thai','Vietnamese']


  const renderCusineOptions = ()=>{
    
    return infoState.cuisines.map((c, i)=>{
      return (
        <div className={'DataList'} key={`cusine_list_div_${i}`}>
        <input list="cusine_list" placeholder="Chinese" name="myCusine" value={c} onChange={(e)=>handleChange(e, i)} key={`cusine_list_${i}`} />
        <datalist id="cusine_list">
         {cusine_types.map(cusine => <option value={cusine} key={cusine}/>)}
        
        </datalist>
        
        <input
            className={'RemoveBtn'}
            type="button"
            value="X"
            onClick={()=>removeCuisine(i)}
          />
        </div>
      )
    })
    
  }
  const addCusine =()=>{
    setInfoState((prevState) => ({
      ...prevState,
      cuisines: [
        ...prevState.cuisines, 
        ""
      ]
    }));
  }
  const removeCuisine =(i) =>{
    console.log(i)
    let newCusines = [...infoState.cuisines];
    newCusines.splice(i, 1);
    setInfoState({
      ...infoState,
      cuisines: newCusines
    })
  }

  // console.log("ingredState", instructState);
    return (
      
      <form className={'RecipeForm'} onSubmit={handleSubmit}>
      
        <h1>Add a recipe</h1>
        <h5>Recipe Info</h5>
      <div className={'RecipeInfo'}>
        <label for='name'>Name Your Recipe*</label>
        <input
          type="text"
          name="name"
          autoComplete="off"
          placeholder="Chicken fried rice"
          value={name}
          onChange={handleChange}
        />
        <span>{nameFieldCounter}/40</span>
        {/* <label>Portion Type</label>
        <input
          type="text"
          name="portion"
          autoComplete="off"
          value={name}
          onChange={handleChange}
        /> */}
        <label>Cuisine type (max 3)*
          {renderCusineOptions()}
          { infoState.cuisines.length <= 2 ?
        <input 
          className={'Btn'}
          type="button" 
          value="Add a Cusine" 
          onClick={addCusine} />
        :
        <>
          <input className={'Btn'} type="button" value="add cusine" onClick={addCusine} disabled/>
          <span>you've reached maximum number</span>
        </>
         }
        </label>
          
        <label>Time needed*</label>
        <input
          type="number"
          name="duration"
          value={duration}
          onChange={handleChange}
        />
    
        <label>Description</label>
        <textarea
          rows="3"
          name="description"
          value={description}
          onChange={handleChange}
        />
    
      </div>
      
        
        <h5>Ingredients</h5>
          
        {renderIngredient()}
        <input 
          className={'Btn'}
          type="button" 
          value="Add an Ingrediant"
          onClick={addIngredient} />
    
    
        <h5>Instructions</h5>
        {renderInstruction()}
          <input 
            className={'Btn'}
            type="button" 
            value="Add an Instruction" 
            onClick={addInstructions} />
    
  
        <h5>Images and Videos</h5>
        <label className={'FileLabel'}>Choose Images or Videos</label>
        <input 
            id={'FileBtn'}
            type="file" 
            name="file"
            onChange={handleFileUpload}
            accept="image/*, video/*" 
            multiple />
        <div className="FilePreview">
          <p>No files currently selected for upload</p>
        </div>
        {/* <label>Video Upload
          <input type="file" name="video" onChange={handleFileUpload} />
        </label>
            
        <label htmlFor="caption">
          Caption
          <input type="text" name="caption" />
        </label> */}
        {/* <label htmlFor="caption">
        Caption
        <input type="text" name="caption" />
        </label>
        <label htmlFor="image" >
        Upload image
        <input type="file" name="image" accept="image/*" />
        </label> */}
    
        <input className={'SubmitBtn'} type="submit" value="Done" />
      </form>
    )
}

export default RecipeForm