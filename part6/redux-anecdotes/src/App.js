import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote, addAnecdote } from './reducers/anecdoteReducer'

const App = () => {

  const sortByVotes = (anecdotes) => {
    return anecdotes.sort((a, b) => (a.votes < b.votes ? 1 : -1))
  }

  const anecdotes = useSelector(state => sortByVotes(state))
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  const add = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    dispatch(addAnecdote(anecdote))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={add}>
        <div><input name="anecdote" /></div>
        <button type="submit" >create</button>
      </form>
    </div>
  )
}

export default App