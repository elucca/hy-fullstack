import { useState } from 'react'
import Select from 'react-select';
import { gql, useMutation } from '@apollo/client'
import { ALL_AUTHORS } from '../App'

const UPDATE_AUTHOR = gql`
  mutation($author: String!, $birthYear: String!) {
    editAuthor( 
      name: $author,
      setBornTo: $birthYear
    ) {
      name
      born
    }
  }
`

const Authors = (props) => {
  const [birthYear, setBirthYear] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState('');

  const authors = props.authors

  const [editAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    editAuthor({ variables: { author: selectedAuthor.value, birthYear } })

    console.log('update author...')

    setBirthYear('')
  }

  return (
    <div>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <form onSubmit={submit}>
          <h3>Set birth year</h3>
          <div>
            <Select
              defaultValue={selectedAuthor}
              onChange={setSelectedAuthor}
              options={ authors.map(a => ( {value: a.name, label: a.name})) }
            />
          </div>
          <div>
            year
            <input
              value={birthYear}
              onChange={({ target }) => setBirthYear(target.value.toString())}
            />
          </div>
          <button type="submit">update author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
