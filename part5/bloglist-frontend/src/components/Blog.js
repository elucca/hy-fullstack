import React, { useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog, user }) => {
  const [showDetailed, setShowDetailed] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleShowDetailed = () => {
    setShowDetailed(!showDetailed)
  }

  const deleteButton = () => {
    return <button onClick={handleDelete}>Delete</button>
  }

  const handleLike = () => {
    likeBlog(blog)
  }

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to remove ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog)
    }
  }

  if (showDetailed) {
    // Presence of the delete button should really be based on id, not username
    // Requires change to backend to return the id
    return (
      <div style={blogStyle}>
        {blog.title} by {blog.author} &nbsp;
        <button onClick={toggleShowDetailed}>Hide</button>
        <br></br>
        {blog.url} <br></br>
        Likes: {blog.likes} &nbsp;
        <button onClick={handleLike}>Like</button>
        <br></br>
        Added by: {blog.user.name}
        <br></br>
        {user.username === blog.user.username && deleteButton()}
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        {blog.title} by {blog.author} &nbsp;
        <button onClick={toggleShowDetailed}>Show</button>
      </div>
    )
  }
}

export default Blog
