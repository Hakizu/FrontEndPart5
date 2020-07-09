import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './Blogform'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const mockHandler = jest.fn()

  const component = render(
    <BlogForm addBlog={mockHandler} />
  )

  const blog = component.container.querySelector('#blog')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(blog, {
    target: { value: 'Jest' }
  })
  fireEvent.change(author, {
    target: { value: 'haki' },
  })
  fireEvent.change(url, {
    target: { value: 'jest.org' },
  })

  fireEvent.submit(form)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].blog).toBe('Jest')
  expect(mockHandler.mock.calls[0][0].author).toBe('haki')
  expect(mockHandler.mock.calls[0][0].url).toBe('jest.org')
})