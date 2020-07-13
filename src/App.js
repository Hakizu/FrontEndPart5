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

  const blogFormRef = React.createRef()

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService
        .create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setTimeout(() => {
        setErrorMessage(`${newBlog} by ${newAuthor} created`)
      }, 7000)
    } catch (error) {
      setErrorMessage(error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <div>
        <Notification message = {errorMessage}/>
      </div>
      <h2>blogs</h2>

      {user === null ?
        (<Loginform
          username = {username}
          password = {password}
          handleUsernameChange = {({ target }) => setUsername(target.value)}
          handlePasswordChange = {({ target }) => setPassword(target.value)}
          handleSubmit = {handleLogin} />
        ) : (
          <div>
            <p>{user.name} logged in </p>
            <button onClick={() => {window.localStorage.clear(); setUser(null)}}>logout</button>
            <Toggle buttonLabel='Post new blog' id='newBlogButton' ref={blogFormRef}>
              <h2>Create new entry</h2>
              <Blogform
                addBlog={addBlog}
              />
            </Toggle>
            <div className='allBlogs'>
              {blogs.map(blog => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  updateLikes={updateLikes}
                  setNewLikes={setNewLikes}
                  setErrorMessage={setErrorMessage}
                  user={user}
                />
              ))}
            </div>
          </div>
        )}
    </div>
  )
}

export default App