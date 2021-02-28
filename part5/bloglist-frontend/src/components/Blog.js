import React, { useState } from 'react'

const Blog = ({ blog, likeBlog }) => {
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

  const handleLike = () => {
    likeBlog(blog)
  }

  if (showDetailed) {
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
