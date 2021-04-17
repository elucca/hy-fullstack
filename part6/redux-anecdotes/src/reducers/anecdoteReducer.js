const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return state.concat(action.data.newAnecdote)
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find((anecdote) => anecdote.id === id)
      const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
      return state.map(anecdote => anecdote.id === id ? changedAnecdote : anecdote)
    case 'INIT':
      return action.data
    default:
      return state
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const addAnecdote = (anecdote) => {
  const newAnecdote = asObject(anecdote)
  return {
    type: 'NEW_ANECDOTE',
    data: { newAnecdote }
  }
}

export const initAnecdotes = (anecdotes) => {
  return {
    type: 'INIT',
    data: anecdotes
  }
}

export default anecdoteReducer