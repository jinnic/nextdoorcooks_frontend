import React from 'react'

const Sort =({handleSetSort })=> {

  const cusineType = ['a','b','c']

  const handleClick = e => {
    handleSetSort(e)
  }
  
  const renderSortButtons = () =>{

    return cusineType.map( cusine => 
      <button onClick={handleClick} name={cusine} key={cusine}>{cusine}</button>
    )
  }
  
    return (
      <>
        {renderSortButtons()}
      </>
    )
}

export default Sort