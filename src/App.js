import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Loginform from './components/Loginform'
import Toggle from './components/Toggle'
import Blogform from './components/Blogform'

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
    <Toggle buttonLabel='Login'>
      <Loginform
        username = {username}
        password = {password}
        handleUsernameChange = {({ target }) => setUsername(target.value)}
        handlePasswordChange = {({ target }) => setPassword(target.value)}
        handleSubmit = {handleLogin}
      />
    </Toggle>
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
        setTimeout(() => {
          setErrorMessage(`${newBlog} by ${newAuthor} created`)
        }, 7000)
      })
  }

  const blogForm = (event) => (
    <Toggle buttonLabel = 'Add Blog'>
      <Blogform 
        addBlog = {addBlog}
        newBlog = {newBlog}
        newAuthor = {newAuthor}
        newUrl = {newUrl}
        newLikes = {newLikes}
        handleNewBlog = {({ targe }) => setNewBlog(event.target.value)}
        handleNewAuthor = {({ target }) => setNewAuthor(event.target.value)}
        handleNewUrl = {({ target }) => setNewUrl(event.target.value)}
        handleNewLikes = {({ target }) => setNewLikes(event.target.value)}
      />
    </Toggle>
  )

  return (
    <div>
      <div>
        <Notification message = {errorMessage}/>
      </div>
      <h2>blogs</h2>

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in </p>

          <button onClick={() => {window.localStorage.clear(); setUser(null)}}>logout</button>

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} setNewLikes={setNewLikes}
              setErrorMessage={setErrorMessage}/>
          )}
          {blogForm()}
        </div>
      }
    </div>
  )
}

export default App