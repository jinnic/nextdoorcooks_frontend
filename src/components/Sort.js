import React from 'react'

const Sort =({handleSetSort })=> {

  const cusineType = ['African', 'American', 'British', 'Cajun', 'Caribbean',
                        'Chinese', 'Eastern', 'European', 'French', 
                        'German','Greek', 'Indian','Irish','Italian','Japanese',
                        'Jewish','Korean','Latin American','Mediterranean',
                        'Mexican','Middle Eastern','Nordic','Southern','Spanish',
                        'Thai','Vietnamese']

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