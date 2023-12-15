import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import { setBloglist } from "./reducers/bloglistReducer"
import { setUser, clearUser } from "./reducers/userReducer"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBloglist(blogs)))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser")
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(loggedUser))
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const blogs = useSelector(({ bloglist }) => bloglist)
  const user = useSelector(({ user }) => user)

  const handleLogout = (event) => {
    window.localStorage.removeItem("loggedBloglistUser")
    dispatch(clearUser())
  }

  return (
    <div>
      <Notification />

      {!user && <LoginForm />}
      {user && (
        <p>
          {user.name} logged in{" "}
          <button onClick={handleLogout} data-cy="log out">
            log out
          </button>
        </p>
      )}
      {user && <BlogForm />}
      <div>
        {user &&
          [...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog key={blog.id} blog={blog} username={user.username} />
            ))}
      </div>
    </div>
  )
}
export default App
