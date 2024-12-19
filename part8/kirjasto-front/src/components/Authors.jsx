import { useState } from 'react'
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
  const [author, setAuthor] = useState('')
  const [birthYear, setBirthYear] = useState('')

  const authors = props.authors

  const [editAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    console.log(typeof birthYear)
    console.log(birthYear)
    console.log(typeof author)
    console.log(author)
    editAuthor({ variables: { author, birthYear } })

    console.log('update author...')

    setAuthor('')
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
            name
            <input
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
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
