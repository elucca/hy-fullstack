import React from 'react'
import Person from './Person'

const NumbersList = ({ persons, searchFilter, removePerson }) => {
  const personsToShow = () => {
    return persons.filter(person => showPerson(person.name) === true)
  }

  const showPerson = (name) => {
    if (name.toLowerCase().includes(searchFilter.toLowerCase())) {
      return true
    }
    return false
  }

  const rows = personsToShow().map(person =>
    <Person
      key={person.name}
      person={person}
      removePerson={removePerson}
    />
  )

  return (
    <ul>
      {rows}
    </ul>
  )
}

export default NumbersList