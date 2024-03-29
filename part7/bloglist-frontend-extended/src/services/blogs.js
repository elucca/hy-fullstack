import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  console.log("response: ", response.data)
  return response.data
}

const update = async (blog) => {
  const url = baseUrl + `/${blog.id}`
  const response = await axios.put(url, blog)
  return response.data
}

const remove = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  const url = baseUrl + `/${blog.id}`
  const response = await axios.delete(url, config)
  return response.data
}

const blogOperations = { getAll, create, setToken, update, remove }

export default blogOperations
