import React, { useState, useEffect } from 'react'
import axios from 'axios'

import PersonsList from './components/PersonsList'
import FilterInput from './components/FilterInput'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setNewSearchFilter] = useState('')

  useEffect(() => {
    personService.getAll()
      .then(returnedPersons => {
        setPersons(returnedPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (personsListContains(newName)) {
      alert(`The phonebook already includes ${newName}.`)
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    personService.create(newPerson)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))
        setNewName('')
        setNewNumber('')
      })
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

  const personsListContains = (name) => {
    return persons.filter(person => person.name.toLowerCase() === newName.toLowerCase()).length > 0
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
      < PersonsList persons={persons} searchFilter={searchFilter} />

    </div >
  )
}

export default App
