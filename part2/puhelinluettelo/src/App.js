import React, { useState, useEffect } from 'react'

import PersonsList from './components/PersonsList'
import FilterInput from './components/FilterInput'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setNewSearchFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService.getAll()
      .then(returnedPersons => {
        setPersons(returnedPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (personsListContains(newName)) {
      let choice = window.confirm(`The phonebook already includes ${newName}. Replace the old number with the new one?`)
      if (choice) {
        updateNumber(newPerson)
      }
      return
    }

    personService.create(newPerson)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))
        setNewName('')
        setNewNumber('')

        notify(`Added ${newPerson.name}.`, 2500)
      })
      .catch(error => {
        notify(error.response.data.error, 5000)
      })
  }

  const removePerson = (person) => {
    let choice = window.confirm(`Are you sure you want to remove ${person.name}?`)

    if (choice) {
      personService.remove(person)
        .then(setPersons(persons.filter(p => p.name !== person.name)))

      notify(`Removed ${person.name}.`, 2500)
    }
  }

  const updateNumber = (updatedPerson) => {
    let toUpdate = persons.find(p => p.name.toLowerCase() === updatedPerson.name.toLowerCase())

    if (toUpdate) {
      personService.replaceWith(updatedPerson)
        .then(() => {
          setPersons(persons.map(p => p.name === toUpdate.name ? updatedPerson : p))
          notify(`Updated ${updatedPerson.name}'s phone number.`, 2500)
        }
        ).catch(() => {
          notify(`Error: ${toUpdate.name} was already removed.`, 2500)
          // Remove the erraneous person that no longer exists from the list
          setPersons(persons.filter(p => p.name !== toUpdate.name))
        })
    }
  }

  const notify = (message, duration) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, duration)
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
    return persons.filter(person => person.name.toLowerCase() === name.toLowerCase()).length > 0
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification message={notification} />

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
      < PersonsList persons={persons} searchFilter={searchFilter} removePerson={removePerson} />
    </div >
  )
}

export default App
