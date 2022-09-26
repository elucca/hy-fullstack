import React, { useState } from "react"
import PropTypes from "prop-types"

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState("")
  const [newAuthor, setNewAuthor] = useState("")
  const [newUrl, setNewUrl] = useState("")
  const [newLikes, setNewLikes] = useState("")

  const addBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes,
    }

    createBlog(newBlog)

    setNewTitle("")
    setNewAuthor("")
    setNewUrl("")
    setNewLikes("")
  }

  return (
    <form onSubmit={addBlog} id="form">
      <h3>Add blog</h3>
      <div>
        Title &nbsp;
        <input
          id="title"
          value={newTitle}
          onChange={({ target }) => setNewTitle(target.value)}
        />
      </div>

      <div>
        Author &nbsp;
        <input
          id="author"
          value={newAuthor}
          onChange={({ target }) => setNewAuthor(target.value)}
        />
      </div>

      <div>
        URL &nbsp;
        <input
          id="url"
          value={newUrl}
          onChange={({ target }) => setNewUrl(target.value)}
        />
      </div>

      <div>
        Likes &nbsp;
        <input
          id="likes"
          value={newLikes}
          onChange={({ target }) => setNewLikes(target.value)}
        />
      </div>
      <button id="submit-blog-button" type="submit">
        Add
      </button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
