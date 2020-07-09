import React, { useState } from 'react'

const Blogform = ({ addBlog }) => {
  const [newBlog, setNewBlog] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newLikes, setNewLikes] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addingNewBlog = (event) => {
    event.preventDefault()
    const blogObject ={
      title: newBlog,
      author: newAuthor,
      url: newUrl,
      likes: newLikes
    }

    addBlog(blogObject)
    setNewBlog('')
    setNewAuthor('')
    setNewUrl('')
    setNewLikes('')
  }

  return (
    <div>
      <h3>Create new Blog entry</h3>
      <form onSubmit={addingNewBlog}>
        <div>
        Blog
          <input
            id='blog'
            type='text'
            value = {newBlog}
            onChange = {({ target }) => setNewBlog(target.value)}
            name = 'Blog'
          />
        </div>
        <div>
        Author
          <input
            id='author'
            type='text'
            value = {newAuthor}
            onChange = {({ target }) => setNewAuthor(target.value)}
            name = 'Author'
          />
        </div>
        <div>
        URL
          <input
            id='url'
            type='text'
            value = {newUrl}
            onChange = {({ target }) => setNewUrl(target.value)}
            name = 'URL'
          />
        </div>
        <div>
        Likes
          <input
            id='likes'
            type='text'
            value = {newLikes}
            onChange = {({ target }) => setNewLikes(target.value)}
            name = 'Likes'
          />
        </div>
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default Blogform