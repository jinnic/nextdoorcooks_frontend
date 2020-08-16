import React from 'react'

const Search =({handleSetQuery,query })=> {
  // state = {
  //   searchTerm: ""
  // }

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
      <form className="search" >
        <input
        key='search'
          type="text"
          name="searchTerm"
          placeholder="Search..."
          autoComplete="off"
          value={query}
          onChange={handleChange}
        />
     </form>
    )
}

export default Search