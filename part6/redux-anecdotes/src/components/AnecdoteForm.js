
import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    dispatch(addAnecdote(anecdote))
  }

  return (
    <form onSubmit={add}>
      <div><input name="anecdote" /></div>
      <button type="submit" >create</button>
    </form>
  )
}

export default AnecdoteForm