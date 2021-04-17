
import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'
import { changeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    await anecdoteService.create(anecdote)
    dispatch(addAnecdote(anecdote))
    dispatch(changeNotification(`Added \"${anecdote}"\.`))

    setTimeout(() => {
      dispatch(changeNotification(''))
    }, 5000);
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div><input name="anecdote" /></div>
        <button type="submit" >create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm