import { useState } from "react"
import PropTypes from "prop-types"

const Blog = ({ blog, updateBlog, username, removeBlog }) => {
  const [showMuch, setShowMuch] = useState(false)
  const bigBlogStyle = {
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "2px",
  }
  const smallBlogStyle = {
    borderStyle: "solid",
    borderRadius: "1px",
    padding: "3px",
    marginBottom: "2px",
  }

  const buttonStyle = { marginLeft: "6px" }

  const handleLike = (event) => {
    event.preventDefault()
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    updateBlog(likedBlog)
  }

  const handleRemove = (event) => {
    event.preventDefault()
    window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`,
      removeBlog(blog.id),
    )
  }

  if (showMuch) {
    return (
      <p className="blog" style={bigBlogStyle}>
        title: {blog.title}
        <button style={buttonStyle} onClick={() => setShowMuch(false)}>
          hide
        </button>
        <br />
        author: {blog.author}
        <br />
        url: {blog.url}
        <br />
        likes: {blog.likes}
        <button style={buttonStyle} onClick={handleLike} data-cy="like">
          like
        </button>
        <br />
        added by: {blog.user.name}
        <br />
        {username === blog.user.username && (
          <button onClick={handleRemove} data-cy="remove">
            remove
          </button>
        )}
      </p>
    )
  }

  return (
    <p className="blog" style={smallBlogStyle}>
      {blog.title} {blog.author}
      <button
        style={buttonStyle}
        onClick={() => setShowMuch(true)}
        data-cy="view"
      >
        view
      </button>
    </p>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  removeBlog: PropTypes.func.isRequired,
}

export default Blog
