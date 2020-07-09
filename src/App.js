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

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a,b) => {return b.likes - a.likes})
      setBlogs( blogs )
    })
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

  const updateLikes = (blog) => {
    blog.likes += 1

    blogService
      .update(blog, blog.id)
      .then(() => {
        setErrorMessage('success')
        setTimeout(() => {
          setErrorMessage(null)
        },300)
      })
  }


  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
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


  const blogForm = () => (
    <Toggle buttonLabel = 'Add Blog' ref={blogFormRef}>
      <Blogform
        addBlog = {addBlog}
        newBlog = {newBlog}
        newAuthor = {newAuthor}
        newUrl = {newUrl}
        newLikes = {newLikes}
        handleNewBlog = {({ target }) => setNewBlog(target.value)}
        handleNewAuthor = {({ target }) => setNewAuthor(target.value)}
        handleNewUrl = {({ target }) => setNewUrl(target.value)}
        handleNewLikes = {({ target }) => setNewLikes(target.value)}
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
          {blogForm()}
          <button onClick={() => {window.localStorage.clear(); setUser(null)}}>logout</button>

          {blogs.map(blog =>

            <Blog key={blog.id} blog={blog} updateLikes={updateLikes} setNewLikes={setNewLikes}
              setErrorMessage={setErrorMessage} user={user}/>
          )}

        </div>
      }
    </div>
  )
}

export default App