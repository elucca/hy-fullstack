import React, { useState, useEffect } from 'react'
import NumbersList from './components/NumbersList'
import FilterInput from './components/FilterInput'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setNewSearchFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if (numbersListContains(newName)) {
      alert(`The phonebook already includes ${newName}.`)
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchFilterChange = (event) => {
    setNewSearchFilter(event.target.value)
  }

  const numbersListContains = (name) => {
    return persons.filter(person => person.name === newName).length > 0
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <FilterInput searchfilter={searchFilter}
        handleSearchFilterChange={handleSearchFilterChange} />

      <h2>Add a new number</h2>

      <PersonForm addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      < NumbersList persons={persons} searchFilter={searchFilter} />

    </div >
  )
}

export default App
