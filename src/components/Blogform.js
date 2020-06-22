import React from 'react'

const Blogform = ({
  addBlog,
  newBlog,
  newAuthor,
  newUrl,
  newLikes,
  handleNewBlog,
  handleNewAuthor,
  handleNewUrl,
  handleNewLikes,
}) => {

  const addingNewBlog = (event) => {
    event.preventDefault()
    addBlog({    
      title: newBlog,
      author: newAuthor,
      url: newUrl,
      likes: newLikes
    })
  }

  return (
    <div>
      <h3>Create new Blog entry</h3>
      <form onSubmit={addingNewBlog}>
      <div>
        Blog
        <input
          value = {newBlog}
          onChange = {handleNewBlog}
          name = 'Blog'
        />
      </div>
      <div>
        Author
        <input
          value = {newAuthor}
          onChange = {handleNewAuthor}
          name = 'Author'
        />
      </div>
      <div>
        URL
        <input
          value = {newUrl}
          onChange = {handleNewUrl}
          name = 'URL'
        />      
      </div>
      <div>
        Likes
        <input
          value = {newLikes}
          onChange = {handleNewLikes}
          name = 'Likes'
        />       
      </div>
      <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default Blogform