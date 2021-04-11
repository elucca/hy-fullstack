import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeFilter } from '../reducers/filterReducer'

const Filter = () => {
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const handleFilterChange = newFilter => {
    dispatch(changeFilter(newFilter))
  }

  return (
    <div>
      <form>
        Filter &nbsp;
        <input
          value={filter}
          onChange={({ target }) => handleFilterChange(target.value)}
        ></input>
      </form>
    </div>
  )
}

export default Filter
