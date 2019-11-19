import React from 'react'
import Person from './Person'

const NumbersList = ({ persons }) => {
  const rows = persons.map(person =>
    <Person
      key={person.name}
      person={person}
    />
  )

  return (
    <ul>
      {rows}
    </ul>
  )
}

export default NumbersList