import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newLikes, setNewLikes] = useState('')
  const [newUrl, setNewUrl] = useState('')
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
      )  
    }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
    
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit = {handleLogin}>
      <div>
        Username
          <input
          type = 'text'
          value = {username}
          name = 'Username'
          onChange = {({ target }) => setUsername(target.value)}
          />
      </div>
      <div>
        Password
          <input
          type = 'password'
          value = {password}
          name = 'Password'
          onChange = {({ target }) => setPassword(target.value)}
          />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog,
      author: newAuthor,
      url: newUrl,
      likes: newLikes
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog('')
        setNewAuthor('')
        setNewUrl('')
        setNewLikes('')
      })
  }

  const handleBlogChange = (event) => {
    setNewBlog(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }
  const handleLikesChange = (event) => {
    setNewLikes(event.target.value)
  }

  const blogForm = () => (
    <form onSubmit={addBlog}>
    <div>
      Blog
      <input
        value = {newBlog}
        onChange = {handleBlogChange}
        name = 'Blog'
      />
    </div>
    <div>
      Author
      <input
        value = {newAuthor}
        onChange = {handleAuthorChange}
        name = 'Author'
      />
    </div>
    <div>
      URL
      <input
        value = {newUrl}
        onChange = {handleUrlChange}
        name = 'URL'
      />      
    </div>
    <div>
      Likes
      <input
        value = {newLikes}
        onChange = {handleLikesChange}
        name = 'Likes'
      />       
    </div>
    <button type='submit'>save</button>
    </form>
  )

  return (
    <div>
      <div>
        {errorMessage}
      </div>
      <h2>blogs</h2>

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in </p>

          <button onClick={() => {window.localStorage.clear(); setUser(null)}}>logout</button>

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
          {blogForm()}
        </div>
      }
    </div>
  )
}

export default App