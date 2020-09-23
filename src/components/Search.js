import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      width: '30.5ch',
    },
  }
}));

const Search =({handleSetQuery, query })=> {

  const classes = useStyles();
  // const handleSubmit = e => {
  //   e.preventDefault()
  //   this.props.handleSetQuery(this.state.searchTerm)
  // }

  const handleChange = e => {
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