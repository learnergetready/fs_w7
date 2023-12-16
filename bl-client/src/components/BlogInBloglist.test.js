import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import BlogInBloglist from "./Blog"

describe("Blog", () => {
  let container
  const tester_username = "tester_nr56"

  const blog = {
    title: "The Ultimate Blog",
    author: "The Superman",
    url: "http://localhost:3001",
    likes: 15,
    user: {
      username: "tester_nr2",
      name: "Don Testme",
    },
  }

  const mockHandleUpdate = jest.fn()
  const mockHandleRemove = jest.fn()

  beforeEach(() => {
    container = render(
      <BlogInBloglist
        blog={blog}
        updateBlog={mockHandleUpdate}
        username={tester_username}
        removeBlog={mockHandleRemove}
      />,
    ).container
  })

  test("renders content", () => {
    const p = container.querySelector(".blog")

    expect(p).toHaveTextContent(blog.title)
    expect(p).toHaveTextContent(blog.author)
    expect(p).not.toHaveTextContent(blog.url)
    expect(p).not.toHaveTextContent(blog.likes)
  })

  test("view all information -button works well", async () => {
    const user = userEvent.setup()
    const button = screen.getByText("view")
    await user.click(button)
    const p = container.querySelector(".blog")

    expect(p).toHaveTextContent(blog.title)
    expect(p).toHaveTextContent(blog.author)
    expect(p).toHaveTextContent(blog.url)
    expect(p).toHaveTextContent(blog.likes)
    expect(p).toHaveTextContent(blog.user.name)
  })

  test("click like twice, and updateHandler is called twice", async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText("view")
    await user.click(viewButton)

    const likeButton = screen.getByText("like")
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandleUpdate.mock.calls).toHaveLength(2)
  })
})
