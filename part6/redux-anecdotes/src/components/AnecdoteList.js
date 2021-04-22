import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { changeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const sortByVotes = anecdotes => {
    return anecdotes.sort((a, b) => (a.votes < b.votes ? 1 : -1))
  }

  const filterAnecdotes = (anecdotes, filter) => {
    return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  }

  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => sortByVotes(filterAnecdotes(state.anecdotes, filter)))

  const vote = anecdote => {
    dispatch(voteAnecdote(anecdote))
    dispatch(changeNotification(`You voted for \"${anecdote.content}\"`, 5000))
  }

  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
