import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'

import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(sortBlogs(blogs)))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const sortBlogs = blogsToSort => {
    // Should just use this to set state and never call that anywhere so I wouldn't
    // need to manually remember to sort every time I change the blogs array.
    return blogsToSort.sort((a, b) => (a.likes < b.likes ? 1 : -1))
  }

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('Invalid username or password')
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const createBlog = async newBlog => {
    blogFormRef.current.toggleVisibility()

    const createdBlog = await blogService.create(newBlog)
    setBlogs(sortBlogs(blogs.concat(createdBlog)))

    setNotification(`Added new blog: ${newBlog.title} by ${newBlog.author}`)
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const deleteBlog = async blogToDelete => {
    try {
      await blogService.remove(blogToDelete)
      setNotification(`Removed blog: "${blogToDelete.title}".`)
      setBlogs(sortBlogs(blogs.filter(blog => blog.id !== blogToDelete.id)))
    } catch {
      setNotification(`Cannot remove blog: "${blogToDelete.title}" belongs to another user.`)
    }
  }

  const likeBlog = async blogToUpdate => {
    const updatedBlog = {
      id: blogToUpdate.id,
      user: blogToUpdate.user,
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes + 1,
    }

    await blogService.update(updatedBlog)

    // janky update to displayed blog
    const newBlogs = blogs.filter(blog => blog.id !== blogToUpdate.id)
    setBlogs(sortBlogs(newBlogs.concat(updatedBlog)))
  }

  const loginForm = () => {
    return (
      <div>
        <h2>Login</h2>
        <Notification message={notification} />
        <form onSubmit={handleLogin}>
          <div>
            Username &nbsp;
            <input
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>

          <div>
            Password &nbsp;
            <input
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>

          <button type='submit'>Login</button>
        </form>
      </div>
    )
  }

  const blogList = () => {
    return (
      <div>
        <h2>Blogs</h2>
        <p>Logged in as {user.name} &nbsp;</p>
        <Notification message={notification} />
        <button onClick={() => handleLogout()}>Logout</button>
        {blogForm()}
        {blogs.map(blog => (
          <Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} user={user} />
        ))}
      </div>
    )
  }

  const blogForm = () => (
    <Togglable buttonLabel='Add blog' ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )

  return (
    <div>
      {user === null && loginForm()}
      {user !== null && blogList()}
    </div>
  )
}

export default App
