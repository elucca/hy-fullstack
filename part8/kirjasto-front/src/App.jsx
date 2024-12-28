import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'
import { gql, useQuery, useApolloClient } from '@apollo/client'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
        born
      }
      published
      genres
    }
  }
`
const GENRE_BOOKS = gql`
  query bookByGenre($genre: String!) {
    allBooks(genre: $genre) {
      title
      author {
        name
        born
      }
      published
      genres
    }
  }
`

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

const USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [loggedIn, setLoggedIn] = useState(false)
  const authorsRes = useQuery(ALL_AUTHORS)
  const userRes = useQuery(USER)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    setLoggedIn(false)
    localStorage.clear()
    client.resetStore()
  }

  if (authorsRes.loading || userRes.loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('recommended')}>recommended</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('login')}>login</button>
        <LogoutButton loggedIn={loggedIn} logout={logout} />
      </div>

      <Authors show={page === 'authors'} authors={authorsRes.data.allAuthors} />

      <Books show={page === 'books'} genreQuery={GENRE_BOOKS} />

      <NewBook show={page === 'add'} />
      
      <Recommended show={page === 'recommended'} genreQuery={GENRE_BOOKS} user={userRes.data.me} />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        mutation={LOGIN}
      />
    </div>
  )
}

const LogoutButton = ({ loggedIn, logout }) => {
  if (!loggedIn) {
    return null
  }
  return <button onClick={logout}>logout</button>
}

export default App
export { ALL_BOOKS, GENRE_BOOKS, ALL_AUTHORS }
