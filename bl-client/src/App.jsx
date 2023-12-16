import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Bloglist from "./components/Bloglist"
import Users from "./components/Users"
import { refreshBloglist } from "./reducers/bloglistReducer"
import { refreshUserlist } from "./reducers/userlistReducer"
import { setUser, clearUser } from "./reducers/userReducer"
import { Routes, Route, Link } from "react-router-dom"
import { setToken as setBlogserviceToken } from "./services/blogs"

const App = () => {
  const dispatch = useDispatch()

  const padding = { padding: 5 }

  useEffect(() => {
    dispatch(refreshBloglist())
    dispatch(refreshUserlist())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser")
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(loggedUser))
      setBlogserviceToken(loggedUser.token)
    }
  }, [])

  const user = useSelector(({ user }) => user)

  const handleLogout = (event) => {
    window.localStorage.removeItem("loggedBloglistUser")
    dispatch(clearUser())
  }

  if (!user) {
    return <LoginForm />
  }

  return (
    <div>
      <div>
        <Link style={padding} to={"/"}>
          Blogs
        </Link>
        <Link style={padding} to={"/users"}>
          Users
        </Link>
      </div>
      <p>
        {user.name} logged in{" "}
        <button onClick={handleLogout} data-cy="log out">
          log out
        </button>
      </p>
      <Notification />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <BlogForm />
              <Bloglist />
            </div>
          }
        />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  )
}
export default App
