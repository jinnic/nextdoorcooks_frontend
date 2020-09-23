import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {UPDATE_RECIPE} from '../../store/recipe/types'
import {updateRecipe} from '../../api'
import {updateImageDisplay} from './File'


const RecipeEditForm =({recipe, setEditRecipe})=> {
  const {id, name, cuisines, duration, description, ingredients, instructions, items} = recipe
  const currentUser = useSelector(state=>state.user.currentUser)
  const dispatch = useDispatch()
  const [nameFieldCounter,setNameCounter] = useState(name.length)

  const [infoState, setInfoState] = useState({
    id: id,
    name: name,
    duration: duration,
    description: description,
    cuisines: cuisines
   })

  const [ingredState, setIngredients] = useState({
    ingredients: [...ingredients]
  })

  const [instructState, setInstructions] = useState({
    instructions: [...instructions]
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
  
  const handleInstruction = (e, i) =>{
    // console.log(e, i);
    
    let key = e.target.name
    let instructions = [...instructState.instructions];
    
    
    if(key === "ingredients"){
      // debugger
      let ingrediant = ingredState.ingredients.find(ingred => ingred.name === e.target.value )
      instructions[i][key] = {...ingrediant}
      setInstructions({ instructions });
      // selectIngredientAmount(e.target.value)
    }else{
      instructions[i][key] = e.target.value
      setInstructions({ instructions });
    }
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
        </div>
      )
    })
  }

  const measurements = ['n/a', 'drop','pinch', 'dash','teaspoon','tablespoon', 'ounce', 'pounds', 'cup', 'pint', 'quart', 'gallon']
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
          name: "", 
          amount: 0,
          measurement:"n/a"
        }
      ]
    }));
    // let instructions = [...instructState.instructions];
    // instructions[0]['ingredients'] = {...ingredState.ingredients[0]}
    // setInstructions({ instructions });
  }

  const removeIngrediant =(i) =>{
    console.log(i)
    let ingredients = [...ingredState.ingredients];
    ingredients.splice(i, 1);
    setIngredients({ ingredients });
  }
  // const {name, duration, description} = infoState
  
  
  const handleChange = (e, i)=> {
    if(e.target.name === 'name'){
      setNameCounter(e.target.value.length)
    }
    
    if(e.target.name ==='myCusine'){
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
    
  }

  /**FILE */
  
  const [newFileState, setNewFileState] = useState({items: []})
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
    setNewFileState((prevState) => ({
      ...prevState,
      items: items
    }))
  }

  //render existing images
  const [fileState, setFileState] = useState({items: items})
  useEffect(() => {
    renderImageDisplay(fileState)
  }, [fileState])


  const renderImageDisplay=(fileState)=> {
    const preview = document.querySelector('.FilePreview');
  
    const curFiles = fileState;
    if(curFiles.length === 0) {
      const para = document.createElement('p');
      para.textContent = 'No files currently selected for upload';
      preview.appendChild(para);
    } else {
      const para = document.createElement('p');
      para.textContent = 'Previously uploaded Images/Videos';
      preview.appendChild(para)

      const list = document.createElement('ol');
      preview.appendChild(list);
      
      for(const file of items) {
        const listItem = document.createElement('li');
        const para = document.createElement('p');
        
        para.textContent = `File name ${file.caption}`;
        const image = document.createElement('img');
        image.src = file.image

        listItem.appendChild(image);
        listItem.appendChild(para);  
        list.appendChild(listItem);
      }
    }
  }

  /**CUISINE */
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

  const handleSubmit = e => {
    e.preventDefault()
    const form = new FormData() 
    newFileState.items.forEach((item,i) => {
      form.append(`items[${i}]`, item)
    })
    form.append("imageable_type", "Recipe")
    form.append("imageable_id", recipe.id)
    form.append("user_id", currentUser.id)
    
    fetch("https://nextdoorcooks-api.herokuapp.com/items", {
            method: "POST",
            body: form
          })
            .then(r => r.json())
            .then(recipe => dispatch({type: UPDATE_RECIPE, payload: recipe}))

    const updatedRecipe = {
      ...infoState,
      ...ingredState,
      ...instructState,
      user_id: currentUser.id
    }

    // console.log('original recipe :', recipe)
    // console.log('updated recipe : ', updatedRecipe)
    // form.append("recipe", JSON.stringify(updatedRecipe))
    
    updateRecipe(updatedRecipe)
      .then(recipe => dispatch({type: UPDATE_RECIPE, payload: recipe}))
      //recipe => dispatch({type: UPDATE_RECIPE, payload: recipe})
    // then update that user in state in our App component
    setEditRecipe(false)
  }
  
    return (
      <form className={'RecipeForm'} onSubmit={handleSubmit}>
      
        <h1>Edit your recipe</h1>
        <h5>Recipe Info</h5>
      <div className={'RecipeInfo'}>
        <label htmlFor='name'>Name Your Recipe*</label>
        <input
          type="text"
          name="name"
          autoComplete="off"
          placeholder="Chicken fried rice"
          value={infoState.name}
          onChange={handleChange}
        />
        <span>{nameFieldCounter}/40</span>
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
          value={infoState.duration}
          onChange={handleChange}
        />
    
        <label>Description</label>
        <textarea
          rows="3"
          name="description"
          value={infoState.description}
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
        </div>
        <input className={'SubmitBtn'} type="submit" value="Done" />
      </form>
    )
}

export default RecipeEditForm