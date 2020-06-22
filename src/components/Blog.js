import React from 'react'
import Toggle from './Toggle'
import blogService from '../services/blogs'

const Blog = ({ blog, setNewLikes, setErrorMessage }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

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
  

  return (
    <div style={blogStyle}>
      <ul>{blog.title}</ul>
        <Toggle buttonLabel='View'>
          <ul>{blog.author}</ul>
          <ul>{blog.url}</ul>
          <ul>{blog.likes}
            <button onClick={updateLikes}>Like</button>
          </ul>
        </Toggle>
    </div>
  )
}

export default Blog
