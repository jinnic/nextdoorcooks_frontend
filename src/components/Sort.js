import React from 'react'

//style - material-ui
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const Sort =({handleSetSort, removeFilter })=> {

  const classes = useStyles();

  const handleDelete = (chipToDelete) => () => {
    removeFilter(chipToDelete.label)
    setChipData((chips) => [...chips, chipToDelete])
    setSelectedData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };
 
  const cusineType = ['African', 'American', 'British', 'Cajun', 'Caribbean',
                        'Chinese', 'Eastern', 'European', 'French', 
                        'German','Greek', 'Indian','Irish','Italian','Japanese',
                        'Jewish','Korean','Latin American','Malaysian','Mediterranean',
                        'Mexican','Middle Eastern','Nordic','Southern','Spanish',
                        'Thai','Vietnamese']
  let tempObj = []
  cusineType.map((c,i)=> {
     tempObj.push({"key": i, "label": c })
  })
  const [chipData, setChipData] = React.useState(tempObj);
  const [selectedData, setSelectedData] = React.useState([]);

  const handleSelect = (e,data) => {
    handleSetSort(data.label)
    setSelectedData((prevState) =>
      [...prevState, data]
    )
    setChipData((chips) => chips.filter((chip) => chip.key !== data.key));
    
    // setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    // debugger
  }
  const renderSortInput=()=>{
          // <label>Category</label>
          // <input
          //   list="category_list"
          //   name="category"
          //   value={item.category}
          //   onChange={e=>handleIngredient(e,i)}
          // />
          // <datalist id="category_list">
          //   {category_types.map(category => <option value={category} key={category}/>)}
          // </datalist>
  }
  console.log(selectedData)
  // const renderSortButtons = () =>{

  //   return cusineType.map( cusine => 
  //     <button onClick={handleClick} name={cusine} key={cusine}>{cusine}</button>
  //   )
  // }
  
    return (
      
      <div className={'SortContainer'}>
      {/* <input type="checkbox" name="toggle" id="toggle" multiple /> */}
      <input type="checkbox" name="toggle" id="toggle" multiple />

      {/* <button className={'SvgContainer'}>
      <label for="toggle" className={'OpenClose'}>
        <svg className={'Svg'} focusable="false" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
        </svg>
      </label>
      </button> */}
      <div>
        <button className={'SvgContainer'}>
            <label htmlFor="toggle" className={'OpenClose'}>
              <svg className={'Svg'} focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
              </svg>
            </label>
        </button>
      </div>

      <div className={'AddedSort'}>
      { selectedData !==null && selectedData.length> 0 ? selectedData.map((data) => {
        return (
          <li key={data.label}>
            <Chip
              label={data.label}
              onDelete={handleDelete(data)}
              className={classes.chip}
            />
          </li>
        );
      })
      :""}

      </div>
      
      
      <ul className={'MuiPaper'}>
      {chipData.map((data) => {
        return (
          <li key={data.label}>
            <Chip
              label={data.label}
              onClick={(e)=>handleSelect(e, data)}
              // onDelete={handleDelete(data)}
              deleteIcon={<DoneIcon />}
              className={classes.chip}
            />
          </li>
        );
      })}
    </ul>
        {/* {renderSortButtons()}         */}
        
      </div>
      
    )
}

export default Sort