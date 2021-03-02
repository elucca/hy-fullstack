import React, { Component } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from '../components/Blog'

test('blog renders properly in default non-detailed mode', () => {
  const blog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: {},
  }

  const component = render(
    <Blog blog={blog} likeBlog={jest.fn()} deleteBlog={jest.fn()} />
  )

  expect(component.container).toHaveTextContent('Canonical string reduction')
  expect(component.container).toHaveTextContent('Edsger W. Dijkstra')
  expect(component.container).not.toHaveTextContent(
    'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
  )
  expect(component.container).not.toHaveTextContent('12')
})
