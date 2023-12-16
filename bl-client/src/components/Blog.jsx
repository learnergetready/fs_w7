import { useState } from "react"
import { useDispatch } from "react-redux"
import PropTypes from "prop-types"
import { updateBlog, removeBlog } from "../reducers/bloglistReducer"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Blog = () => {
  const dispatch = useDispatch()
  const buttonStyle = { marginLeft: "6px" }
  const { blogID } = useParams()

  const blog = useSelector(({ bloglist }) =>
    bloglist.find((blog) => blog.id === blogID),
  )

  const handleLike = (event) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(updateBlog(likedBlog))
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <br />
      {blog.likes} likes
      <button style={buttonStyle} onClick={handleLike} data-cy="like">
        like
      </button>
      <br />
      <p>added by {blog.user.name}</p>
    </div>
  )
}

export const BlogInBloglist = ({ blog, username }) => {
  const dispatch = useDispatch()
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
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(updateBlog(likedBlog))
  }

  const handleRemove = (event) => {
    window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`,
      dispatch(removeBlog(blog)),
    )
  }

  if (showMuch) {
    return (
      <p className="blog" style={bigBlogStyle}>
        title: <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
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
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
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

BlogInBloglist.propTypes = {
  blog: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
}

export default Blog
