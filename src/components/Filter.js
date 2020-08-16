import React from 'react'
import Search from './Search'
import Sort from './Sort'


const Filter = ({query, handleSetQuery, handleSetSort}) => {
  return (
     <div key={'filter'} className={'Filter'}>
        <Search query={query} handleSetQuery={handleSetQuery} key={'search'} />
        <Sort key={'sort'} handleSetSort={handleSetSort}/>
      </div>
    )
}

export default Filter