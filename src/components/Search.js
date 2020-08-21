import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      // margin: theme.spacing(1),
      width: '30.5ch',
    },
  }
}));

const Search =({handleSetQuery, query })=> {
  // state = {
  //   searchTerm: ""
  // }
  const classes = useStyles();
  const handleSubmit = e => {
    e.preventDefault()
    this.props.handleSetQuery(this.state.searchTerm)
    
  }

  const handleChange = e => {
    // this.setState({ searchTerm: e.target.value },
    //   ()=>{
    //     this.props.handleSetQuery(this.state.searchTerm)
    //   })

    handleSetQuery(e)
  }
  
  
  
    return (
      <form className={classes.root} noValidate autoComplete="off">
        <TextField 
          id="standard-basic" 
          label="Search by Name"
          key='search'
          type="text"
          name="searchTerm"
          autoComplete="off"
          value={query}
          onChange={handleChange}
          />
      </form>
      
    )
}

export default Search

{/* <form className="SearchBar" >
  <label>Search</label>
  <input
    key='search'
    type="text"
    name="searchTerm"
    placeholder="Search..."
    autoComplete="off"
    value={query}
    onChange={handleChange}
  />
</form>  */}