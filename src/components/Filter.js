import React from 'react'
import Search from './Search'
import Sort from './Sort'


const Filter = ({query, handleSetQuery, handleSetSort, removeFilter}) => {
  return (
     <div key={'filter'} className={'Filter'}>
        <Search  query={query} handleSetQuery={handleSetQuery} key={'search'} />
        <Sort className={'SortContainer'} key={'sort'} handleSetSort={handleSetSort} removeFilter={removeFilter}/>
      </div>
    )
}

export default Filter