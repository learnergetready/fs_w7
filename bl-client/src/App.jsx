import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import { setNotification } from "./reducers/notificationReducer"
import { setBloglist, appendBlog } from "./reducers/bloglistReducer"

const App = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBloglist(blogs)))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser")
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const blogs = useSelector(({ bloglist }) => bloglist)

  const addBlog = async (blog) => {
    const newBlog = await blogService.create(blog)
    newBlog.user = { ...user }
    dispatch(appendBlog(newBlog))
  }

  const updateBlog = async (updatedBlog) => {
    await blogService.update(updatedBlog)
    //    setBlogs(
    //      blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog)),
    //  )
  }

  const removeBlog = async (blogID) => {
    await blogService.remove(blogID)
    //    setBlogs(blogs.filter((blog) => blog.id !== blogID))
  }

  const handleLogout = (event) =>
    window.localStorage.removeItem("loggedBloglistUser")

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userLoggingIn = await loginService.login({ username, password })
      window.localStorage.setItem(
        "loggedBloglistUser",
        JSON.stringify(userLoggingIn),
      )
      setUser(userLoggingIn)
      blogService.setToken(userLoggingIn.token)
      setUsername("")
      setPassword("")
    } catch (exception) {
      setNotification("Wrong credentials", 10, "red")
    }
  }

  return (
    <div>
      <Notification />

      {!user && (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      )}
      {user && (
        <p>
          {user.name} logged in{" "}
          <button onClick={handleLogout} data-cy="log out">
            log out
          </button>
        </p>
      )}
      {user && <BlogForm sendBlog={addBlog} />}
      <div>
        {user &&
          [...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={updateBlog}
                username={user.username}
                removeBlog={removeBlog}
              />
            ))}
      </div>
    </div>
  )
}
export default App
