import React, { useState } from 'react'

const Blog = ({ blog }) => {
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

  if (showDetailed) {
    return (
      <div style={blogStyle}>
        {blog.title} by {blog.author} &nbsp;
        <button onClick={toggleShowDetailed}>Hide</button>
        <br></br>
        {blog.url} <br></br>
        Likes: {blog.likes} &nbsp;
        <button>Like</button>
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
