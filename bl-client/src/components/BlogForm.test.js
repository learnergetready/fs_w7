import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import BlogForm from "./BlogForm"

describe("BlogForm", () => {
  let container

  const title = "The Ultimate Blog"
  const author = "The Superman"
  const url = "http://localhost:3001"

  const mockHandleSendBlog = jest.fn()
  const mockHandleShowNotification = jest.fn()

  beforeEach(() => {
    container = render(
      <BlogForm
        sendBlog={mockHandleSendBlog}
        showNotification={mockHandleShowNotification}
      />,
    ).container
  })

  test("clicking add blog button, the sendBlog function is called once with correct data", async () => {
    const user = userEvent.setup()

    const titleInput = container.querySelector("#blog-title")
    const authorInput = container.querySelector("#blog-author")
    const urlInput = container.querySelector("#blog-url")
    const sendButton = screen.getByText("post")

    await user.type(titleInput, title)
    await user.type(authorInput, author)
    await user.type(urlInput, url)
    await user.click(sendButton)

    expect(mockHandleSendBlog.mock.calls[0][0]).toEqual({
      title: title,
      author: author,
      url: url,
    })
    expect(mockHandleSendBlog.mock.calls).toHaveLength(1)
  })
})
