import React from 'react'

const Person = ({ person, removePerson }) => {
    return (
        <li>
            {person.name}
            &nbsp;
            {person.number}
            &nbsp;
            <button onClick={() => removePerson(person)}>Delete</button>
        </li>
    )
}

export default Person