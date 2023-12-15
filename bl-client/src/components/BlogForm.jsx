import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showNotification } from "../reducers/notificationReducer"
import { addBlog } from "../reducers/bloglistReducer"

const BlogForm = ({ sendBlog }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [visiblePost, setVisiblePost] = useState(false)

  const showWhenVisible = { display: visiblePost ? "" : "none" }
  const hideWhenVisible = { display: visiblePost ? "none" : "" }

  const user = useSelector(({ user }) => user)

  const handleAdd = async (event) => {
    event.preventDefault()
    try {
      dispatch(addBlog({ title: title, author: author, url: url }, user))
      setVisiblePost(false)
      setTitle("")
      setAuthor("")
      setUrl("")
    } catch {
      ;(exception) => {
        dispatch(
          showNotification(
            "error in posting blog! fix error handling",
            10,
            "red",
          ),
        )
      }
    }
  }

  return (
    <>
      <button
        style={hideWhenVisible}
        onClick={() => setVisiblePost(true)}
        data-cy="new blog"
      >
        new blog
      </button>
      <div style={showWhenVisible}>
        <h2>Create new</h2>

        <form onSubmit={handleAdd}>
          <div>
            title
            <input
              id="blog-title"
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
              data-cy="blog-title"
            />
          </div>
          <div>
            author
            <input
              id="blog-author"
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
              data-cy="blog-author"
            />
          </div>
          <div>
            url
            <input
              id="blog-url"
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
              data-cy="blog-url"
            />
          </div>
          <button type="submit" data-cy="submit-blog">
            post
          </button>
        </form>
        <button onClick={() => setVisiblePost(false)}>cancel</button>
      </div>
    </>
  )
}

export default BlogForm
