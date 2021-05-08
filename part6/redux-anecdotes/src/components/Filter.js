import React from 'react'
import { connect } from 'react-redux'
import { changeFilter } from '../reducers/filterReducer'

const Filter = props => {
  const handleFilterChange = newFilter => {
    props.changeFilter(newFilter)
  }

  return (
    <div>
      <form>
        Filter &nbsp;
        <input
          value={props.filter}
          onChange={({ target }) => handleFilterChange(target.value)}
        ></input>
      </form>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  changeFilter,
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
