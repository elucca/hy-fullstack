import React, { useState } from 'react'
import NumbersList from './components/NumbersList'

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

      <div>
        Filter shown with&nbsp;
        <input
          value={searchFilter}
          onChange={handleSearchFilterChange}
        />
      </div>

      <h2>Add a new number</h2>

      <form onSubmit={addPerson}>
        <div>

          <div>
            name:
          <input
              value={newName}
              onChange={handleNameChange}
            />
          </div>

          <div>number:
            <input
              value={newNumber}
              onChange={handleNumberChange}
            />
          </div>

        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      < NumbersList persons={persons} searchFilter={searchFilter} />

    </div>
  )
}

export default App
