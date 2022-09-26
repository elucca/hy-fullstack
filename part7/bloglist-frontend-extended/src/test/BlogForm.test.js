import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import BlogForm from "../components/BlogForm"

test("<BlogForm /> calls createBlog with correct parameters", () => {
  const createBlog = jest.fn()

  const component = render(<BlogForm createBlog={createBlog} />)

  const title = component.container.querySelector("#title")
  const author = component.container.querySelector("#author")
  const url = component.container.querySelector("#url")
  const likes = component.container.querySelector("#likes")

  const form = component.container.querySelector("#form")

  const correctBlog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: "12",
  }

  fireEvent.change(title, {
    target: { value: "Canonical string reduction" },
  })
  fireEvent.change(author, {
    target: { value: "Edsger W. Dijkstra" },
  })
  fireEvent.change(url, {
    target: {
      value: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    },
  })
  fireEvent.change(likes, {
    target: { value: 12 },
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toStrictEqual(correctBlog)
})
