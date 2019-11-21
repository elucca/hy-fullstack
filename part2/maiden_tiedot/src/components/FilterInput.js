import React from 'react'

const FilterInput = ({searchFilter, handleSearchFilterChange}) => {
  return (
    <div>
      Find countries&nbsp;
      <input
        value={searchFilter}
        onChange={handleSearchFilterChange}
      />
    </div>

  )
}

export default FilterInput