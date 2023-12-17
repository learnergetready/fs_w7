import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Bloglist from "./components/Bloglist"
import Blog from "./components/Blog"
import Users from "./components/Users"
import User from "./components/User"
import { refreshBloglist } from "./reducers/bloglistReducer"
import { refreshUserlist } from "./reducers/userlistReducer"
import { setUser, clearUser } from "./reducers/userReducer"
import { Link, Routes, Route } from "react-router-dom"
import { setToken as setBlogserviceToken } from "./services/blogs"
import {
  Footer,
  Provider as SpectrumRouterProvider,
  View,
} from "@adobe/react-spectrum"

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
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <SpectrumRouterProvider>
        <View>
          <Link to={"/"}>Blogs</Link>
          <Link to={"/users"}>Users</Link>
          {user.name} logged in{" "}
          <button onClick={handleLogout} data-cy="log out">
            log out
          </button>
        </View>
        <View>
          <Notification />
          <Routes>
            <Route
              path="/"
              element={
                <View>
                  <BlogForm />
                  <Bloglist />
                </View>
              }
            />
            <Route path="/blogs/:blogID" element={<Blog />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:userID" element={<User />} />
          </Routes>
        </View>
        <Footer>
          Made for the Helsinki University Full Stack Course, (c) 2023
        </Footer>
      </SpectrumRouterProvider>
    </div>
  )
}
export default App
