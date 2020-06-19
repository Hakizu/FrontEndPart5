import React from 'react'
import Toggle from './Toggle'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      <ul>{blog.title}</ul>
        <Toggle buttonLabel='View'>
          <ul>{blog.author}</ul>
          <ul>{blog.url}</ul>
          <ul>{blog.likes}
            <button>Like</button>
          </ul>
        </Toggle>
    </div>
  )
}

export default Blog
