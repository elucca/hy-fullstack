import React, { useState } from 'react'
import NumbersList from './components/NumbersList'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  const numbersListContains = (name) => {
    return persons.filter(person => person.name === newName).length > 0
  }

  return (
    <div>
      <h2>Phonebook</h2>

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
      < NumbersList persons={persons} />

    </div>
  )
}

export default App
