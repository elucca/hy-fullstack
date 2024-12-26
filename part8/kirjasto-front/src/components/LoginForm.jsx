import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'

const LoginForm = ({ show, setToken, loggedIn, setLoggedIn, mutation }) => {
  if (!show || loggedIn) {
    return null
  }

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(mutation)

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setLoggedIn(true)
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data])

  const submit = async event => {
    event.preventDefault()
    login({ variables: { username, password } })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username{' '}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{' '}
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm
