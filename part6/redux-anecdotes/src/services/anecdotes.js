import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (anecdote) => {
  const object = {content: anecdote, votes: 0}
  const response = await axios.post(baseUrl, object)
  return response.data
}

const update = async (anecdote) => {
  const url = baseUrl + `/${anecdote.id}`
  const response = await axios.put(url, anecdote)
  return response.data
} 

export default { getAll, create, update }
