import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const user = {
      username: 'user',
      name: 'Name',
      id: '600d7ee8d3d4ef7e50c2b6c7',
    }

    const blog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      user: user,
    }

    component = render(
      <Blog blog={blog} likeBlog={jest.fn()} deleteBlog={jest.fn()} user={user} />
    )
  })

  test('blog renders properly in default non-detailed mode', () => {
    expect(component.container).toHaveTextContent('Canonical string reduction')
    expect(component.container).toHaveTextContent('Edsger W. Dijkstra')
    expect(component.container).not.toHaveTextContent(
      'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
    )
    expect(component.container).not.toHaveTextContent('12')
  })

  test('blog renders properly in detailed mode', () => {
    const button = component.getByText('Show')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('Canonical string reduction')
    expect(component.container).toHaveTextContent('Edsger W. Dijkstra')
    expect(component.container).toHaveTextContent(
      'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
    )
    expect(component.container).toHaveTextContent('12')
  })
})
