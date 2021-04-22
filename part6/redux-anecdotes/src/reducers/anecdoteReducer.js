import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'VOTE':
      const changedAnecdote = action.data.upvotedAnecdote // why is this not just action.data?
      return state.map(anecdote =>
        anecdote.id === changedAnecdote.id ? changedAnecdote : anecdote
      )
    case 'INIT':
      return action.data
    default:
      return state
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const upvotedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }
    await anecdoteService.update(upvotedAnecdote)
    dispatch({ type: 'VOTE', data: { upvotedAnecdote } })
  }
}

export const addAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(anecdote)
    dispatch({ type: 'NEW_ANECDOTE', data: newAnecdote })
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({ type: 'INIT', data: anecdotes })
  }
}

export default anecdoteReducer
