import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      }
      return state.map(anecdote =>
        anecdote.id === id ? changedAnecdote : anecdote
      )
    case 'INIT':
      return action.data
    default:
      return state
  }
}

export const voteAnecdote = id => {
  return {
    type: 'VOTE',
    data: { id },
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
