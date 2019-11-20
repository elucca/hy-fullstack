import React from 'react'

const FilterInput = ({searchFilter, handleSearchFilterChange}) => {
  return (
    <div>
      Filter shown with&nbsp;
      <input
        value={searchFilter}
        onChange={handleSearchFilterChange}
      />
    </div>

  )
}

export default FilterInput