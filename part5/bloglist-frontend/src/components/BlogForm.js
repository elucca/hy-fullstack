import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes] = useState('')

  const addBlog = event => {
    event.preventDefault()

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes,
    }

    createBlog(newBlog)
    
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    setNewLikes('')
  }

  return (
    <form onSubmit={addBlog}>
      <h3>Add blog</h3>
      <div>
        Title &nbsp;
        <input
          value={newTitle}
          onChange={({ target }) => setNewTitle(target.value)}
        />
      </div>

      <div>
        Author &nbsp;
        <input
          value={newAuthor}
          onChange={({ target }) => setNewAuthor(target.value)}
        />
      </div>

      <div>
        URL &nbsp;
        <input
          value={newUrl}
          onChange={({ target }) => setNewUrl(target.value)}
        />
      </div>

      <div>
        Likes &nbsp;
        <input
          value={newLikes}
          onChange={({ target }) => setNewLikes(target.value)}
        />
      </div>
      <button type='submit'>Add</button>
    </form>
  )
}

export default BlogForm
