import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import Toggle from './Toggle'

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


describe('<Toggle />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Toggle buttonLabel='View...'>
        <div className='testDiv' />
      </Toggle>
    )
  })

  test('render its children', () => {
    expect(
      component.container.querySelector('.testDiv')
    ).toBeDefined()
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.toggleSelector')

    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('View...')
    fireEvent.click(button)

    const div = component.container.querySelector('.toggleSelector')
    expect(div).not.toHaveStyle('display: none')
  })
})