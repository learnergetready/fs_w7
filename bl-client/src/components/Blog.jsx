import { useState } from "react"
import { useDispatch } from "react-redux"
import PropTypes from "prop-types"
import { updateBlog, removeBlog, addComment } from "../reducers/bloglistReducer"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { Button, Link, View } from "@adobe/react-spectrum"
import Heart from "@spectrum-icons/workflow/Heart"
import Delete from "@spectrum-icons/workflow/Delete"
import Send from "@spectrum-icons/workflow/Send"
import MoreVertical from "@spectrum-icons/workflow/MoreVertical"
import MoreSmallListVert from "@spectrum-icons/workflow/MoreSmallListVert"

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

  const handleCommenting = (event) => {
    event.preventDefault()
    const newComment = event.target.newComment.value
    dispatch(addComment(blog.id, newComment))
    event.target.newComment.value = ""
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <Link href={blog.url}>{blog.url}</Link>
      <br />
      {blog.likes} likes
      <br />
      <Button onPress={handleLike} data-cy="like">
        <Heart aria-label="Heart" />
        like
      </Button>
      <br />
      <p>added by {blog.user.name}</p>
      <h3>comments</h3>
      <form method="post" onSubmit={handleCommenting}>
        <input name="newComment" />
        <Button type="submit">
          <Send />
          comment
        </Button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export const BlogInBloglist = ({ blog, username }) => {
  const dispatch = useDispatch()
  const [showMuch, setShowMuch] = useState(false)

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
      <View borderRadius="regular" borderWidth="thin">
        title: <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
        <Button marginX="size-150" onPress={() => setShowMuch(false)}>
          <MoreVertical />
          hide
        </Button>
        <br />
        author: {blog.author}
        <br />
        url: <Link href={blog.url}>{blog.url}</Link>
        <br />
        likes: {blog.likes}
        <br />
        <Button onPress={handleLike} data-cy="like">
          <Heart aria-label="Heart" />
          like
        </Button>
        <br />
        added by: {blog.user.name}
        <br />
        {username === blog.user.username && (
          <Button variant="negative" onPress={handleRemove} data-cy="remove">
            <Delete />
            delete
          </Button>
        )}
      </View>
    )
  }

  return (
    <View
      borderRadius="regular"
      borderWidth="thin"
      height="size-500"
      width="100%"
    >
      <Link href={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
      <Button
        marginX="size-150"
        onPress={() => setShowMuch(true)}
        data-cy="view"
      >
        <MoreSmallListVert />
        show
      </Button>
    </View>
  )
}

BlogInBloglist.propTypes = {
  blog: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
}

export default Blog
