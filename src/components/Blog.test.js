import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    user: [{
      username: 'testUser',
      name: 'tester'
    }],
    title: 'new Blog',
    author: 'new Author',
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'new Blog'
  )
})