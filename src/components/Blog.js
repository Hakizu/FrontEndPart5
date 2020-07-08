import React from 'react'
import Toggle from './Toggle'
import blogService from '../services/blogs'


const Blog = ({ blog, setNewLikes, setErrorMessage, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const visible = blog.user[0].username === user
  const showDeleteForUser = { display : visible ? 'none' : '' }

  const updateLikes = () => {
    blog.likes += 1
    setNewLikes(blog.likes)

    blogService
      .update(blog, blog.id)
      .then(() => {
        setErrorMessage('success')
        setTimeout(() => {
          setErrorMessage(null)
        },5000)
      })
  }

  const removeBlog = () => {
    if (window.confirm(`Do you want to delete ${blog.title}`)) {
      blogService
        .remove(blog.id)
        .then(() => {
          setErrorMessage('success')
          setTimeout(() => {
            setErrorMessage(null)
          },5000)
        })
    }
  }

  return (
    <div style={blogStyle}>
      <div className='blog'>{blog.title}
        <Toggle buttonLabel='View'>
          <ul className='author'>{blog.author}</ul>
          <ul className='url'>{blog.url}</ul>
          <ul className='likes'>{blog.likes}
            <button onClick={updateLikes}>Like</button>
          </ul>
          <div style={showDeleteForUser}>
            <button onClick={removeBlog}>Delete Note</button>
          </div>
        </Toggle>
      </div>
    </div>
  )
}

export default Blog
