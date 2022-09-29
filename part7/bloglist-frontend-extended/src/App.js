import React, { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import Blog from "./components/Blog"

import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import BlogForm from "./components/BlogForm"

import blogService from "./services/blogs"
import loginService from "./services/login"

import { useDispatch } from "react-redux"
import { changeNotification } from "./reducers/notificationReducer"
import { addBlog, initializeBlogs, removeBlog } from "./reducers/blogsReducer"
import { setUser } from "./reducers/userReducer"

const App = () => {
  const dispatch = useDispatch()

  const sortBlogs = (blogsToSort) => {
    return blogsToSort.sort((a, b) => (a.likes < b.likes ? 1 : -1))
  }

  const blogs = useSelector(state => sortBlogs(state.blogs))
  const user = useSelector(state => state.user)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(initializeBlogs(sortBlogs(blogs))))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user))
      blogService.setToken(user.token)

      dispatch(setUser(user))
      setUsername("")
      setPassword("")
    } catch (exception) {
      console.log(exception)
      dispatch(changeNotification("Invalid username or password", 4000))
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem("loggedBloglistUser")
    dispatch(setUser(null))
  }

  const createBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()

    const createdBlog = await blogService.create(newBlog)
    dispatch(addBlog(createdBlog))

    dispatch(
      changeNotification(
        `Added new blog: ${newBlog.title} by ${newBlog.author}`,
        4000
      )
    )
  }

  const deleteBlog = async (blogToDelete) => {
    try {
      await blogService.remove(blogToDelete)
      dispatch(
        changeNotification(`Removed blog: "${blogToDelete.title}".`, 4000)
      )
      dispatch(removeBlog(blogToDelete))
    } catch {
      dispatch(
        changeNotification(
          `Cannot remove blog: "${blogToDelete.title}" belongs to another user.`,
          4000
        )
      )
    }
  }
  

  const likeBlog = async (blogToUpdate) => {
    const updatedBlog = {
      id: blogToUpdate.id,
      user: blogToUpdate.user,
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes + 1,
    }

    await blogService.update(updatedBlog)

    // Janky bad state update
    const newBlogs = blogs.filter((blog) => blog.id !== blogToUpdate.id)
    newBlogs.push(updatedBlog)
    dispatch(initializeBlogs(newBlogs))
  }

  const loginForm = () => {
    return (
      <div id="login-form">
        <h2>Login</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            Username &nbsp;
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>

          <div>
            Password &nbsp;
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>

          <button id="login-button" type="submit">
            Login
          </button>
        </form>
      </div>
    )
  }

  const blogList = () => {
    return (
      <div>
        <h2>Blogs</h2>
        <p>Logged in as {user.name} &nbsp;</p>
        <Notification />
        <button onClick={() => handleLogout()}>Logout</button>
        {blogForm()}
        <div id="blog-list">
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              likeBlog={likeBlog}
              deleteBlog={deleteBlog}
              loggedInUser={user}
            />
          ))}
        </div>
      </div>
    )
  }

  const blogForm = () => (
    <Togglable buttonLabel="Add blog" ref={blogFormRef}>
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
